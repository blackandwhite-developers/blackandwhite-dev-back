export class Profile implements IProfile {
  id: string;
  phone: string;
  birth: Date;
  gender?: GenderType | undefined;
  address: string;
  addressDetail: string;
  intereste: string;
  nickname: string;

  constructor(params: IProfile) {
    this.id = params.id;
    this.phone = params.phone;
    this.birth = new Date(params.birth);
    this.gender = params.gender;
    this.address = params.address;
    this.addressDetail = params.addressDetail;
    this.intereste = params.intereste;
    this.nickname = params.nickname;
  }
}
