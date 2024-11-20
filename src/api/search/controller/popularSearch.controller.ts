// [인기 검색]
// 인기 검색어 저장 - postPopularSearch
// 인기 검색어 최근 목록 - getPopularSearch

import { NextFunction, Request, Response } from "express";
import { PopularSearchService } from "../service/popularSearch.service.type";

export default class PopularSearchControlller {
    private readonly _popularSearchService: PopularSearchService;

    constructor(
        _popularSearchService: PopularSearchService,
    ) {
        this._popularSearchService = _popularSearchService;

        this.postPopularSearch = this.postPopularSearch.bind(this);
        this.getPopularSearch = this.getPopularSearch.bind(this);
    }

    async postPopularSearch(req: Request, res: Response, next: NextFunction) {
        try {
            const { searchTerm } = req.body;
            if (!searchTerm) {
                return res.status(400).json({ message: "searchTerm이 필요합니다." });
            }

            const result = await this._popularSearchService.postPopularSearch(searchTerm);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getPopularSearch(req: Request, res: Response, next: NextFunction) {
        try {
            const duration = parseInt(req.query.duration as string) || 7; 
            const popularSearches = await this._popularSearchService.getPopularSearch(duration);
            res.status(200).json(popularSearches);
        } catch (error) {
            next(error);
        }
    }
}