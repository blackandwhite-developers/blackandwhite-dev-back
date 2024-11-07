type RoleType = 'admin' | 'provider' | 'user';
type GenderType = 'M' | 'F' | 'E';

interface IProfile {
  /** ID */
  id: string;
  /** 연락처 */
  phone: string;
  /** 생년월일 */
  birth: Date;
  /** 성별 */
  gender?: GenderType;
  /** 주소 */
  address: string;
  /** 상세 주소 */
  addressDetail: string;
  /** 관심사 */
  interest: string;
  /** 닉네임 */
  nickname: string;
}

interface IUser {
  /** ID */
  id: string;
  /** 이름 */
  name: string;
  /** 이메일  (unique) */
  email: string;
  /** 비밀번호  */
  password?: string;
  /** 역할 */
  role: RoleType;
  /** 프로필 */
  profile: IProfile;
  /** 이용약관 동의 */
  terms: ITerms;
}

interface ITerms {
  /** ID */
  id: string;
  /** 이용약관 */
  termsOfService: boolean;
  /** 개인정보 수집 / 이용 */
  privacyPolicy: boolean;
  /** 위치 정보 이용 동의 (선택) */
  locationBasedService: boolean;
  /** 마케팅 정보 수신 동의 (선택) */
  marketingInfoAgree: boolean;
}
