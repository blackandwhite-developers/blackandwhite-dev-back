import { Request, Response, NextFunction } from 'express';
import LodgeService from '../service/lodge.service.type';

export default class AdminLodgeController {
  private readonly _lodgeService: LodgeService;
  constructor(_lodgeService: LodgeService) {
    this._lodgeService = _lodgeService;
    this.getLodge = this.getLodge.bind(this);
    this.createLodge = this.createLodge.bind(this);
    this.updateLodge = this.updateLodge.bind(this);
    this.deleteLodge = this.deleteLodge.bind(this);
  }

  async getLodge(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('숙소 조회');
    } catch (error) {
      next(error);
    }
  }

  async createLodge(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('숙소 등록');
    } catch (error) {
      next(error);
    }
  }

  async updateLodge(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('숙소 수정');
    } catch (error) {
      next(error);
    }
  }

  async deleteLodge(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('숙소 삭제');
    } catch (error) {
      next(error);
    }
  }
}
