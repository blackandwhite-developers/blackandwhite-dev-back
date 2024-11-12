/**  유저 목록 조회 응답 DTO */
export class GetUsersResponseDTO {
  id: string;
  name: string;
  email: string;
  role?: string;
  profile: {
    /** ID */
    id: string;
    /** 연락처 */
    phone: string;
    /** 생년월일 */
    birth: string;
    /** 성별 */
    gender?: string;
    /** 주소 */
    address: string;
    /** 상세주소 */
    addressDetail: string;
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
    this.profile = {
      id: user.profile.id,
      birth: user.profile.birth.toISOString(),
      phone: user.profile.phone,
      gender: user.profile.gender,
      address: user.profile.address,
      addressDetail: user.profile.addressDetail,
      intereste: user.profile.intereste,
      nickname: user.profile.nickname,
    };
  }
}
