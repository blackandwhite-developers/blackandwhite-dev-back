export class GetUserResponseDTO {
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
    /** 관심사 */
    intereste: string;
    /** 닉네임 */
    nickname: string;
  };

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
    this.name = user.name;
    this.profile = {
      id: user.profile.id,
      birth: user.profile.birth.toISOString(),
      phone: user.profile.phone,
      gender: user.profile.gender,
      address: user.profile.address,
      intereste: user.profile.interest,
      nickname: user.profile.nickname,
    };
  }
}
