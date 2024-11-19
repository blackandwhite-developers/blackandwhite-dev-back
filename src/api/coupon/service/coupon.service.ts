import { Coupon } from '../model/coupon.model';
import { CouponRepository } from '../repository/coupon.repository';
import { CouponService } from './coupon.service.type';

import HttpException from '@/api/common/exceptions/http.exception';

export class CouponServiceImpl implements CouponService {
  constructor(private readonly _couponRepository: CouponRepository) {}
  async createCoupon(params: Omit<ICoupon, 'id'>): Promise<ICoupon> {
    if (!params) throw new HttpException(400, '해당 요청을 처리 할 수 없습니다.');
    const coupon = await this._couponRepository.createCoupon(params);
    return coupon;
  }
  async getsCoupon(): Promise<{ results: Coupon[] }> {
    const coupons = await this._couponRepository.getsCoupon();
    return coupons;
  }
  async getCoupon(cid: string): Promise<Coupon | null> {
    const coupon = await this._couponRepository.getCoupon(cid);
    if (!coupon) {
      throw new HttpException(404, '해당 쿠폰을 찾을 수 없습니다.');
    }
    return coupon;
  }
  async updateCoupon(cid: string, params: Omit<ICoupon, 'id'>): Promise<void> {
    const coupon = await this._couponRepository.getCoupon(cid);
    if (!coupon) {
      throw new HttpException(404, '해당 쿠폰을 찾을 수 없습니다.');
    }
    await this._couponRepository.updateCoupon(cid, {
      ...params,
    });
    return;
  }
}
