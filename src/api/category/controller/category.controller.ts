import { Request, Response, NextFunction } from 'express';

export default class CategoryController {
  constructor() {}

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  }
  async getsCategory(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  }
  async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  }
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  }
  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('hi');
    } catch (err) {
      next(err);
    }
  }
}
