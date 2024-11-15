import { GetUserResponseDTO } from '../dto/getUserResponse.dto';
import { GetUsersResponseDTO } from '../dto/getUsersResponse.dto';
import { UserResponseDTO } from '../dto/userResponse.dto';

export interface UserService {
  /** 비밀번호 수정 전 이름과 전화번호로 유저 인증 및 이메일 송신 */
  authNameAndEmail(name: string, email: string): Promise<void>;
  /** 비밀번호 변경 */
  resetPassword(name: string, email: string, newPassword: string): Promise<void>;
  /** 이름과 전화번호로 유저 조회 */
  getEmailByNameAndPhone(name: string, phone: string): Promise<string | null>;
  /** 유저 목록 조회 */
  getUsers(): Promise<{
    results: GetUsersResponseDTO[];
  }>;
  /** 유저 조회 */
  getUserDetail(id: string): Promise<GetUserResponseDTO | null>;
  /** 유저 생성 */
  createUser(
    params:
      | Omit<IUser, 'id' | 'role' | 'profile'>
      | {
          profile: Omit<IProfile, 'id'>;
          terms: Omit<ITerms, 'id'>;
        },
  ): Promise<UserResponseDTO>;
  /** 유저 수정 */
  updateUser(
    id: string,
    params: Partial<
      Omit<IUser, 'id' | 'role' | 'profile'> & {
        profile: Omit<IProfile, 'id'>;
      }
    >,
  ): Promise<void>;
  /** 유저 삭제 */
  deleteUser(id: string): Promise<void>;
}
