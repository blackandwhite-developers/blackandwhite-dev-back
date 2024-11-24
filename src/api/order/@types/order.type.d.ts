interface IOrder {
  id: string;
  user: IUser;
  reservation: IReservation;
  payment: IPayment;
  status: string;
}
