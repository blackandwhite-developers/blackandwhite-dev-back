interface IPayment {
  /** 결제 ID */
  id: string;
  /** 결제 수단 */
  method: 'CARD' | 'BANK_TRANSFER' | 'KAKAO_PAY';
  /** 명목상 결제 금액 */
  nominalAmount: number;
  /** 할인 금액 */
  discountAmount: number;
  /** 총 결제 금액 */
  amount: number;
  /** 결제 항목 이름 */
  itemName: string;
  /** 결제 상태 */
  status: 'PENDING' | 'SUCCESS' | 'FAILURE' | 'CANCEL';
  /** 결제 일시 */
  createdAt: Date;
  /** 결제 완료 일시 */
  completedAt: Date | null;
  /** 예약 ID */
  reservation: Array<IReservation>;
  /** 결제자 ID */
  user: IUser;
}

interface IKakaoPayReadyResponse {
  tid: string;
  next_redirect_pc_url: string;
  created_at: string;
}

interface IKakaoPayApproveResponse {
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
}

interface IKakaoPayCancelResponse {
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
}
