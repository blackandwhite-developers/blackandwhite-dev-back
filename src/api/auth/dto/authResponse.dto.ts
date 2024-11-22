import { GetUserResponseDTO } from '@/api/users/dto/getUserResponse.dto';
import { UserResponseDTO } from '@/api/users/dto/userResponse.dto';

export default class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserResponseDTO;
  constructor(accessToken: string, refreshToken: string, user: IUser) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = new GetUserResponseDTO(user);
  }
}
