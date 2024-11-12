export class User implements IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role: RoleType;
  profile: IProfile;
  terms: ITerms;

  constructor(params: IUser) {
    this.id = params.id;
    this.email = params.email;
    this.name = params.name;
    this.password = params.password;
    this.role = params.role;
    this.profile = params.profile;
    this.terms = params.terms;
  }
}
