import { GetUserResponseDTO } from '../dto/getUserResponse.dto';
import { GetUsersResponseDTO } from '../dto/getUsersResponse.dto';
import { UserResponseDTO } from '../dto/userResponse.dto';
import { UserService } from './user.service.type';

export class UsersServiceImpl implements UserService {
  // constructor(
  //   private readonly _userRepository: UserRepository,
  //   private readonly _profileRepository: ProfileRepository,
  // ) {}
  getUsers({
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  }): Promise<{ totalCount: number; prev: string | null; results: GetUsersResponseDTO[]; next: string | null }> {
    throw new Error('Method not implemented.');
  }
  getUserDetail(id: string): Promise<GetUserResponseDTO | null> {
    throw new Error('Method not implemented.');
  }
  createUser(
    params: Omit<IUser, 'id' | 'role' | 'profile'> & { profile: Omit<IProfile, 'id'> },
  ): Promise<UserResponseDTO> {
    throw new Error('Method not implemented.');
  }
  updateUser(
    id: string,
    params: Partial<Omit<IUser, 'id' | 'role' | 'profile'> & { profile: Omit<IProfile, 'id'> }>,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
