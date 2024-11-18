import { Request, Response, NextFunction } from 'express';
import RoomService from '../service/room.service.type';

export default class AdminRoomController {
  private readonly _roomService: RoomService;
  constructor(roomService: RoomService) {
    this._roomService = roomService;
    this.getRooms = this.getRooms.bind(this);
    this.getRoom = this.getRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  }
  async getRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const rooms = await this._roomService.getRooms();
      res.send(rooms);
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
  async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const room = await this._roomService.createRoom(req.body);
      res.send(room);
    } catch (error) {
      next(error);
    }
  }
  async updateRoom(req: Request, res: Response, next: NextFunction) {
    try {
      await this._roomService.editRoom(req.params.id, req.body);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  async deleteRoom(req: Request, res: Response, next: NextFunction) {
    try {
      await this._roomService.deleteRoom(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
