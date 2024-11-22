import { Request, Response, NextFunction } from 'express';
import LodgeService from '../service/lodge.service.type';
import mongoose from 'mongoose';

export default class LodgeController {
  private readonly _lodgeService: LodgeService;
  public constructor(_lodgeService: LodgeService) {
    this._lodgeService = _lodgeService;
    this.getLodges = this.getLodges.bind(this);
    this.getLodge = this.getLodge.bind(this);
  }

  async getLodges(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.query;
  
      if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId as string)) {
        return res.status(400).json({ message: '유효한 카테고리 ID가 필요합니다.' });
      }
      const categoryIdString = categoryId.toString(); 
      
      const lodges = await this._lodgeService.getLodgesByCategory(categoryIdString);
  
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
}
