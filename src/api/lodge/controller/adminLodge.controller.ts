import { Request, Response, NextFunction } from 'express';
import LodgeService from '../service/lodge.service.type';

export default class AdminLodgeController {
  private readonly _lodgeService: LodgeService;
  constructor(_lodgeService: LodgeService) {
    this._lodgeService = _lodgeService;
    this.getLodges = this.getLodges.bind(this);
    this.getLodge = this.getLodge.bind(this);
    this.createLodge = this.createLodge.bind(this);
    this.updateLodge = this.updateLodge.bind(this);
    this.deleteLodge = this.deleteLodge.bind(this);
  }

  async getLodges(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.query; 
      if (!categoryId) {
        return res.status(400).json({ message: '카테고리 ID가 필요합니다.' });
      }

      const lodges = await this._lodgeService.getLodgesByCategory(categoryId as string);
      res.status(200).json(lodges);
    } catch (error) {
      next(error);
    }
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

  async createLodge(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const { categoryId, ...lodgeData } = req.body;
      if (!categoryId) {
        return res.status(400).json({ message: '카테고리 ID가 필요합니다.' });
      }
      console.log(lodgeData);
      const lodge = await this._lodgeService.postLodge(lodgeData, categoryId);
      res.status(201).json(lodge);
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
