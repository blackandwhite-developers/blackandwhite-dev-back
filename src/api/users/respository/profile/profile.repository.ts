export interface ProfileRepository {
  /** 프로필 생성 */
  save(profile: Omit<IProfile, 'id'>): Promise<IProfile>;
  /** 프로필 전체 조회 */
  findAll(): Promise<IProfile[]>;
  /** ID로 프로필 조회 */
  findById(id: string): Promise<IProfile | null>;
  /** EMAIL로 프로필 조회 */
  findByEmail(email: string): Promise<IProfile | null>;
  /** 유저 수정 */
  update(profileId: string, updateProfileInfo: Partial<IUser>): Promise<IProfile>;
  /** 유저 삭제 */
  delete(profileId: string): Promise<void>;
}
