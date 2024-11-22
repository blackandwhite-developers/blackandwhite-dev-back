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
  information: {
    /* 객실 ID */
    id: string;
    /** 객실 이름 */
    name: string;
    /** 객실 이미지 */
    image: string;
    /** 객실 인원 */
    capacity: {
      /** 기준 인원 */
      standard: number;
      /** 최대 인원 */
      maximum: number;
    };
    /** 객실 시설 */
    time: {
      /** 입실 시간 */
      checkIn: string;
      /** 퇴실 시간 */
      checkOut: string;
    };
    /** 객실 가격 */
    price: {
      /** 객실 가격 */
      price: number;
      /** 할인율 */
      discount: number;
      /** 인원 당 추가 가격 */
      additionalPrice: number;
    };
  };
  /** 예약 상태 */
  status: 'active' | 'cancel';

  constructor(params: IReservation) {
    this.id = params.id;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.adult = params.adult;
    this.child = params.child;
    this.userId = params.userId;
    this.reserver = {
      reserverName: params.reserver.reserverName,
      reserverPhone: params.reserver.reserverPhone,
    };
    this.information = {
      id: params.information.id,
      name: params.information.name,
      image: params.information.image,
      capacity: {
        standard: params.information.capacity.standard,
        maximum: params.information.capacity.maximum,
      },
      time: {
        checkIn: params.information.time.checkIn,
        checkOut: params.information.time.checkOut,
      },
      price: {
        price:params.information.price.price,
        discount: params.information.price.discount,
        additionalPrice: params.information.price.additionalPrice,
      },
    };
    this.status = params.status;
  }
}
