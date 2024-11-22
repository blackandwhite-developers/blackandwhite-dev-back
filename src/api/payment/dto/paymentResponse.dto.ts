import { ReservationResponseDTO } from '@/api/reservation/dto/reservationResponse.dto';
import { UserResponseDTO } from '@/api/users/dto/userResponse.dto';

export default class PaymentResponseDto {
  id: string;
  method: string;
  nominalAccount: number;
  discountAmount: number;
  amount: number;
  itemName: string;
  status: string;
  createdAt: Date;
  completedAt: Date | null;
  reservation: Array<ReservationResponseDTO>;
  user: UserResponseDTO;

  constructor(payment: IPayment) {
    this.id = payment.id;
    this.method = payment.method;
    this.nominalAccount = payment.nominalAmount;
    this.discountAmount = payment.discountAmount;
    this.amount = payment.amount;
    this.itemName = payment.itemName;
    this.status = payment.status;
    this.createdAt = payment.createdAt;
    this.completedAt = payment.completedAt;
    this.reservation = payment.reservation.map(reservation => new ReservationResponseDTO(reservation));
    this.user = new UserResponseDTO(payment.user);
  }
}
