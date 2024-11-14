import { Request, Response, NextFunction } from 'express';
import PaymentService from '../service/payment.service.type';
import { v4 as uuid } from 'uuid';
export default class PaymentController {
  private readonly _paymentService: PaymentService;
  constructor(_paymentService: PaymentService) {
    this._paymentService = _paymentService;
    this.kakaoPayRequest = this.kakaoPayRequest.bind(this);
    this.requestPayment = this.requestPayment.bind(this);
    this.kakaoPayConfirm = this.kakaoPayConfirm.bind(this);
    this.confirmPayment = this.confirmPayment.bind(this);
    this.kakaoPayCancel = this.kakaoPayCancel.bind(this);
    this.cancelPayment = this.cancelPayment.bind(this);
    this.getPaymentStatus = this.getPaymentStatus.bind(this);
    this.getPaymentDetail = this.getPaymentDetail.bind(this);
  }
  async kakaoPayRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const {
        amount,
        nominalAmount,
        discountAmount,
        itemName,
        quantity,
        taxFreeAmount,
        approvalUrl,
        cancelUrl,
        failUrl,
        reservationId,
      } = req.body;
      const response = await this._paymentService.kakaoPayRequest(
        amount,
        itemName,
        quantity,
        taxFreeAmount,
        approvalUrl,
        cancelUrl,
        failUrl,
        uuid().toString(),
        userId,
        nominalAmount,
        discountAmount,
        reservationId,
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async requestPayment(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({ message: '결제 요청 성공' });
    } catch (error) {
      next(error);
    }
  }
  async kakaoPayConfirm(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const { tid, partner_order_id, partner_user_id, pg_token, paymentId, orderId } = req.body;
      const response = await this._paymentService.kakaoPayConfirm(
        tid,
        partner_order_id,
        partner_user_id,
        pg_token,
        orderId,
        userId,
        paymentId,
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  async confirmPayment(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({ message: '결제 승인 성공' });
    } catch (error) {
      next(error);
    }
  }
  async kakaoPayCancel(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const { tid, cancel_amount, cancel_tax_free_amount, paymentId } = req.body;
      const response = await this._paymentService.kakaoPayCancel(
        tid,
        cancel_amount,
        cancel_tax_free_amount,
        paymentId,
        userId,
      );
      res.status(204).json(response);
    } catch (error) {
      next(error);
    }
  }
  async cancelPayment(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(204).json({ message: '결제 취소 성공' });
    } catch (error) {
      next(error);
    }
  }
  async getPaymentStatus(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: '결제 상태 조회 성공' });
    } catch (error) {
      next(error);
    }
  }
  async getPaymentDetail(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: '결제 상세 조회 성공' });
    } catch (error) {
      next(error);
    }
  }
}
