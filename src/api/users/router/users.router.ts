import express from 'express';
import UsersController from '../controller/users.controller';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';

const userRouter = express.Router();

const USER_ROUTES = {
  /** 회원가입 */
  SIGN_UP: `/api/users`,
  /** 내 정보 조회 */
  GET_MY_INFO: `/api/users/me`,
  /** 내 정보 수정 */
  UPDATE_MY_INFO: `/api/users/me`,
  /** 회원탈퇴(삭제)*/
  DELETE_MY_INFO: `/api/users/delete`,
} as const;

const userController = new UsersController();

userRouter.post(extractPath(USER_ROUTES.SIGN_UP, ROUTES_INDEX.USERS_API), userController.signUp);

userRouter.get(extractPath(USER_ROUTES.GET_MY_INFO, ROUTES_INDEX.USERS_API), userController.getMyInfo);

userRouter.put(extractPath(USER_ROUTES.UPDATE_MY_INFO, ROUTES_INDEX.USERS_API), userController.updateMyInfo);

userRouter.delete(extractPath(USER_ROUTES.DELETE_MY_INFO, ROUTES_INDEX.USERS_API), userController.deleteMyInfo);

export default userRouter;