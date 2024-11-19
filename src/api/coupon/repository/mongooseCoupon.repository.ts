import { CouponRepository } from './coupon.repository';
import { mongooseCoupon } from '../model/coupon.schema';
import { Coupon } from '../model/coupon.model';
import HttpException from '@/api/common/exceptions/http.exception';

export class MongooseCouponRepository implements CouponRepository {
  async createCoupon(params: Omit<ICoupon, 'id'>): Promise<Coupon> {
    const newCoupon = new mongooseCoupon(params);
    const coupon = await newCoupon.save();
    return coupon;
  }
  async getsCoupon(): Promise<{ results: Coupon[] }> {
    const results = await mongooseCoupon.find();
    return { results };
  }
  async getCoupon(cid: string): Promise<Coupon | null> {
    const result = await mongooseCoupon.findById(cid);
    return result || null;
  }

  async updateCoupon(cid: string, params: Omit<ICoupon, 'id'>): Promise<void> {
    const result = await mongooseCoupon.findById(cid);
    if (result) {
      await mongooseCoupon.findByIdAndUpdate(cid, {
        ...params,
      });
    } else {
      throw new HttpException(404, { message: '쿠폰을 찾을 수 없습니다.' });
    }
    return;
  }
}
