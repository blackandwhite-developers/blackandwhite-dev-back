import { Request, Response, NextFunction } from 'express';
import RoomService from '../service/room.service.type';
import LodgeRepository from '@/api/lodge/repository/lodge.repository';

export default class AdminRoomController {
  private readonly _roomService: RoomService;
  private readonly _lodgeRepository: LodgeRepository;
  constructor(
    roomService: RoomService,
    _lodgeRepository: LodgeRepository,
  ) {
    this._roomService = roomService;
    this._lodgeRepository = _lodgeRepository;

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
      const { lodgeId, initialStock, ...roomData } = req.body;
  
      if (!lodgeId) {
        return res.status(400).json({ message: 'lodgeId는 필수입니다.' });
      }

      if (!initialStock) {
        return res.status(400).json({ message: 'initialStock은 필수입니다.' });
      }
  
      const room = await this._roomService.createRoom({ lodgeId, ...roomData }, initialStock);
  
      const lodge = await this._lodgeRepository.findById(lodgeId);
  
      if (lodge) {
        const newRoomTypeAndStock: IRoomTypeAndStock = {
          roomType: [room],
          stock: initialStock,  
        };
  
        lodge.room.push(newRoomTypeAndStock);
        await this._lodgeRepository.save(lodge); 
      }
  
      res.send(room); 
    } catch (error) {
      next(error);
    }
  }
  
  async updateRoom(req: Request, res: Response, next: NextFunction) {
    try {
      await this._roomService.editRoom(req.params.id, req.body);
      res.send();
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
