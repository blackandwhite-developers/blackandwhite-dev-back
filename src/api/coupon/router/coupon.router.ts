import { extractPath } from '@/utils/path.util';
import express from 'express';
import { ROUTES_INDEX } from '../../index';
import CouponController from '../controller/coupon.controller';
import { CouponServiceImpl } from '../service/coupon.service';
import { MongooseCouponRepository } from '../repository/mongooseCoupon.repository';

const couponRouter = express.Router();

const ROUTES_COUPON = {
  CREATE_COUPON: '/api/coupon',
  GETS_COUPON: '/api/coupon',
  GET_COUPON: '/api/coupon/:cid',
  UPDATE_COUPON: '/api/coupon/:cid',
};

const couponController = new CouponController(new CouponServiceImpl(new MongooseCouponRepository()));

couponRouter.post(extractPath(ROUTES_COUPON.CREATE_COUPON, ROUTES_INDEX.COUPON_API), couponController.createCoupon);
couponRouter.get(extractPath(ROUTES_COUPON.GETS_COUPON, ROUTES_INDEX.COUPON_API), couponController.getsCoupon);
couponRouter.get(extractPath(ROUTES_COUPON.GET_COUPON, ROUTES_INDEX.COUPON_API), couponController.getCoupon);
couponRouter.put(extractPath(ROUTES_COUPON.UPDATE_COUPON, ROUTES_INDEX.COUPON_API), couponController.updateCoupon);

export default couponRouter;
