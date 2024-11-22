import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema<ICoupon>({
  title: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  exp: {
    type: Date,
  },
});

export const mongooseCoupon = mongoose.model<ICoupon>('coupon', couponSchema);
