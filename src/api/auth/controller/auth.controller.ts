import { Request, Response, NextFunction } from 'express';
import AuthService from '../service/auth.service.type';

export default class AuthController {
  private readonly _authService: AuthService;
  constructor(_authService: AuthService) {
    this._authService = _authService;
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.kakaoSocialLogin = this.kakaoSocialLogin.bind(this);
    this.kakaoSocialLogout = this.kakaoSocialLogout.bind(this);
    this.naverSocialLogin = this.naverSocialLogin.bind(this);
    this.naverSocialLogout = this.naverSocialLogout.bind(this);
    this.appleSocialLogin = this.appleSocialLogin.bind(this);
    this.appleSocialLogout = this.appleSocialLogout.bind(this);
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const authUser = await this._authService.login(email, password);
      res.status(201).json(authUser);
    } catch (error) {
      next(error);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      await this._authService.logout(userId);
      res.status(201).json({ message: '로그아웃 성공' });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const newToken = await this._authService.refresh(refreshToken);
      res.status(201).json(newToken);
    } catch (error) {
      next(error);
    }
  }

  async kakaoSocialLogin(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({ message: '카카오 로그인 성공' });
    } catch (error) {
      next(error);
    }
  }

  async kakaoSocialLogout(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({ message: '카카오 로그아웃 성공' });
    } catch (error) {
      next(error);
    }
  }

  async naverSocialLogin(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({ message: '네이버 로그인 성공' });
    } catch (error) {
      next(error);
    }
  }

  async naverSocialLogout(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({ message: '네이버 로그아웃 성공' });
    } catch (error) {
      next(error);
    }
  }

  async appleSocialLogin(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({ message: '애플 로그인 성공' });
    } catch (error) {
      next(error);
    }
  }

  async appleSocialLogout(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({ message: '애플 로그아웃 성공' });
    } catch (error) {
      next(error);
    }
  }
}
