import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../service/category.service.type';

export default class CategoryController {
  constructor(private _categoryService: CategoryService) {
    this.getsCategory = this.getsCategory.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    const { title, thumbnail, division } = req.body;
    try {
      const createCate = await this._categoryService.createCategory({
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
      const cates = await this._categoryService.getsCategory();
      res.send(cates);
    } catch (err) {
      next(err);
    }
  }
  async getCategory(req: Request, res: Response, next: NextFunction) {
    const { cid } = req.params;
    try {
      const cate = await this._categoryService.getCategory(cid);
      res.send(cate);
    } catch (err) {
      next(err);
    }
  }
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { cid } = req.params;
      const { title, thumbnail, division } = req.body;
      await this._categoryService.updateCategory(cid, {
        title,
        thumbnail,
        division,
      });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { cid } = req.params;
      await this._categoryService.deleteCategory(cid);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
