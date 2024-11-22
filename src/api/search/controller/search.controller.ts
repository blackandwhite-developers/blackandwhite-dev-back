import { Request, Response, NextFunction } from 'express';
import { SearchService } from '../service/search.service.type';

export default class SearchController {
  private readonly _searchService: SearchService;
  constructor(searchService: SearchService) {
    this._searchService = searchService;
    this.search = this.search.bind(this);
    this.popularSearch = this.popularSearch.bind(this);
  }
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { keyword } = req.query;
      if (typeof keyword !== 'string') {
        throw new Error('Invalid keyword');
      }
      const decode = decodeURI(keyword);
      const result = await this._searchService.search(decode);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async popularSearch(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit } = req.query;

      const result = await this._searchService.popularSearch(Number(limit));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}
