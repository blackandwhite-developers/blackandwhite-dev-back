import express from 'express';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import RoomController from '../controller/room.controller';
import MongooseRoomRepository from '../repository/mongooseRoom.repository';
import RoomServiceImpl from '../service/room.service';

const roomRouter = express.Router();

const ROOM_ROUTES = {
  /** 방 전체 조회 */
  GET_ROOMS: `/rooms`,
  /** 방 조회 */
  GET_ROOM: `/rooms/:id`,
} as const;

const roomController = new RoomController(new RoomServiceImpl(new MongooseRoomRepository()));
roomRouter.get(extractPath(ROOM_ROUTES.GET_ROOMS, ROUTES_INDEX.ROOMS_API), roomController.getRooms);
roomRouter.get(extractPath(ROOM_ROUTES.GET_ROOM, ROUTES_INDEX.ROOMS_API), roomController.getRoom);

export default roomRouter;
