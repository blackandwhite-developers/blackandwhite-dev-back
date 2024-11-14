export default class KakaoPaymentApproveResponseDto {
  aid: string;
  tid: string;
  cid: string;
  sid: string;
  partner_order_id: string;
  partner_user_id: string;
  payment_method_type: 'CARD' | 'MONEY' | 'BANK_TRANSFER' | 'PHONE';
  item_name: string;
  quantity: number;
  amount: { total: number; tax_free: number; vat: number; point: number; discount: number };
  approved_at: string;
  created_at: string;
  approved_time: string;
  payload: string;
  constructor(kakaoPaymentApproveResponse: IKakaoPayApproveResponse) {
    this.aid = kakaoPaymentApproveResponse.aid;
    this.tid = kakaoPaymentApproveResponse.tid;
    this.cid = kakaoPaymentApproveResponse.cid;
    this.sid = kakaoPaymentApproveResponse.sid;
    this.partner_order_id = kakaoPaymentApproveResponse.partner_order_id;
    this.partner_user_id = kakaoPaymentApproveResponse.partner_user_id;
    this.payment_method_type = kakaoPaymentApproveResponse.payment_method_type;
    this.item_name = kakaoPaymentApproveResponse.item_name;
    this.quantity = kakaoPaymentApproveResponse.quantity;
    this.amount = kakaoPaymentApproveResponse.amount;
    this.approved_at = kakaoPaymentApproveResponse.approved_at;
    this.created_at = kakaoPaymentApproveResponse.created_at;
    this.approved_time = kakaoPaymentApproveResponse.approved_time;
    this.payload = kakaoPaymentApproveResponse.payload;
  }
}
