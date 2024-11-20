import { REGEX } from "@/api/common/validations";
import * as yup from "yup";

/** 예약 상세 조회 Validator */
const adminGetReservationDetailPathValidator = yup.object({
    id: yup
        .string()
        .matches(REGEX.EMPTY_VARIABLE_PATH, "id는 필수 입력값입니다.")
        .required(),
});

export const adminGetReservationDetailValidator = {
    path: adminGetReservationDetailPathValidator,
};

/** 예약 생성 Validator */
const adminCreateReservationBodyValidator = yup.object({
    startDate: yup
    .string()
    .required("날짜가 입력되지 않았습니다. 날짜는 필수 입력값입니다."),

    endDate: yup
    .string()
    .required("날짜가 입력되지 않았습니다. 날짜는 필수 입력값입니다."),

    adult: yup
    .number(),

    child: yup
    .number()
});

export const adminCreateReservationValidator = {
    body: adminCreateReservationBodyValidator,
};

/** 예약 수정 Validator */
const adminUpdateReservationBodyValidator = yup.object({
    startDate: yup
    .string()
    .required("날짜가 입력되지 않았습니다. 날짜는 필수 입력값입니다."),

    endDate: yup
    .string()
    .required("날짜가 입력되지 않았습니다. 날짜는 필수 입력값입니다."),

    adult: yup
    .number(),

    child: yup
    .number()
});

const adminUpdateReservationPathValidator = yup.object({
    id: yup
        .string()
        .matches(REGEX.EMPTY_VARIABLE_PATH, "id는 필수 입력값입니다."),
});

export const adminUpdateReservationValidator = {
    body: adminUpdateReservationBodyValidator,
    path: adminUpdateReservationPathValidator,
};

/** 예약 삭제 Validator */
const adminDeleteReservationPathValidator = yup.object({
    id: yup
        .string()
        .matches(REGEX.EMPTY_VARIABLE_PATH, "id는 필수 입력값입니다."),
});

export const adminDeleteReservationValidator = {
    path: adminDeleteReservationPathValidator,
};

/** 예약 취소 Validator */
const adminCancelReservationPathValidator = yup.object({
    id: yup
        .string()
        .matches(REGEX.EMPTY_VARIABLE_PATH, "id는 필수 입력값입니다."),
});

export const adminCancelReservationValidator = {
    path: adminCancelReservationPathValidator,
}