import { UserRepository } from '../respository/user/user.repository';
import { ProfileRepository } from '../respository/profile/profile.repository';

import { UserService } from './user.service.type';

import { GetUserResponseDTO } from '../dto/getUserResponse.dto';
import { GetUsersResponseDTO } from '../dto/getUsersResponse.dto';
import { UserResponseDTO } from '../dto/userResponse.dto';
import HttpException from '@/api/exceptions/http.exception';

export class UsersServiceImpl implements UserService {
  // profile 추가 해야함
  constructor(
    private readonly _mongooseUserRepository: UserRepository,
    private readonly _mongooseProfileRepository: ProfileRepository,
  ) {}

  async getUsers(): Promise<{ results: GetUsersResponseDTO[] }> {
    const users = await this._mongooseUserRepository.findAll();
    return { results: users.map(user => new GetUsersResponseDTO(user)) };
  }

  async getUserDetail(id: string): Promise<GetUserResponseDTO | null> {
    const user = await this._mongooseUserRepository.findById(id);

    if (!user) throw new HttpException(404, '유저를 찾을 수 없습니다.');

    const dtoUser = new GetUserResponseDTO(user);

    return dtoUser;
  }
  async createUser(
    params: Omit<IUser, 'id' | 'role' | 'profile'> & { profile: Omit<IProfile, 'id'> } & { terms: Omit<ITerms, 'id'> },
  ): Promise<UserResponseDTO> {
    const profile = await this._mongooseProfileRepository.save(params.profile);
    const user = await this._mongooseUserRepository.save({
      ...params,
      profile,
      role: 'user',
    });

    return new UserResponseDTO(user);
  }
  async updateUser(userId: string, params: Partial<IUser>): Promise<void> {
    const findUser = await this._mongooseUserRepository.findById(userId);
    if (!findUser) throw new HttpException(404, '유저를 찾을 수 없습니다.');

    const updateProfile = await this._mongooseProfileRepository.update(findUser.profile.id, params?.profile || {});

    await this._mongooseUserRepository.update(userId, {
      ...params,
      profile: updateProfile,
    });

    return;
  }
  async deleteUser(id: string): Promise<void> {
    const findUser = await this._mongooseUserRepository.findById(id);

    if (!findUser) throw new HttpException(404, '유저를 찾을 수 없습니다.');

    await this._mongooseProfileRepository.delete(findUser.profile.id);

    await this._mongooseUserRepository.delete(id);

    return;
  }
}
