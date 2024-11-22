import { JwtService } from '@/api/common/services/jwt.service';
import AuthService from './auth.service.type';
import { CryptoService } from '@/api/common/services/crypto.service';
import HttpException from '@/api/common/exceptions/http.exception';
import { UserRepository } from '@/api/users/respository/user/user.repository';
import redisCli from '@/db/redis';
import AuthResponseDto from '../dto/authResponse.dto';
export default class AuthServiceImpl implements AuthService {
  private readonly _userRepository: UserRepository;
  constructor(_userRepository: UserRepository) {
    this._userRepository = _userRepository;
  }
  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this._userRepository.findByEmail(email);
    if (!user) throw new HttpException(404, '존재하지 않는 사용자입니다.');
    if (!CryptoService.comparePassword(password, user.password))
      throw new HttpException(400, '비밀번호가 일치하지 않습니다.');
    const accessToken = JwtService.generateAccessToken({ userId: user.id, role: user.role, expiresIn: '1h' });
    const refreshToken = JwtService.generateRefreshToken({ userId: user.id, role: user.role, expiresIn: '14d' });
    await redisCli.setData(user.id, refreshToken, 1209600); // 14 days in seconds
    return new AuthResponseDto(accessToken, refreshToken, user);
  }
  async logout(userId: string): Promise<void> {
    await redisCli.deleteData(userId);
  }
  async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) throw new HttpException(401, '로그인이 필요합니다.');
    const userId = JwtService.verifyRefreshToken(refreshToken).userId;
    console.log(userId);
    const user = await this._userRepository.findById(userId);
    if (!user) throw new HttpException(404, '존재하지 않는 사용자입니다.');
    const { id, role } = user;
    const newAccessToken = JwtService.generateAccessToken({
      userId: id,
      role: role,
      expiresIn: '1h',
    });
    const newRefreshToken = JwtService.generateRefreshToken({
      userId: id,
      role: role,
      expiresIn: '14d',
    });
    await redisCli.setData(id, newRefreshToken, 1209600); // 14 days in seconds
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
  async kakaoSocialLogin(): Promise<void> {
    // TODO: kakao social login logic
  }
  async kakaoSocialLogout(): Promise<void> {
    // TODO: kakao social logout logic
  }
  async naverSocialLogin(): Promise<void> {
    // TODO: naver social login logic
  }
  async naverSocialLogout(): Promise<void> {
    // TODO: naver social logout logic
  }
  async appleSocialLogin(): Promise<void> {
    // TODO: apple social login logic
  }
  async appleSocialLogout(): Promise<void> {
    // TODO: apple social logout logic
  }
}
