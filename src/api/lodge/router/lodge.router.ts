import express from 'express';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import LodgeController from '@/api/lodge/controller/lodge.controller';
import LodgeServiceImpl from '../service/lodge.service';
import MongooseLodgeRepository from '../repository/mongooseLodge.repository';
import { MongooseCategoryRepository } from '@/api/category/repository/mongooseCategory.repository';

const lodgeRouter = express.Router();

const LODGE_ROUTES = {
  /** 카테고리별 숙소 조회 */
  GET_LODGES: `/api/lodges`,
  /** 숙소 상세 조회 */
  GET_LODGE: `/api/lodges/:id`,
} as const;

const lodgeController = new LodgeController(
  new LodgeServiceImpl(new MongooseLodgeRepository(), new MongooseCategoryRepository()),
);
lodgeRouter.get(extractPath(LODGE_ROUTES.GET_LODGES, ROUTES_INDEX.LODGES_API), lodgeController.getLodges);

lodgeRouter.get(extractPath(LODGE_ROUTES.GET_LODGE, ROUTES_INDEX.LODGES_API), lodgeController.getLodge);

export default lodgeRouter;
