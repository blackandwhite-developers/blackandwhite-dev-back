export default class Order implements IOrder {
  id: string;
  user: IUser;
  reservation: IReservation;
  payment: IPayment;
  status: string;

  constructor(order: IOrder) {
    this.id = order.id;
    this.user = order.user;
    this.reservation = order.reservation;
    this.payment = order.payment;
    this.status = order.status;
  }
}
