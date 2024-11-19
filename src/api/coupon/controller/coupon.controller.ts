import { Request, Response, NextFunction } from 'express';
import { CouponService } from '../service/coupon.service.type';

export default class CouponController {
  constructor(private _couponService: CouponService) {
    this.createCoupon = this.createCoupon.bind(this);
    this.getsCoupon = this.getsCoupon.bind(this);
    this.getCoupon = this.getCoupon.bind(this);
    this.updateCoupon = this.updateCoupon.bind(this);
  }
  async createCoupon(req: Request, res: Response, next: NextFunction) {
    const { title, discount } = req.body;
    try {
      const createCoupon = await this._couponService.createCoupon({
        title,
        discount,
      });
      res.send(createCoupon);
    } catch (err) {
      next(err);
    }
  }
  async getsCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      const coupons = await this._couponService.getsCoupon();
      res.send(coupons);
    } catch (err) {
      next(err);
    }
  }
  async getCoupon(req: Request, res: Response, next: NextFunction) {
    const { cid } = req.params;
    try {
      const coupon = await this._couponService.getCoupon(cid);
      res.send(coupon);
    } catch (err) {
      next(err);
    }
  }
  async updateCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, discount } = req.body;
      const { cid } = req.params;
      await this._couponService.updateCoupon(cid, {
        title,
        discount,
      });
    } catch (err) {
      next(err);
    }
  }
}
