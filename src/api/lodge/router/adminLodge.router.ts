import { ROUTES_INDEX } from '@/api';
import { extractPath } from '@/utils/path.util';
import express from 'express';
import AdminLodgeController from '../controller/adminLodge.controller';
import LodgeServiceImpl from '../service/lodge.service';
import MongooseLodgeRepository from '../repository/mongooseLodge.repository';

const adminLodgeRouter = express.Router();

const ADMIN_LODGE_ROUTES = {
  /** 카테고리별 숙소 조회 */
  GET_LODGES: `/admin-api/lodges`,
  /** 숙소 상세 조회 */
  GET_LODGE: `/admin-api/lodges/:id`,
  /** 숙소 등록 */
  POST_LODGE: `/admin-api/lodges`,
  /** 숙소 수정 */
  PUT_LODGE: `/admin-api/lodges/:id`,
  /** 숙소 삭제 */
  DELETE_LODGE: `/admin-api/lodges/:id`,
} as const;

const adminLodgeController = new AdminLodgeController(
  new LodgeServiceImpl(
    new MongooseLodgeRepository()
  )
);

adminLodgeRouter.get(
  extractPath(ADMIN_LODGE_ROUTES.GET_LODGES, ROUTES_INDEX.ADMIN_LODGES_API),
  adminLodgeController.getLodges,
);

adminLodgeRouter.get(
  extractPath(ADMIN_LODGE_ROUTES.GET_LODGE, ROUTES_INDEX.ADMIN_LODGES_API),
  adminLodgeController.getLodge,
);

adminLodgeRouter.post(
  extractPath(ADMIN_LODGE_ROUTES.POST_LODGE, ROUTES_INDEX.ADMIN_LODGES_API),
  adminLodgeController.createLodge,
);

adminLodgeRouter.put(
  extractPath(ADMIN_LODGE_ROUTES.PUT_LODGE, ROUTES_INDEX.ADMIN_LODGES_API),
  adminLodgeController.updateLodge,
);

adminLodgeRouter.delete(
  extractPath(ADMIN_LODGE_ROUTES.DELETE_LODGE, ROUTES_INDEX.ADMIN_LODGES_API),
  adminLodgeController.deleteLodge,
);

export default adminLodgeRouter;