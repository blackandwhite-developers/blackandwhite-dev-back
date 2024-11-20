import { Coupon } from '../model/coupon.model';

export interface CouponService {
  createCoupon(params: Omit<ICoupon, 'id'>): Promise<ICoupon>;
  getsCoupon(): Promise<{ results: Coupon[] }>;
  getCoupon(cid: string): Promise<Coupon | null>;
  updateCoupon(cid: string, params: Omit<ICoupon, 'id'>): Promise<void>;
}
