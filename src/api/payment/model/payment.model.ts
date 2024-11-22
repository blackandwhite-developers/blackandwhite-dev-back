export default class Payment implements IPayment {
  id: string;
  method: 'CARD' | 'BANK_TRANSFER' | 'KAKAO_PAY';
  nominalAmount: number;
  discountAmount: number;
  amount: number;
  itemName: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILURE' | 'CANCEL';
  createdAt: Date;
  completedAt: Date | null;
  reservation: Array<IReservation>;
  user: IUser;

  constructor(payment: IPayment) {
    this.id = payment.id;
    this.method = payment.method;
    this.nominalAmount = payment.nominalAmount;
    this.discountAmount = payment.discountAmount;
    this.amount = payment.amount;
    this.itemName = payment.itemName;
    this.status = payment.status;
    this.createdAt = payment.createdAt;
    this.completedAt = payment.completedAt;
    this.reservation = payment.reservation;
    this.user = payment.user;
  }
}
