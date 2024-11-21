export class User implements IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role: RoleType;
  profile: IProfile;
  terms: ITerms;
  point: number;
  coupon: Array<ICoupon>;
  accountType: 'local' | 'kakao' | 'naver' | 'apple';
  constructor(params: IUser) {
    this.id = params.id;
    this.email = params.email;
    this.name = params.name;
    this.password = params.password;
    this.role = params.role;
    this.profile = params.profile;
    this.terms = params.terms;
    this.accountType = params.accountType;
    this.point = params.point;
    this.coupon = params.coupon;
  }
}
