interface IReservation {
    /** 예약 ID */
    id: string;
    /** 입실 날짜 */
    startDate: string;
    /** 퇴실 날짜 */
    endDate: string;
    /** 예약자 성함 */
    reserverName: IUser;
    /** 예약자 연락처 */
    reserverNumber: IProfile;
    /** 객실 정보 */
    information: IRoom;
}

interface IReservationResponseDTO {
    /** 예약 ID */
    id: string;
    /** 입실 날짜 */
    startDate: string;
    /** 퇴실 날짜 */
    endDate: string;
    /** 예약자 성함 */
    reserverName: {
        /** 사용자 ID */
        id: string;
        /** 이름 */
        name: string;
    };
    /** 예약자 연락처 */
    reserverNumber: {
        /** 프로필 ID */
        id: string;
        /** 연락처 */
        phone: string;
    };
    /** 객실 정보 */
    information: {
        /* 객실 ID */
        id: string;
        /** 객실 이름 */
        name: string;
        /** 객실 이미지 */
        image: string;
        /** 어른 인원 */
        adult: number;
        /** 아이 인원 */
        child: number;
        /** 기준 인원 */
        standardCapacity: number;
        /** 최대 인원 */
        maxCapacity: number;
        /** 객실 가격 */
        price: number;
        /** 입실 시간 */
        checkIn: Date;
        /** 퇴실 시간 */
        checkOut: Date;

    }
}