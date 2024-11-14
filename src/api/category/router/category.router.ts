import express from 'express';
import { extractPath } from '@/utils/path.util';
import { ROUTES_INDEX } from '@/api';
import CategoryController from '../controller/category.controller';
import { MongooseCategoryRepository } from '../repository/mongooseCategory.repository';
import { CategoryServiceImpl } from '../service/category.service';

const categoryRouter = express.Router();

const CATEGORY_ROUTES = {
  /** 카테고리 생성 */
  CREATE_CATEGORY: `/api/category`,
  /** 카테고리 상세조회 */
  GETS_CATEGORY: `/api/category`,
  /** 카테고리 상세조회 */
  GET_CATEGORY: `/api/category/:cid`,
  /** 카테고리 수정 */
  UPDATE_CATEGORY: `/api/category/:cid`,
  /** 카테고리 삭제 */
  DELETE_CATEGORY: `/api/category`,
};
const categoryController = new CategoryController(new CategoryServiceImpl(new MongooseCategoryRepository()));

categoryRouter.post(
  extractPath(CATEGORY_ROUTES.CREATE_CATEGORY, ROUTES_INDEX.CATEGORY_API),
  categoryController.createCategory,
);
categoryRouter.get(
  extractPath(CATEGORY_ROUTES.GETS_CATEGORY, ROUTES_INDEX.CATEGORY_API),
  categoryController.getsCategory,
);
categoryRouter.get(
  extractPath(CATEGORY_ROUTES.GET_CATEGORY, ROUTES_INDEX.CATEGORY_API),
  categoryController.getCategory,
);
categoryRouter.put(
  extractPath(CATEGORY_ROUTES.UPDATE_CATEGORY, ROUTES_INDEX.CATEGORY_API),
  categoryController.updateCategory,
);
categoryRouter.delete(
  extractPath(CATEGORY_ROUTES.DELETE_CATEGORY, ROUTES_INDEX.CATEGORY_API),
  categoryController.deleteCategory,
);

export default categoryRouter;
