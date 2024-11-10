import { Request, Response, NextFunction } from 'express';
import LodgeService from '../service/lodge.service.type';

export default class LodgeController {
  private readonly _lodgeService: LodgeService;
  public constructor(_lodgeService: LodgeService) {
    this._lodgeService = _lodgeService;
    this.getLodge = this.getLodge.bind(this);
  }
  async getLodge(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('숙소 조회');
    } catch (error) {
      next(error);
    }
  }
}
