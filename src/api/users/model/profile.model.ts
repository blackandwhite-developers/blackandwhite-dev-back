export class Profile implements IProfile {
  id: string;
  name: string;
  phone: string;
  birth: string;
  gender?: GenderType | undefined;
  address: string;
  addressDetail: string;
  intereste: string;
  nickname: string;

  constructor(params: IProfile) {
    this.id = params.id;
    this.name = params.name;
    this.phone = params.phone;
    this.birth = params.birth;
    this.gender = params.gender;
    this.address = params.address;
    this.addressDetail = params.addressDetail;
    this.intereste = params.intereste;
    this.nickname = params.nickname;
  }
}
