import express from 'express';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import RecentSearchController from '../controller/recentSearch.controller';
import RecentSearchServiceImpl from '../service/recentSearch.service';
import { MongooseRecentSearchRepository } from '../repository/mongooseRecentSearch.repository';

const recentSearchRouter = express.Router();

const recentSearchController = new RecentSearchController(
    new RecentSearchServiceImpl(
        new MongooseRecentSearchRepository()
    )
);

const RECENT_SEARCH_ROUTES = {
    /** 검색어 추가 */
    POST_RECENT_SEARCH: `/api/recent-search`,
    /** 최근 검색어 리스트 조회 */
    GET_RECENT_SEARCH: `/api/recent-search`,
} as const;

recentSearchRouter.post(
    extractPath(RECENT_SEARCH_ROUTES.POST_RECENT_SEARCH, ROUTES_INDEX.RECENT_SEARCH_API),
    recentSearchController.postRecentSearch,
);

recentSearchRouter.get(
    extractPath(RECENT_SEARCH_ROUTES.GET_RECENT_SEARCH, ROUTES_INDEX.RECENT_SEARCH_API),
    recentSearchController.getRecentSearch,
);

