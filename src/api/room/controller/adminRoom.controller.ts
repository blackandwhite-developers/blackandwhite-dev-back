import { Request, Response, NextFunction } from 'express';

export default class AdminRoomController {
  async getRoom(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('getRoom');
    } catch (error) {
      next(error);
    }
  }
  async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('createRoom');
    } catch (error) {
      next(error);
    }
  }
  async updateRoom(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('updateRoom');
    } catch (error) {
      next(error);
    }
  }
  async deleteRoom(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('deleteRoom');
    } catch (error) {
      next(error);
    }
  }
}
