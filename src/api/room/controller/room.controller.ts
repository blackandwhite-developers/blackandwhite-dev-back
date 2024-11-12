import { Request, Response, NextFunction } from 'express';

export default class RoomController {
  async getRoom(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('getRoom');
    } catch (error) {
      next(error);
    }
  }
}
