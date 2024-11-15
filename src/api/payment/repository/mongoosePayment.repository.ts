import HttpException from '@/api/common/exceptions/http.exception';
import { mongoosePayment } from '../model/payment.schema';
import PaymentRepository from './payment.repository';

export default class MongoosePaymentRepository implements PaymentRepository {
  async save(payment: Omit<IPayment, 'id'>): Promise<IPayment> {
    const newPayment = new mongoosePayment(payment);
    await newPayment.save();
    return newPayment;
  }
  async findAll(): Promise<IPayment[]> {
    const payments = await mongoosePayment.find();
    return payments;
  }
  async findById(id: string): Promise<IPayment | null> {
    const payment = await mongoosePayment.findById(id);
    return payment;
  }
  async update(id: string, updateReservationInfo: Partial<IPayment>): Promise<IPayment> {
    const updatedPayment = await mongoosePayment.findByIdAndUpdate(id, updateReservationInfo, { new: true });
    if (!updatedPayment) {
      throw new HttpException(404, '결제 정보가 없습니다.');
    }
    return updatedPayment;
  }
  async delete(id: string): Promise<void> {
    if (!(await mongoosePayment.exists({ _id: id }))) {
      throw new HttpException(404, '결제 정보가 없습니다.');
    }
    await mongoosePayment.findByIdAndDelete(id);
  }
  async cancel(id: string): Promise<IPayment> {
    const payment = await mongoosePayment.findById(id);
    if (!payment) {
      throw new HttpException(404, '결제 정보가 없습니다.');
    }
    payment.status = 'CANCEL';
    await payment.save();
    return payment;
  }
}
