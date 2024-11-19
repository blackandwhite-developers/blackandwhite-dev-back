declare type adminGetReservationRequestPath = {
    /** 관리자ID */
    adminId: string;
};

declare type adminGetReservationRequestParams = {};

declare type adminGetReservationRequestBody = {};

/** 예약 목록 조회 (관리자) 요청 */
declare type adminGetReservationRequest = {
    params?: adminGetReservationRequestParams;
    path: adminGetReservationRequestPath;
    body?: adminGetReservationRequestBody;
};

/** 예약 목록 조회 (관리자) 응답 */
declare type adminGetReservationResponse = Array<IReservationResponseDTO>;
declare type adminGetReservationDetailRequestPath = {
    /** 예약 ID */
    id: string;
};

declare type adminGetReservationDetailRequestParams = {};

declare type adminGetReservationDetailRequestBody = {};

/** 예약 상세 조회 (관리자) 요청 */
declare type adminGetReservationDetailRequest = {
    params?: adminGetReservationDetailRequestParams;
    path: adminGetReservationDetailRequestPath;
    body?: adminGetReservationDetailRequestBody;
};

/** 예약 상세 조회 (관리자) 응답 */
declare type adminGetReservationDetailResponse = {
    /** 예약 ID */
    id : string;
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
    status: "active" | "cancel";
    /** 예약 타입 */
    type: "shortStay" | "overnight";
};

declare type adminCreateReservationRequestPath = {};

declare type adminCreateReservationRequestParams = {};

declare type adminCreateReservationRequestBody = {
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
    status: "active" | "cancel";
    /** 예약 타입 */
    reservationType: "shortStay" | "overnight";
};

/** 예약 생성 (관리자) 요청 */
declare type adminCreateReservationRequest = {
    params?: adminCreateReservationRequestParams;
    path?: adminCreateReservationRequestPath;
    body: adminCreateReservationRequestBody;
};

/** 예약 생성 (관리자) 응답 */
declare type adminCreateReservationResponse = IReservationResponseDTO;

declare type adminUpdateReservationRequestPath = {
    /** 예약 ID */
    id: string;
    /** 예약 상태 */
    status: "active" | "cancel";
};

declare type adminUpdateReservationRequestParams = {};

declare type adminUpdateReservationRequestBody = Omit<IReservation, "id">;

/** 예약 수정 (관리자) 요청 */
declare type adminUpdateReservationRequest = {
    params?: adminUpdateReservationRequestParams;
    path: adminUpdateReservationRequestPath;
    body: adminUpdateReservationRequestBody;
};

/** 예약 수정 (관리자) 응답 */
declare type adminUpdateReservationResponse = void;

declare type adminDeleteReservationRequestPath = {
    /** 예약 ID */
    id: string;
    /** 예약 상태 */
    status: "active" | "cancel";
};

declare type adminDeleteReservationRequestParams = {};

declare type adminDeleteReservationRequestBody = {};

/** 예약 삭제 (관리자) 요청 */
declare type adminDeleteReservationRequest = {
    params?: adminDeleteReservationRequestParams;
    path: adminDeleteReservationRequestPath;
    body?: adminDeleteReservationRequestBody;
};

/** 예약 삭제 (관리자) 응답 */
declare type adminDeleteReservationResponse = void;