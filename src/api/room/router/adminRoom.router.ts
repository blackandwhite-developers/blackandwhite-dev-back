import express from 'express';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import AdminRoomController from '../controller/adminRoom.controller';
import RoomServiceImpl from '../service/room.service';
import MongooseRoomRepository from '../repository/mongooseRoom.repository';
import MongooseLodgeRepository from '@/api/lodge/repository/mongooseLodge.repository';

const adminRoomRouter = express.Router();

const ADMIN_ROOM_ROUTES = {
  /** 방 전체 조회 */
  GET_ROOMS: `/admin-api/rooms`,
  /** 방 조회 */
  GET_ROOM: `/admin-api/rooms/:id`,
  /** 방 등록 */
  POST_ROOM: `/admin-api/rooms`,
  /** 방 수정 */
  PUT_ROOM: `/admin-api/rooms/:id`,
  /** 방 삭제 */
  DELETE_ROOM: `/admin-api/rooms/:id`,
} as const;

const adminRoomController = new AdminRoomController(
  new RoomServiceImpl(
    new MongooseRoomRepository(), 
    new MongooseLodgeRepository()
  ), new MongooseLodgeRepository()
);
adminRoomRouter.get(extractPath(ADMIN_ROOM_ROUTES.GET_ROOM, ROUTES_INDEX.ADMIN_ROOMS_API), adminRoomController.getRoom);
adminRoomRouter.get(
  extractPath(ADMIN_ROOM_ROUTES.GET_ROOMS, ROUTES_INDEX.ADMIN_ROOMS_API),
  adminRoomController.getRooms,
);

adminRoomRouter.post(
  extractPath(ADMIN_ROOM_ROUTES.POST_ROOM, ROUTES_INDEX.ADMIN_ROOMS_API),
  adminRoomController.createRoom,
);
adminRoomRouter.put(
  extractPath(ADMIN_ROOM_ROUTES.PUT_ROOM, ROUTES_INDEX.ADMIN_ROOMS_API),
  adminRoomController.updateRoom,
);
adminRoomRouter.delete(
  extractPath(ADMIN_ROOM_ROUTES.DELETE_ROOM, ROUTES_INDEX.ADMIN_ROOMS_API),
  adminRoomController.deleteRoom,
);

export default adminRoomRouter;
