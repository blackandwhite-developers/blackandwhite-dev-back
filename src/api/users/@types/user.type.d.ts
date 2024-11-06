type RoleType = 'admin' | 'provider' | 'user';

interface IProfile {
  /** ID */
  id?: string;
  /** 이름 */
  name: string;
  /** 생년월일 */
  birth: string;
  /** 성별 (M- 남자, F - 여자, E - 기타) */
  gender?: 'M' | 'F' | 'E';
  /** 프로필 이미지 */
  thumbnail?: string;
  /** 연락처 */
  phone: string;
}

interface IUser {
  /** ID */
  id: string;
  /** 이메일  (unique) */
  email: string;
  /** 비밀번호 */
  password?: string;
  /** 역할 */
  role: RoleType;
  /** 프로필 */
  profile: IProfile;
}
