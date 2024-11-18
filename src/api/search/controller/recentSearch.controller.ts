// [최근 검색]
// 최근 검색어 저장 - postRecentSearch
// 최근 검색어 최근 목록 - getRecentSearch

import { NextFunction, Request, Response } from "express";
import { RecentSearchService } from "../service/recentSearch.service.type";

export default class RecentSearchController {
    private readonly _recentSearchService: RecentSearchService;

    constructor(
        _recentSearchService: RecentSearchService,
    ) {
        this._recentSearchService = _recentSearchService;

        this.postRecentSearch = this.postRecentSearch.bind(this);
        this.getRecentSearch = this.getRecentSearch.bind(this);
    }

    async postRecentSearch(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, searchTerm } = req.body;

            if (!userId || !searchTerm) {
                return res.status(400).json({ message: 'userId와 searchTerm이 필요합니다.' });
            }

            const recentSearch = await this._recentSearchService.postRecentSearch(userId, searchTerm);

            return res.status(201).json(recentSearch);
        } catch (error) {
            next(error);
        }
    }

    async getRecentSearch(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.query;

            if (!userId) {
                return res.status(400).json({ message: 'userId가 필요합니다.' });
            }

            const recentSearches = await this._recentSearchService.getRecentSearch(userId as string);

            if (!recentSearches || recentSearches.length === 0) {
                return res.status(404).json({ message: '최근 검색어가 없습니다.' });
            }

            return res.status(200).json(recentSearches);
        } catch (error) {
            next(error);
        }
    }
}