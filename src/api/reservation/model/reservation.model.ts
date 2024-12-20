export class Reservation implements IReservation {
  /** 예약 ID */
  id: string;
  /** 입실 날짜 */
  startDate: string;
  /** 퇴실 날짜 */
  endDate: string;
  /** 어른 인원 */
  adult: number;
  /** 아이 인원 */
  child: number;
  /** 예약 계정 ID */
  userId: string;
  /** 예약자 성함 */
  reserver: {
    /** 이름 */
    reserverName: string;
    /** 연락처 */
    reserverPhone: string;
  };
  /** 객실 정보 */
  information: IPartialRoom;
  /** 예약 상태 */
  status: 'active' | 'cancel';
  /** 예약 지불 정보 */
  payment: IPayment | null;

  constructor(params: IReservation) {
    this.id = params.id;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.adult = params.adult;
    this.child = params.child;
    this.userId = params.userId;
    this.reserver = params.reserver;
    this.information = params.information;
    this.status = params.status;
    this.payment = params.payment;
  }
}
