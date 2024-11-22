import express from 'express';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import SearchController from '../controller/search.controller';
import { SearchServiceImpl } from '../service/search.service';
import MongooseLodgeRepository from '@/api/lodge/repository/mongooseLodge.repository';
import MongooseSearchKeywordsRepository from '../repository/mongooseSearchKeywords.repository';

const searchRouter = express.Router();

const SEARCH_ROUTES = {
  /** 검색 API */
  SEARCH_API: `/api/search`,
  /** 인기검색어 출력 */
  POPULAR_API: `/api/search/popular`,
} as const;

const searchController = new SearchController(
  new SearchServiceImpl(new MongooseLodgeRepository(), new MongooseSearchKeywordsRepository()),
);

searchRouter.get(extractPath(SEARCH_ROUTES.POPULAR_API, ROUTES_INDEX.SEARCH_API), searchController.popularSearch);

searchRouter.get(extractPath(SEARCH_ROUTES.SEARCH_API, ROUTES_INDEX.SEARCH_API), searchController.search);

export default searchRouter;
