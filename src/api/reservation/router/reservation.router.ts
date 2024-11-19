import express from 'express';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import ReservationController from '../controller/reservation.controller';
import ReservationServiceImpl from '../service/reservation.service';
import {
  getReservationValidator,
  getReservationDetailValidator,
  createReservationValidator,
  updateReservationValidator,
  deleteReservationValidator,
} from '@/api/reservation/dto/validations/reservation.validation';
import { validate } from '@/api/common/middlewares/validation.middleware';
import { MongooseReservationRepository } from '@/api/reservation/repository/mongooseReservation.repository';
import MongooseRoomRepository from '@/api/room/repository/mongooseRoom.repository';
import { authUserMiddleware } from '@/api/common/middlewares/authUser.middleware';

const reservationRouter = express.Router();

const reservationsController = new ReservationController(
  new ReservationServiceImpl(new MongooseReservationRepository()),
  new MongooseRoomRepository(),
);

const RESERVATION_ROUTES = {
  /**예약 조회 (사용자) */
  GET_RESERVATION: `/api/reservation/:userId`,
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
  validate(getReservationValidator),
  authUserMiddleware,
  reservationsController.getReservationByUserId,
);

reservationRouter.get(
  extractPath(RESERVATION_ROUTES.GET_RESERVATION_DETAIL, ROUTES_INDEX.RESERVATION_API),
  validate(getReservationDetailValidator),
  reservationsController.getReservationDetail,
);

reservationRouter.post(
  extractPath(RESERVATION_ROUTES.CREATE_RESERVATION, ROUTES_INDEX.RESERVATION_API),
  validate(createReservationValidator),
  reservationsController.createReservation,
);

reservationRouter.put(
  extractPath(RESERVATION_ROUTES.UPDATE_RESERVATION, ROUTES_INDEX.RESERVATION_API),
  validate(updateReservationValidator),
  reservationsController.updateReservation,
);

reservationRouter.delete(
  extractPath(RESERVATION_ROUTES.DELETE_RESERVATION, ROUTES_INDEX.RESERVATION_API),
  validate(deleteReservationValidator),
  reservationsController.deleteReservation,
);

reservationRouter.patch(
  extractPath(RESERVATION_ROUTES.CANCEL_RESERVATION, ROUTES_INDEX.RESERVATION_API),
  reservationsController.cancelReservation,
);

export default reservationRouter;
