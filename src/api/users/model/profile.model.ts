export class Profile implements IProfile {
  id: string;
  phone: string;
  birth: Date;
  gender?: GenderType | undefined;
  interest: '호캉스' | '풀빌라' | '게스트하우스' | '전원주택' | '비지니스호텔' | '레저' | '해외숙소';
  nickname: string;
  profileImage: string;

  constructor(params: IProfile) {
    this.id = params.id;
    this.phone = params.phone;
    this.birth = new Date(params.birth);
    this.gender = params.gender;
    this.interest = params.interest;
    this.nickname = params.nickname;
    this.profileImage = params.profileImage;
  }
}
