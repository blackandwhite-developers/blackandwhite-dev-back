export class ReservationResponseDTO {
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
  /** 예약자 성함 */
  reserver: {
    /** 이름 */
    reserverName: string;
    /** 연락처 */
    reserverPhone: string;
  };
  /** 예약 상태 */
  status: 'active' | 'cancel';
  /** 예약 객실 ID */
  roomId: string;

  constructor(params: IReservation) {
    this.id = params.id;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.adult = params.adult;
    this.child = params.child;
    this.reserver = {
      reserverName: params.reserver.reserverName,
      reserverPhone: params.reserver.reserverPhone,
    };
    this.status = params.status;
    this.roomId = params.roomId;
  }
}
