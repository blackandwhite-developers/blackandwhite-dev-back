export class UserResponseDTO {
  /** 유저 ID */
  id!: string;
  /** 유저 Email */
  email!: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
  }
}
