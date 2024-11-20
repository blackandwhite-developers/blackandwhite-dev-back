import express from 'express';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import LodgeController from '@/api/lodge/controller/lodge.controller';
import LodgeServiceImpl from '../service/lodge.service';
import MongooseLodgeRepository from '../repository/mongooseLodge.repository';

const lodgeRouter = express.Router();

const LODGE_ROUTES = {
  /** 숙소 조회 */
  GET_LODGE: `/api/lodges/:id`,
} as const;
const lodgeController = new LodgeController(
  new LodgeServiceImpl(new MongooseLodgeRepository()),
);

lodgeRouter.get(extractPath(LODGE_ROUTES.GET_LODGE, ROUTES_INDEX.LODGES_API), lodgeController.getLodge);

export default lodgeRouter;
