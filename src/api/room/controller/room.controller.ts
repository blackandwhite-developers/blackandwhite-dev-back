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
      this._roomService.getRooms();
    } catch (error) {
      next(error);
    }
  }
  async getRoom(req: Request, res: Response, next: NextFunction) {
    try {
      this._roomService.getRoom(req.params.id);
    } catch (error) {
      next(error);
    }
  }
}
