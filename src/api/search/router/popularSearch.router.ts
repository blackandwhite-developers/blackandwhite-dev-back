import express from 'express';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import PopularSearchControlller from '../controller/popularSearch.controller';
import { PopularSearchServiceImpl } from '../service/popularSearch.service';
import { MongoosePopularSearchRepository } from '../repository/mongoosePopularSearch.repository'; 

const popularSearchRouter = express.Router();

const popularSearchControlller = new PopularSearchControlller(
    new PopularSearchServiceImpl(
        new MongoosePopularSearchRepository()
    )
);

const POPULAR_SEARCH_ROUTES = {
    /** 인기 검색어 저장 */
    POST_POPULAR_SEARCH: `/api/popular-search`,
    /** 인기 검색어 최근 목록 */
    GET_POPULAR_SEARCH: `/api/popular-search`,
} as const;

popularSearchRouter.post(
    extractPath(POPULAR_SEARCH_ROUTES.POST_POPULAR_SEARCH, ROUTES_INDEX.POPULAR_SEARCH_API),
    popularSearchControlller.postPopularSearch,
);

popularSearchRouter.get(
    extractPath(POPULAR_SEARCH_ROUTES.GET_POPULAR_SEARCH, ROUTES_INDEX.POPULAR_SEARCH_API),
    popularSearchControlller.getPopularSearch,
);