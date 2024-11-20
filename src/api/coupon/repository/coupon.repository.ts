import { Coupon } from '../model/coupon.model';

export interface CouponRepository {
  createCoupon(params: Omit<ICoupon, 'id'>): Promise<Coupon>;
  getsCoupon(): Promise<{ results: Coupon[] }>;
  getCoupon(cid: string): Promise<Coupon | null>;
  updateCoupon(cid: string, params: Omit<ICoupon, 'id'>): Promise<void>;
}
