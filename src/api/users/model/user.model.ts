export class User implements IUser {
  id: string;
  email: string;
  password?: string | undefined;
  role: RoleType;
  profile: IProfile;

  constructor(params: IUser) {
    this.id = params.id;
    this.email = params.email;
    this.password = params.password;
    this.role = params.role;
    this.profile = params.profile;
  }
}
