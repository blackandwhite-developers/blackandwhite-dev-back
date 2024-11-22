import { Request, Response, NextFunction } from 'express';
import RoomService from '../service/room.service.type';

export default class RoomController {
  private readonly _roomService: RoomService;
  constructor(roomService: RoomService) {
    this._roomService = roomService;
    this.getRooms = this.getRooms.bind(this);
    this.getRoom = this.getRoom.bind(this);
  }

  async getRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const lodgeId = req.query.lodgeId as string;

      const rooms = await this._roomService.getRooms();

      const filteredRooms = lodgeId
      ? rooms.filter((room) => room.lodgeId === lodgeId)
      : rooms;

      res.send(filteredRooms);
    } catch (error) {
      next(error);
    }
  }
  async getRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const room = await this._roomService.getRoom(req.params.id);
      res.send(room);
    } catch (error) {
      next(error);
    }
  }
}
