import express from 'express';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import ReservationController from '../controller/reservation.controller';
import ReservationServiceImpl from '../service/reservation.service';
import {
  getReservationDetailValidator,
  createReservationValidator,
  updateReservationValidator,
  deleteReservationValidator,
} from '@/api/reservation/dto/validations/reservation.validation';
import { validate } from '@/api/common/middlewares/validation.middleware';
import { MongooseReservationRepository } from '@/api/reservation/repository/mongooseReservation.repository';
import MongooseRoomRepository from '@/api/room/repository/mongooseRoom.repository';
import { authUserMiddleware } from '@/api/common/middlewares/authUser.middleware';
import RoomServiceImpl from '@/api/room/service/room.service';
import MongooseLodgeRepository from '@/api/lodge/repository/mongooseLodge.repository';
import { MongooseUserRepository } from '@/api/users/respository/user/mongooseUser.reopsitory';

const reservationRouter = express.Router();

const reservationsController = new ReservationController(
  new ReservationServiceImpl(
    new MongooseReservationRepository(),
    new RoomServiceImpl(new MongooseRoomRepository(), new MongooseLodgeRepository()),
    new MongooseLodgeRepository(),
    new MongooseUserRepository(),
  ),
  new MongooseRoomRepository(),
);

const RESERVATION_ROUTES = {
  /**예약 조회 (사용자) */
  GET_RESERVATION: `/api/reservation/me`,
  /** 예약 상세 조회 (사용자) */
  GET_RESERVATION_DETAIL: `/api/reservation/:id`,
  /** 예약 생성 (사용자) */
  CREATE_RESERVATION: `/api/reservation`,
  /** 예약 수정 (사용자) */
  UPDATE_RESERVATION: `/api/reservation/:id`,
  /** 예약 삭제 (사용자) */
  DELETE_RESERVATION: `/api/reservation/:id`,
  /** 예약 취소 (사용자) */
  CANCEL_RESERVATION: `/api/reservation/cancel/:id`,
} as const;

reservationRouter.get(
  extractPath(RESERVATION_ROUTES.GET_RESERVATION, ROUTES_INDEX.RESERVATION_API),
  authUserMiddleware,
  reservationsController.getReservation,
);

reservationRouter.get(
  extractPath(RESERVATION_ROUTES.GET_RESERVATION_DETAIL, ROUTES_INDEX.RESERVATION_API),
  validate(getReservationDetailValidator),
  authUserMiddleware,
  reservationsController.getReservationDetail,
);

reservationRouter.post(
  extractPath(RESERVATION_ROUTES.CREATE_RESERVATION, ROUTES_INDEX.RESERVATION_API),
  validate(createReservationValidator),
  authUserMiddleware,
  reservationsController.createReservation,
);

reservationRouter.put(
  extractPath(RESERVATION_ROUTES.UPDATE_RESERVATION, ROUTES_INDEX.RESERVATION_API),
  validate(updateReservationValidator),
  authUserMiddleware,
  reservationsController.updateReservation,
);

reservationRouter.patch(
  extractPath(RESERVATION_ROUTES.CANCEL_RESERVATION, ROUTES_INDEX.RESERVATION_API),
  authUserMiddleware,
  reservationsController.cancelReservation,
);

reservationRouter.delete(
  extractPath(RESERVATION_ROUTES.DELETE_RESERVATION, ROUTES_INDEX.RESERVATION_API),
  validate(deleteReservationValidator),
  authUserMiddleware,
  reservationsController.deleteReservation,
);

export default reservationRouter;
