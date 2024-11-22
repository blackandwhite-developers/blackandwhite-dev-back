/**  유저 목록 조회 응답 DTO */
export class GetUsersResponseDTO {
  id: string;
  name: string;
  email: string;
  role?: string;
  point: number;
  coupon: Array<ICoupon>;
  profile: {
    /** ID */
    id: string;
    /** 연락처 */
    phone: string;
    /** 생년월일 */
    birth: string;
    /** 성별 */
    gender?: string;
    /** 관심사 */
    intereste: string;
    /** 닉네임 */
    nickname: string;
  };
  /** 예약 목록 */
  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.point = user.point;
    this.coupon = user.coupon;
    this.profile = {
      id: user.profile.id,
      birth: user.profile.birth.toISOString(),
      phone: user.profile.phone,
      gender: user.profile.gender,
      intereste: user.profile.interest,
      nickname: user.profile.nickname,
    };
  }
}
