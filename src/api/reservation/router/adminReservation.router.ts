import express from 'express';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import AdminReservationController from '../controller/adminReservation.controller';
import ReservationServiceImpl from '../service/reservation.service';
import {
  adminGetReservationDetailValidator,
  adminCreateReservationValidator,
  adminUpdateReservationValidator,
  adminDeleteReservationValidator,
  adminCancelReservationValidator
} from "@/api/reservation/dto/validations/adminReservation.validation";
import { validate } from "@/api/common/middlewares/validation.middleware";
import { MongooseReservationRepository } from '../repository/mongooseReservation.repository';
import MongooseRoomRepository from '@/api/room/repository/mongooseRoom.repository';
import { authRoleMiddleware } from '@/api/common/middlewares/authRole.middleware';
import RoomServiceImpl from '@/api/room/service/room.service';
import MongooseLodgeRepository from '@/api/lodge/repository/mongooseLodge.repository';

const adminReservationRouter = express.Router();

const adminReservationController = new AdminReservationController(
  new ReservationServiceImpl(
    new MongooseReservationRepository(),
    new RoomServiceImpl(
      new MongooseRoomRepository(),
      new MongooseLodgeRepository()
    )
  ), new MongooseRoomRepository()
);

const ADMIN_RESERVATION_ROUTES = {
  /**예약 조회 (관리자) */
  GET_RESERVATION: `/admin-api/reservation`,
  /** 예약 상세 조회 (관리자) */
  GET_RESERVATION_DETAIL: `/admin-api/reservation/:id`,
  /** 예약 생성 (관리자) */
  CREATE_RESERVATION: `/admin-api/reservation`,
  /** 예약 수정 (관리자) */
  UPDATE_RESERVATION: `/admin-api/reservation/:id`,
  /** 예약 삭제 (관리자) */
  DELETE_RESERVATION: `/admin-api/reservation/:id`,
  /** 예약 취소 (관리자) */
  CANCEL_RESERVATION: `/admin-api/reservation/:id/cancel`,
} as const;

adminReservationRouter.get(
  extractPath(ADMIN_RESERVATION_ROUTES.GET_RESERVATION, ROUTES_INDEX.ADMIN_RESERVATION_API),
  authRoleMiddleware(["admin"]),
  adminReservationController.getReservation
);

adminReservationRouter.get(
  extractPath(ADMIN_RESERVATION_ROUTES.GET_RESERVATION_DETAIL, ROUTES_INDEX.ADMIN_RESERVATION_API),
  validate(adminGetReservationDetailValidator),
  authRoleMiddleware(["admin"]),
  adminReservationController.getReservationDetail
);

adminReservationRouter.post(
  extractPath(ADMIN_RESERVATION_ROUTES.CREATE_RESERVATION, ROUTES_INDEX.ADMIN_RESERVATION_API),
  validate(adminCreateReservationValidator),
  authRoleMiddleware(["admin"]),
  adminReservationController.createReservation
);

adminReservationRouter.put(
  extractPath(ADMIN_RESERVATION_ROUTES.UPDATE_RESERVATION, ROUTES_INDEX.ADMIN_RESERVATION_API),
  validate(adminUpdateReservationValidator),
  authRoleMiddleware(["admin"]),
  adminReservationController.updateReservation
);

adminReservationRouter.delete(
  extractPath(ADMIN_RESERVATION_ROUTES.DELETE_RESERVATION, ROUTES_INDEX.ADMIN_RESERVATION_API),
  validate(adminDeleteReservationValidator),
  authRoleMiddleware(["admin"]),
  adminReservationController.deleteReservation
);

adminReservationRouter.patch(
  extractPath(ADMIN_RESERVATION_ROUTES.CANCEL_RESERVATION, ROUTES_INDEX.ADMIN_RESERVATION_API),
  validate(adminCancelReservationValidator),
  authRoleMiddleware(["admin"]),
  adminReservationController.patchCancelReservation
);

export default adminReservationRouter;