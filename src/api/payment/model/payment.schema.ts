import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema<IPayment>({
  method: { type: String, required: true, enum: ['CARD', 'BANK_TRANSFER', 'KAKAO_PAY'] },
  nominalAmount: { type: Number, required: true },
  discountAmount: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true, enum: ['PENDING', 'SUCCESS', 'FAILURE'] },
  createdAt: { type: Date, required: true },
  completedAt: { type: Date },
  reservationId: { type: String, required: true },
  userId: { type: String, required: true },
});

export const mongoosePayment = mongoose.model<IPayment>('payment', paymentSchema);
