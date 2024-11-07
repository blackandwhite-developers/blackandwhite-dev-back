export class GetUserResponseDTO {
  id: string;
  email: string;
  role: string;
  profile: {
    /** ID */
    id: string;
    /** 이름 */
    name: string;
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
    this.profile = {
      id: user.profile.id,
      birth: user.profile.birth,
      name: user.profile.name,
      phone: user.profile.phone,
      gender: user.profile.gender,
      address: user.profile.address,
      intereste: user.profile.intereste,
      nickname: user.profile.nickname,
    };
  }
}
