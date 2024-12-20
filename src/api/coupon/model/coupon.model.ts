export class Coupon implements ICoupon {
  id: string;
  title: string;
  discount: number;
  exp?: Date;
  constructor(params: ICoupon) {
    this.id = params.id;
    this.title = params.title;
    this.discount = params.discount;
  }
}
