interface IReservation {
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
  /** 이용자(로그인한 유저와 다름) */
  reserver: {
    /** 이용자 이름 */
    reserverName: string;
    /** 이용자 휴대폰 번호 */
    reserverPhone: string;
  };
  /** 예약 상태 */
  status: 'active' | 'cancel';
  /** 예약 지불 정보 */
  payment: IPayment | null;
  /* 객실 ID */
  roomId: string;
  /** 예약 계정 ID */
  userId: string;
}

interface IReservationResponseDTO {
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
  /** 예약 상태 */
  status: 'active' | 'cancel';
  /** 예약 지불 정보 */
  payment: PaymentResponseDTO;
  /* 객실 ID */
  roomId: string;
}
