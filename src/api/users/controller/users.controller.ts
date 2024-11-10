import { Request, Response, NextFunction } from 'express';

export default class UsersController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }

  async getMyInfo(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }

  async updateMyInfo(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }

  async deactivateMyInfo(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
  async deleteMyInfo(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
}
