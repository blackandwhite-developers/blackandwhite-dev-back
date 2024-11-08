export interface UserRepository {
  /** 유저 생성 */
  save(user: Omit<IUser, 'id'>): Promise<IUser>;
  /** 유저 목록 조회 */
  findAll(): Promise<IUser[]>;
  /** ID로 유저 조회 */
  findById(id: string): Promise<IUser | null>;
  /** 이메일로 유저 조회 */
  findByEmail(email: string): Promise<IUser | null>;
  /** 유저 수정 */
  update(userId: string, updateUserInfo: Partial<IUser>): Promise<void>;
  /** 유저 삭제 */
  delete(userId: string): Promise<void>;
}
