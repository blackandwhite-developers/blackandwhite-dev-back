import express from 'express';
import UsersController from '../controller/users.controller';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';

import { UsersServiceImpl } from '../service/user.service';
import { MongooseUserRepository } from '../respository/user/mongooseUser.reopsitory';
import { MongooseProfileRepository } from '../respository/profile/mongooseProfile.repository';
import MongooseTermsRepository from '../respository/terms/mongooseTerms.repository';
import { authUserMiddleware } from '@/api/common/middlewares/authUser.middleware';
import { authRoleMiddleware } from '@/api/common/middlewares/authRole.middleware';

const userRouter = express.Router();

const USER_ROUTES = {
  /** 회원가입 */
  SIGN_UP: `/api/users`,
  /** 내 정보 조회 */
  GET_MY_INFO: `/api/users/me`,
  /** ID 찾기 */
  FIND_ID: `/api/users/id`,
  /** 내 비밀번호 수정 전 인증 */
  AUTH_PASSWORD: `/api/users/password`,
  /** 내 비밀번호 초기화 */
  RESET_PASSWORD: `/api/users/password`,
  /** 내 정보 수정 */
  UPDATE_MY_INFO: `/api/users/me`,
  /** 회원탈퇴(삭제)*/
  DELETE_MY_INFO: `/api/users`,
  /** 권한 부여 */
  GRANT_AUTH: `/api/users/role`,
} as const;

const userController = new UsersController(
  new UsersServiceImpl(new MongooseUserRepository(), new MongooseProfileRepository(), new MongooseTermsRepository()),
);
userRouter.post(extractPath(USER_ROUTES.SIGN_UP, ROUTES_INDEX.USERS_API), userController.signUp);

userRouter.get(extractPath(USER_ROUTES.FIND_ID, ROUTES_INDEX.USERS_API), userController.findId);

userRouter.get(
  extractPath(USER_ROUTES.GET_MY_INFO, ROUTES_INDEX.USERS_API),
  authUserMiddleware,
  userController.getMyInfo,
);

userRouter.post(extractPath(USER_ROUTES.AUTH_PASSWORD, ROUTES_INDEX.USERS_API), userController.authPassword);

userRouter.post(
  extractPath(USER_ROUTES.GRANT_AUTH, ROUTES_INDEX.USERS_API),
  authRoleMiddleware(['admin', 'user']),
  userController.grantRole,
);

userRouter.put(extractPath(USER_ROUTES.RESET_PASSWORD, ROUTES_INDEX.USERS_API), userController.resetPassword);

userRouter.put(
  extractPath(USER_ROUTES.UPDATE_MY_INFO, ROUTES_INDEX.USERS_API),
  authUserMiddleware,
  userController.updateUser,
);

userRouter.delete(
  extractPath(USER_ROUTES.DELETE_MY_INFO, ROUTES_INDEX.USERS_API),
  authUserMiddleware,
  userController.deleteUser,
);

export default userRouter;
