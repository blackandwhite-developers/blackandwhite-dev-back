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
      const { id } = req.params;
      const lodge = await this._lodgeService.getLodge(id);
      res.send(lodge);
    } catch (error) {
      next(error);
    }
  }

  async createLodge(req: Request, res: Response, next: NextFunction) {
    try {
      const lodge = await this._lodgeService.postLodge(req.body, req.body.cid);
      res.send(lodge);
    } catch (error) {
      next(error);
    }
  }

  async updateLodge(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this._lodgeService.putLodge(id, req.body);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async deleteLodge(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this._lodgeService.deleteLodge(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
