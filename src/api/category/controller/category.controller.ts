import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../service/category.service.type';

export default class CategoryController {
  constructor(private _categoryService: CategoryService) {
    this.getsCategory = this.getsCategory.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.addSubCategory = this.addSubCategory.bind(this);
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    const { title, thumbnail, path } = req.body;
    try {
      const createCate = await this._categoryService.createCategory({
        title,
        path,
        thumbnail,
      });
      res.send(createCate);
    } catch (err) {
      next(err);
    }
  }
  async getsCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { level, parent } = req.query;
      const parentParam = typeof parent === 'string' ? parent : null;
      const cates = await this._categoryService.getsCategory(Number(level ?? 0), parentParam);
      console.log(cates);
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
      const { title, thumbnail, path } = req.body;
      await this._categoryService.updateCategory(cid, {
        title,
        path,
        thumbnail,
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

  async addSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { cid } = req.params;
      const { title, thumbnail, path } = req.body;
      await this._categoryService.addSubCategory(cid, {
        title,
        path,
        thumbnail,
      });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
