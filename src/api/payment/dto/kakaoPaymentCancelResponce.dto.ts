export default class KakaoPaymentCancelResponseDto {
  aid: string;
  tid: string;
  cid: string;
  status:
    | 'REDAY'
    | 'SEND_TMS'
    | 'OPEN_PAYMENT'
    | 'SELECT_METHOD'
    | 'ARS_WAITING'
    | 'AUTH_PASSWORD'
    | 'ISSUED_SID'
    | 'SUCCESS_PAYMENT'
    | 'PART_CANCEL_PAYMENT'
    | 'CANCEL_PAYMENT'
    | 'FAIL_AUTH_PASSWORD'
    | 'QUIT_PAYMENT'
    | 'FAIL_PAYMENT';
  partner_order_id: string;
  partner_user_id: string;
  payment_method_type: 'CARD' | 'MONEY';
  amount: {
    total: number;
    tax_free: number;
    vat: number;
    point: number;
    discount: number;
  };
  approved_cancel_amount: {
    total: number;
    tax_free: number;
    vat: number;
    point: number;
    discount: number;
    green_deposit: number;
  };
  canceled_amount: {
    total: number;
    tax_free: number;
    vat: number;
    point: number;
    discount: number;
    green_deposit: number;
  };
  cancel_available_amount: {
    total: number;
    tax_free: number;
    vat: number;
    point: number;
    discount: number;
    green_deposit: number;
  };
  item_name: string;
  item_code: string;
  quantity: number;
  created_at: string;
  approved_at: string;
  payload: string;

  constructor(kakaoPaymentCancelResponse: IKakaoPayCancelResponse) {
    this.aid = kakaoPaymentCancelResponse.aid;
    this.tid = kakaoPaymentCancelResponse.tid;
    this.cid = kakaoPaymentCancelResponse.cid;
    this.status = kakaoPaymentCancelResponse.status;
    this.partner_order_id = kakaoPaymentCancelResponse.partner_order_id;
    this.partner_user_id = kakaoPaymentCancelResponse.partner_user_id;
    this.payment_method_type = kakaoPaymentCancelResponse.payment_method_type;
    this.amount = kakaoPaymentCancelResponse.amount;
    this.approved_cancel_amount = kakaoPaymentCancelResponse.approved_cancel_amount;
    this.canceled_amount = kakaoPaymentCancelResponse.canceled_amount;
    this.cancel_available_amount = kakaoPaymentCancelResponse.cancel_available_amount;
    this.item_name = kakaoPaymentCancelResponse.item_name;
    this.item_code = kakaoPaymentCancelResponse.item_code;
    this.quantity = kakaoPaymentCancelResponse.quantity;
    this.created_at = kakaoPaymentCancelResponse.created_at;
    this.approved_at = kakaoPaymentCancelResponse.approved_at;
    this.payload = kakaoPaymentCancelResponse.payload;
  }
}
