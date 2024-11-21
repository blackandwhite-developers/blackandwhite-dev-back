import express from 'express';
import AuthController from '../controller/auth.controller';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import AuthServiceImpl from '../service/auth.service';
import { MongooseUserRepository } from '@/api/users/respository/user/mongooseUser.reopsitory';
import { authUserMiddleware } from '@/api/common/middlewares/authUser.middleware';

const authRouter = express.Router();

const AUTH_ROUTES = {
  LOGIN: `/api/auth/login`,
  LOGOUT: `/api/auth/logout`,
  REFRESH: `/api/auth/refresh`,
  KAKAO_SOCIAL_LOGIN: `/api/auth/kakao/login`,
  KAKAO_SOCIAL_LOGOUT: `/api/auth/naver/login`,
  NAVER_SOCIAL_LOGIN: `/api/auth/naver/login`,
  NAVER_SOCIAL_LOGOUT: `/api/auth/naver/logout`,
  APPLE_SOCIAL_LOGIN: `/api/auth/apple/login`,
  APPLE_SOCIAL_LOGOUT: `/api/auth/apple/logout`,
} as const;

const authController = new AuthController(new AuthServiceImpl(new MongooseUserRepository()));

authRouter.post(extractPath(AUTH_ROUTES.LOGIN, ROUTES_INDEX.AUTH_API), authController.login);

authRouter.post(extractPath(AUTH_ROUTES.LOGOUT, ROUTES_INDEX.AUTH_API), authUserMiddleware, authController.logout);

authRouter.post(extractPath(AUTH_ROUTES.REFRESH, ROUTES_INDEX.AUTH_API), authController.refreshToken);

authRouter.post(extractPath(AUTH_ROUTES.KAKAO_SOCIAL_LOGIN, ROUTES_INDEX.AUTH_API), authController.kakaoSocialLogin);

authRouter.post(extractPath(AUTH_ROUTES.KAKAO_SOCIAL_LOGOUT, ROUTES_INDEX.AUTH_API), authController.kakaoSocialLogout);

authRouter.post(extractPath(AUTH_ROUTES.NAVER_SOCIAL_LOGIN, ROUTES_INDEX.AUTH_API), authController.naverSocialLogin);

authRouter.post(extractPath(AUTH_ROUTES.NAVER_SOCIAL_LOGOUT, ROUTES_INDEX.AUTH_API), authController.naverSocialLogout);

authRouter.post(extractPath(AUTH_ROUTES.APPLE_SOCIAL_LOGIN, ROUTES_INDEX.AUTH_API), authController.appleSocialLogin);

authRouter.post(extractPath(AUTH_ROUTES.APPLE_SOCIAL_LOGOUT, ROUTES_INDEX.AUTH_API), authController.appleSocialLogout);

export default authRouter;
