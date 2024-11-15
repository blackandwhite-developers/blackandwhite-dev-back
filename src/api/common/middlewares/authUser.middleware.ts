import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/http.exception';
import { JwtService } from '../services/jwt.service';

/** 인증 미들웨어 */
export const authUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) throw new HttpException(401, '토큰이 없습니다.');
    const accessTokenValue = accessToken?.split('Bearer ')[1];
    const payload = JwtService.verifyAccessToken(accessTokenValue);
    const refreshTokenHeader = req.headers['x-refresh-token'];
    const refreshToken = Array.isArray(refreshTokenHeader) ? refreshTokenHeader[0] : refreshTokenHeader || '';
    req.user = {
      userId: payload.userId,
      role: payload.role,
      refreshToken: refreshToken,
    };

    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(new HttpException(401, `인증 실패 ${error.message}`));
  }
};
