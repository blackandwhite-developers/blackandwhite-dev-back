import { REGEX } from "@/api/common/validations";
import * as yup from "yup";

const getReservationPathValidator = yup.object({
    id: yup
        .string()
        .matches(REGEX.EMPTY_VARIABLE_PATH, "id는 필수 입력값입니다.")
        .required(),
});

/** 예약 목록 조회 Validator */
export const getReservationValidator = {
    path: getReservationPathValidator,
};

const getReservationDetailPathValidator = yup.object({
    id: yup
        .string()
        .matches(REGEX.EMPTY_VARIABLE_PATH, "id는 필수 입력값입니다.")
        .required(),
});

/** 예약 상세 조회 Validator */
export const getReservationDetailValidator = {
    path: getReservationDetailPathValidator,
};

/** 예약 생성 Validator */
const createReservationBodyValidator = yup.object({
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

export const createReservationValidator = {
    body: createReservationBodyValidator,
};

/** 예약 수정 Validator */
const updateReservationBodyValidator = yup.object({
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

const updateReservationPathValidator = yup.object({
    id: yup
        .string()
        .matches(REGEX.EMPTY_VARIABLE_PATH, "id는 필수 입력값입니다."),
});

export const updateReservationValidator = {
    body: updateReservationBodyValidator,
    path: updateReservationPathValidator,
};

/** 예약 삭제 Validator */
const deleteReservationPathValidator = yup.object({
    id: yup
        .string()
        .matches(REGEX.EMPTY_VARIABLE_PATH, "id는 필수 입력값입니다."),
});

export const deleteReservationValidator = {
    path: deleteReservationPathValidator,
};