export const REGEX = {
    /** 이메일 */
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    /** 동적 Path 확인 */
    EMPTY_VARIABLE_PATH: /^(?![\:].)+/,
    /** 휴대폰 번호 */
    PHONE_NUMBER: /^\d{3}(?:-)?\d{3,4}(?:-)?\d{4}$/,
    /** 비밀번호 */
    PASSWORD: /^(?=.*[a-zA-Z0-9]).{8,16}$/,
} as const;
