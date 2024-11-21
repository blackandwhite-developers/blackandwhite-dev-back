type RoleType = 'admin' | 'partner' | 'user';
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
  /** 관심사 */
  interest: '호캉스' | '풀빌라' | '게스트하우스' | '전원주택' | '비지니스호텔' | '레저' | '해외숙소';
  /** 닉네임 */
  nickname: string;
  /** 프로필 사진 */
  profileImage: string;
}

interface IUser {
  /** ID */
  id: string;
  /** 이름 */
  name: string;
  /** 이메일  (unique) */
  email: string;
  /** 비밀번호 */
  password: string;
  /** 역할 */
  role: RoleType;
  /** 프로필 */
  profile: IProfile;
  /** 이용약관 동의 */
  terms: ITerms;
  /** 계정 종류 */
  /** local - 일반 로그인
   * kakao - 카카오 로그인
   * naver - 네이버 로그인
   * apple - 애플 로그인
   */
  accountType: 'local' | 'kakao' | 'naver' | 'apple';
  point: number;
  coupon: Array<ICoupon>;
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
