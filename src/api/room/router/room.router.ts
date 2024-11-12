import express from 'express';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import RoomController from '../controller/room.controller';

const roomRouter = express.Router();

const ROOM_ROUTES = {
  /** 방 조회 */
  GET_ROOM: `/rooms/:id`,
} as const;

const roomController = new RoomController();

roomRouter.get(extractPath(ROOM_ROUTES.GET_ROOM, ROUTES_INDEX.ROOMS_API), roomController.getRoom);
