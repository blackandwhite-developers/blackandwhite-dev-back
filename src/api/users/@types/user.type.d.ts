type RoleType = 'admin' | 'provider' | 'user';
type GenderType = 'M' | 'F' | 'E';

interface IProfile {
  /** ID */
  id: string;
  /** 이름 */
  name: string;
  /** 연락처 */
  phone: string;
  /** 생년월일 */
  birth: string;
  /** 성별 */
  gender?: GenderType;
  /** 주소 */
  address: string;
  /** 관심사 */
  intereste: string;
  /** 닉네임 */
  nickname: string;
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
