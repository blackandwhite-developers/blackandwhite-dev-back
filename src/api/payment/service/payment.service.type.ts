import KakaoPaymentApproveResponseDto from '../dto/kakaoPaymentApproveResponse.dto';
import KakaoPaymentCancelResponseDto from '../dto/kakaoPaymentCancelResponce.dto';
import KakaoPaymentReadyResponseDto from '../dto/kakaoPaymentReadyResponse.dto';

export default interface PaymentService {
  /** 카카오페이 결제 요청 */
  kakaoPayRequest(
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
  ): Promise<KakaoPaymentReadyResponseDto>;
  /** 결제 요청 */
  requestPayment(): Promise<void>;
  /** 카카오페이 결제 확정 */
  kakaoPayConfirm(
    tid: string,
    partner_order_id: string,
    partner_user_id: string,
    pg_token: string,
    orderId: string,
    userId: string,
    paymentId: string,
  ): Promise<KakaoPaymentApproveResponseDto>;
  /** 결제 확정 */
  confirmPayment(): Promise<void>;
  /** 카카오페이 결제 취소 */
  kakaoPayCancel(
    tid: string,
    cancel_amount: number,
    cancel_tax_free_amount: number,
    paymentId: string,
    userId: string,
  ): Promise<KakaoPaymentCancelResponseDto>;
  /** 결제 취소 */
  cancelPayment(): Promise<void>;
  /** 결제 상태 조회 */
  getPaymentStatus(): Promise<void>;
  /** 결제 상세 조회 */
  getPaymentDetail(): Promise<void>;
}
