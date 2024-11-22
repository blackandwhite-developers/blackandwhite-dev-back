import HttpException from '@/api/common/exceptions/http.exception';
import KakaoPaymentApproveResponseDto from '../dto/kakaoPaymentApproveResponse.dto';
import KakaoPaymentReadyResponseDto from '../dto/kakaoPaymentReadyResponse.dto';
import PaymentService from './payment.service.type';
import KakaoPaymentCancelResponseDto from '../dto/kakaoPaymentCancelResponce.dto';
import PaymentRepository from '../repository/payment.repository';
import { ReservationRepository } from '@/api/reservation/repository/reservation.repository';
import { UserRepository } from '@/api/users/respository/user/user.repository';

const KAKAO_PAY_API_KEY = process.env.KAKAO_PAY_API_KEY;

export default class PaymentServiceImpl implements PaymentService {
  private readonly _paymentRepository: PaymentRepository;
  private readonly _reservationRepository: ReservationRepository;
  private readonly _userRepository: UserRepository;
  constructor(
    _paymentRepository: PaymentRepository,
    _reservationRepository: ReservationRepository,
    _userRepository: UserRepository,
  ) {
    this._paymentRepository = _paymentRepository;
    this._reservationRepository = _reservationRepository;
    this._userRepository = _userRepository;
  }
  async kakaoPayRequest(
    amount: number,
    itemName: string,
    quantity: number,
    taxFreeAmount: number,
    approvalUrl: string,
    cancelUrl: string,
    failUrl: string,
    orderId: string,
    userId: string,
    nominalAmount: number,
    discountAmount: number,
    reservationIds: Array<string>,
  ): Promise<KakaoPaymentReadyResponseDto> {
    const response = await fetch('https://open-api.kakaopay.com/online/v1/payment/ready', {
      method: 'POST',
      headers: {
        Authorization: `SECRET_KEY ${KAKAO_PAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: 'TC0ONETIME',
        partner_order_id: orderId,
        partner_user_id: userId,
        item_name: itemName,
        quantity,
        total_amount: amount,
        tax_free_amount: taxFreeAmount,
        approval_url: approvalUrl,
        cancel_url: cancelUrl,
        fail_url: failUrl,
      }),
    });

    const reservation = (await this._reservationRepository.findAll())
      .map(reservation => {
        if (reservationIds.includes(reservation.id)) {
          return reservation;
        }
      })
      .filter(reservation => reservation !== undefined);

    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new HttpException(404, '사용자를 찾을 수 없습니다.');
    }
    if (reservation.length !== reservationIds.length || reservation.length === 0 || reservation === undefined) {
      throw new HttpException(404, '예약 정보가 존재하지 않습니다.');
    }

    if (!response.ok) {
      await this._paymentRepository.save({
        method: 'KAKAO_PAY',
        nominalAmount,
        discountAmount,
        amount,
        itemName,
        status: 'FAILURE',
        createdAt: new Date(),
        completedAt: null,
        reservation,
        user,
      });
      throw new HttpException(500, '카카오페이 결제 준비 실패');
    }
    const data = await response.json();
    return new KakaoPaymentReadyResponseDto(data);
  }

  async requestPayment(): Promise<void> {}
  async kakaoPayConfirm(
    tid: string,
    orderId: string,
    userId: string,
    pg_token: string,
    paymentId: string,
  ): Promise<KakaoPaymentApproveResponseDto> {
    const payment = await this._paymentRepository.findById(paymentId);
    if (payment?.user.id !== userId) {
      throw new HttpException(403, '권한이 없습니다.');
    }
    if (!payment) {
      throw new HttpException(404, '결제 정보가 존재하지 않습니다.');
    }
    const response = await fetch('https://open-api.kakaopay.com/online/v1/payment/approve', {
      method: 'POST',
      headers: {
        Authorization: `SECRET_KEY ${KAKAO_PAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: 'TC0ONETIME',
        tid,
        partner_order_id: orderId,
        partner_user_id: userId,
        pg_token,
      }),
    });
    if (!response.ok) {
      await this._paymentRepository.update(paymentId, {
        status: 'FAILURE',
        completedAt: new Date(),
      });
      throw new HttpException(500, '카카오페이 결제 승인 실패');
    }
    await this._paymentRepository.update(paymentId, {
      status: 'SUCCESS',
      completedAt: new Date(),
    });
    const data = await response.json();
    return new KakaoPaymentApproveResponseDto(data);
  }
  async confirmPayment(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async kakaoPayCancel(
    tid: string,
    cancel_amount: number,
    cancel_tax_free_amount: number,
    paymentId: string,
    userId: string,
  ): Promise<KakaoPaymentCancelResponseDto> {
    const payment = await this._paymentRepository.findById(paymentId);
    if (payment?.user.id !== userId) {
      throw new HttpException(403, '권한이 없습니다.');
    }
    if (!payment) {
      throw new HttpException(404, '결제 정보가 존재하지 않습니다.');
    }
    const response = await fetch('https://open-api.kakaopay.com/v1/payment/cancel', {
      method: 'POST',
      headers: {
        Authorization: `SECRET_KEY ${KAKAO_PAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: 'TC0ONETIME',
        tid,
        cancel_amount,
        cancel_tax_free_amount,
      }),
    });
    if (!response.ok) {
      throw new HttpException(500, '카카오페이 결제 취소 실패');
    }
    await this._paymentRepository.update(paymentId, {
      status: 'CANCEL',
      completedAt: new Date(),
    });
    const data = await response.json();
    return new KakaoPaymentCancelResponseDto(data);
  }
  async cancelPayment(): Promise<void> {}
  async getPaymentStatus(): Promise<void> {}
  async getPaymentDetail(): Promise<void> {}
}
