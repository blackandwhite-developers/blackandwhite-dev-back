export default interface AuthService {
  login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;
  logout(userId: string): Promise<void>;
  refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }>;
  kakaoSocialLogin(): Promise<void>;
  kakaoSocialLogout(): Promise<void>;
  naverSocialLogin(): Promise<void>;
  naverSocialLogout(): Promise<void>;
  appleSocialLogin(): Promise<void>;
  appleSocialLogout(): Promise<void>;
}
