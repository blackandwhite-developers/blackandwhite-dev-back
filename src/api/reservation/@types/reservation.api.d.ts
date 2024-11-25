type getReservationRequestPath = {
  /** 사용자 ID */
  userId: string;
};

type getReservationRequestParams = {};

type getReservationRequestBody = {};

/** 예약 조회 (사용자 페이지) */
type getReservationRequest = {
  params?: getReservationRequestParams;
  path: getReservationRequestPath;
  body?: getReservationRequestBody;
};

/** 예약 조회 (사용자 페이지) 응답 */
type getReservationResponse = Array<IReservationResponseDTO>;

type getReservationDetailRequestPath = {
  /** 예약 ID */
  id: string;
};

type getReservationDetailRequestParams = {};

type getReservationDetailRequestBody = {
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
  /** 예약 정보 */
  information: {
    time: {
      /** 입실 시간 */
      checkIn: string;
      /** 퇴실 시간 */
      checkOut: string;
    };
  };
  /** 예약 상태 */
  status: 'active' | 'cancel';
  /** 예약 객실 ID */
  roomId: string;
};

/** 예약 상세 조회 (사용자 페이지) */
type getReservationDetailRequest = {
  params?: getReservationDetailRequestParams;
  path: getReservationDetailRequestPath;
  body?: getReservationDetailRequestBody;
};

/** 예약 상세 조회 (사용자 페이지) 응답 */
type getReservationDetailResponse = IReservationResponseDTO | null;

declare type createReservationRequestPath = {};

declare type createReservationRequestParams = {};

declare type createReservationRequestBody = {
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
  /** 예약 정보 */
  information: {
    time: {
      /** 입실 시간 */
      checkIn: string;
      /** 퇴실 시간 */
      checkOut: string;
    };
  };
  /** 예약 상태 */
  status: 'active' | 'cancel';
  /** 예약 객실 ID */
  roomId: string;
  /** 예약 계정 ID */
  userId: string;
};

/** 예약 생성 (사용자 페이지) 요청 */
declare type createReservationRequest = {
  params?: createReservationRequestParams;
  path?: createReservationRequestPath;
  body: createReservationRequestBody;
};

/** 예약 생성 (사용자 페이지) 응답 */
declare type createReservationResponse = IReservationResponseDTO;

declare type updateReservationRequestPath = {
  /** 예약 ID */
  id: string;
};

declare type updateReservationRequestParams = {};

declare type updateReservationRequestBody = Omit<IReservation, 'id'>;

/** 예약 수정 (사용자 페이지) 요청 */
declare type updateReservationRequest = {
  params?: updateReservationRequestParams;
  path: updateReservationRequestPath;
  body: updateReservationRequestBody;
};

/** 예약 수정 (사용자 페이지) 응답 */
declare type updateReservationResponse = void;

declare type deleteReservationRequestPath = {
  /** 예약 ID */
  id: string;
};

declare type deleteReservationRequestParams = {};

declare type deleteReservationRequestBody = {};

/** 예약 삭제 (사용자 페이지) 요청 */
declare type deleteReservationRequest = {
  params?: deleteReservationRequestParams;
  path: deleteReservationRequestPath;
  body?: deleteReservationRequestBody;
};

/** 예약 삭제 (사용자 페이지) 응답 */
declare type deleteReservationResponse = void;
