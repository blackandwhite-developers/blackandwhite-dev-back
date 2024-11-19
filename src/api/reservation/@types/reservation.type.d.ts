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
    /** 예약 계정 ID */
    userId: string;
    /** 이용자(로그인한 유저와 다름) */
    reserver: {
        /** 이용자 이름 */
        reserverName: string;
        /** 이용자 휴대폰 번호 */
        reserverPhone: string;
    };
    /** 객실 정보 */
    information: IPartialRoom;
    /** 예약 상태 */
    status: 'active' | 'cancel';
    /** 예약 타입 */
    reservationType: 'shortStay' | 'overnight';
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
    /** 객실 정보 */
    information: {
        /* 객실 ID */
        id: string;
        /** 객실 이름 */
        name: string;
        /** 객실 이미지 */
        image: string;
        /** 객실 인원 */
        capacity: IRoomCapacity;
        /** 객실 시설 */
        time: IRoomTime;
        /** 객실 가격 */
        price: IPrice;
    };
    /** 예약 상태 */
    status: 'active' | 'cancel';
    /** 예약 타입 */
    reservationType: 'shortStay' | 'overnight';
}

interface IPriceResponseDTO {
    /** 객실 가격 */
    price: number;
    /** 할인율 */
    discount: number;
    /** 인원 당 추가 가격 */
    additionalPrice: number;
}

interface IRoomTimeResponseDTO {
    /** 입실 시간 */
    checkIn: string;
    /** 퇴실 시간 */
    checkOut: string;
}

interface IRoomCapacityResponseDTO {
    /** 기준 인원 */
    standard: number;
    /** 최대 인원 */
    maximum: number;
}
