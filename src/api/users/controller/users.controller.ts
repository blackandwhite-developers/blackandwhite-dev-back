import { Request, Response, NextFunction } from 'express';

export default class UsersController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signUp(req: Request, res: Response, next: NextFunction) {
    res.send(req.body);
  }

  async getMyInfo(req: Request, res: Response, next: NextFunction) {
    res.send(req.body);
  }

  async updateMyInfo(req: Request, res: Response, next: NextFunction) {
    res.send(req.body);
  }

  async deactivateMyInfo(req: Request, res: Response, next: NextFunction) {
    res.send(req.body);
  }
  async deleteMyInfo(req: Request, res: Response, next: NextFunction) {
    res.send(req.body);
  }
}
