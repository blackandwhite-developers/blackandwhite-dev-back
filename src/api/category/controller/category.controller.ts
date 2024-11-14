import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../service/category.service.type';

export default class CategoryController {
  constructor(private _categroyService: CategoryService) {
    this.getsCategory = this.getsCategory.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    const { title, thumbnail, division } = req.body;
    try {
      const createCate = await this._categroyService.createCategory({
        title,
        thumbnail,
        division,
      });
      res.send(createCate);
    } catch (err) {
      next(err);
    }
  }
  async getsCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const cates = await this._categroyService.getsCategory();
      res.send(cate);
    } catch (err) {
      next(err);
    }
  }
  async getCategory(req: Request, res: Response, next: NextFunction) {
    const { cid } = req.params;
    try {
      const cate = await this._categroyService.getCategory(cid);
      res.send(cate);
    } catch (err) {
      next(err);
    }
  }
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('update');
    } catch (err) {
      next(err);
    }
  }
  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('delete');
    } catch (err) {
      next(err);
    }
  }
}
