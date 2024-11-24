import HttpException from '@/api/common/exceptions/http.exception';
import { MongooseOrder } from '../model/order.schema';
import OrderRepository from './order.repository';

export default class MongooseOrderRepository implements OrderRepository {
  async getOrders(): Promise<IOrder[]> {
    const orders = await MongooseOrder.find();
    return orders;
  }
  async getOrder(id: string, userId: string): Promise<IOrder> {
    const order = await MongooseOrder.findById(id).populate('user');
    if (!order) {
      throw new HttpException(404, '주문을 찾을 수 없습니다.');
    }
    if (order.user.id !== userId) {
      throw new HttpException(400, '해당하는 사용자가 아닙니다.');
    }
    return order;
  }
  async getOrdersByUserId(userId: string): Promise<IOrder[]> {
    const orders = await MongooseOrder.find().populate({
      path: 'user',
      match: { id: userId },
    });
    return orders;
  }
  async createOrder(order: Omit<IOrder, 'id'>): Promise<IOrder> {
    const newOrder = new MongooseOrder(order);
    await newOrder.save();
    return newOrder;
  }
  async updateOrder(id: string, userId: string, status: string): Promise<void> {
    const order = await MongooseOrder.findById(id);
    if (!order) {
      throw new HttpException(404, '주문을 찾을 수 없습니다.');
    }
    if (order.user.id !== userId) {
      throw new HttpException(400, '해당하는 사용자가 아닙니다.');
    }
    await MongooseOrder.findByIdAndUpdate(id, {
      status,
    });
  }
  async deleteOrder(id: string): Promise<void> {
    if (!MongooseOrder.findById(id)) {
      throw new HttpException(404, '주문을 찾을 수 없습니다.');
    }
    await MongooseOrder.findByIdAndDelete(id);
  }
}
