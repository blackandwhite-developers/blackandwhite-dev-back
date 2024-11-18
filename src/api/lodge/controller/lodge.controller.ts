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
      const { id } = req.params;
      const lodge = await this._lodgeService.getLodge(id);
      res.status(200).json(lodge);
    } catch (error) {
      next(error);
    }
  }
}
