import express from 'express';
import PaymentController from '../controller/payment.controller';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import PaymentServiceImpl from '../service/payment.service';
import MongoosePaymentRepository from '../repository/mongoosePayment.repository';

const paymentRouter = express.Router();

const PAYMENT_ROUTES = {
  /** 카카오페이 결제 요청 */
  KAKAO_PAY_REQUEST: `/api/payment/kakao`,
  /** 결제 요청 */
  REQUEST_PAYMENT: `/api/payment/request`,
  /** 카카오페이 결제 승인 */
  KAKAO_PAY_CONFIRM: `/api/payment/kakao/confirm`,
  /** 결제 승인 */
  CONFIRM_PAYMENT: `/api/payment/confirm`,
  /** 카카오페이 결제 취소 */
  KAKAO_PAY_CANCEL: `/api/payment/kakao/cancel`,
  /** 결제 취소 */
  CANCEL_PAYMENT: `/api/payment/cancel`,
  /** 결제 상태 조회 */
  GET_PAYMENT_STATUS: `/api/payment/status`,
  /** 결제 상세 조회 */
  GET_PAYMENT_DETAIL: `/api/payment`,
} as const;

const paymentController = new PaymentController(new PaymentServiceImpl(new MongoosePaymentRepository()));

paymentRouter.post(
  extractPath(PAYMENT_ROUTES.KAKAO_PAY_REQUEST, ROUTES_INDEX.PAYMENT_API),
  paymentController.kakaoPayRequest,
);

paymentRouter.post(
  extractPath(PAYMENT_ROUTES.REQUEST_PAYMENT, ROUTES_INDEX.PAYMENT_API),
  paymentController.requestPayment,
);

paymentRouter.post(
  extractPath(PAYMENT_ROUTES.KAKAO_PAY_CONFIRM, ROUTES_INDEX.PAYMENT_API),
  paymentController.kakaoPayConfirm,
);

paymentRouter.post(
  extractPath(PAYMENT_ROUTES.CONFIRM_PAYMENT, ROUTES_INDEX.PAYMENT_API),
  paymentController.confirmPayment,
);

paymentRouter.delete(
  extractPath(PAYMENT_ROUTES.KAKAO_PAY_CANCEL, ROUTES_INDEX.PAYMENT_API),
  paymentController.kakaoPayCancel,
);

paymentRouter.delete(
  extractPath(PAYMENT_ROUTES.CANCEL_PAYMENT, ROUTES_INDEX.PAYMENT_API),
  paymentController.cancelPayment,
);

paymentRouter.get(
  extractPath(PAYMENT_ROUTES.GET_PAYMENT_STATUS, ROUTES_INDEX.PAYMENT_API),
  paymentController.getPaymentStatus,
);

paymentRouter.get(
  extractPath(PAYMENT_ROUTES.GET_PAYMENT_DETAIL, ROUTES_INDEX.PAYMENT_API),
  paymentController.getPaymentDetail,
);

export default paymentRouter;
