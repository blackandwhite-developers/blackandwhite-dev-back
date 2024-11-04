import jwt from 'jsonwebtoken';

type Params = {
  userId: string;
  role?: string;
  expiresIn?: string;
};

export class JwtService {
  static readonly SECRET_KEY = process.env.JWT_SECRET || 'secret';
  static readonly REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET || 'refresh';
  /** accessToken 검증 */
  static verifyAccessToken(token: string) {
    const secret = this.SECRET_KEY;
    return jwt.verify(token, secret) as jwt.JwtPayload;
  }
  /** refreshToken 검증 */
  static verifyRefreshToken(token: string) {
    const secret = this.REFRESH_SECRET_KEY;
    return jwt.verify(token, secret) as jwt.JwtPayload;
  }
  /** accessToken 발급 */
  static generateAccessToken(params: Params) {
    const { userId, role, expiresIn } = params;
    const secret = this.SECRET_KEY;
    return jwt.sign({ userId, role }, secret, { expiresIn });
  }
  /** refreshToken 발급 */
  static generateRefreshToken(params: Params) {
    const { userId, role, expiresIn } = params;
    const secret = this.REFRESH_SECRET_KEY;
    return jwt.sign({ userId, role }, secret, { expiresIn });
  }
}
