import { GetUserResponseDTO } from '../dto/getUserResponse.dto';
import { GetUsersResponseDTO } from '../dto/getUsersResponse.dto';
import { UserResponseDTO } from '../dto/userResponse.dto';

export interface UserService {
  /** 유저 목록 조회 */
  getUsers(): Promise<{
    results: GetUsersResponseDTO[];
  }>;
  /** 유저 조회 */
  getUserDetail(id: string): Promise<GetUserResponseDTO | null>;
  /** 유저 생성 */
  createUser(
    params: Omit<IUser, 'id' | 'role' | 'profile'> & {
      profile: Omit<IProfile, 'id'>;
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
