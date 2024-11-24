import { ReservationRepository } from '@/api/reservation/repository/reservation.repository';
import OrderRepository from '../repository/order.repository';
import OrderService from './order.service.type';
import PaymentRepository from '@/api/payment/repository/payment.repository';
import { UserRepository } from '@/api/users/respository/user/user.repository';
import HttpException from '@/api/common/exceptions/http.exception';

export default class OrderServiceImpl implements OrderService {
  private readonly _orderRepository: OrderRepository;
  private readonly _reservationRepository: ReservationRepository;
  private readonly _paymentRepository: PaymentRepository;
  private readonly _userRepository: UserRepository;
  constructor(
    orderRepository: OrderRepository,
    reservationRepository: ReservationRepository,
    paymentRepository: PaymentRepository,
    userRepository: UserRepository,
  ) {
    this._orderRepository = orderRepository;
    this._reservationRepository = reservationRepository;
    this._paymentRepository = paymentRepository;
    this._userRepository = userRepository;
  }
  async getOrders(): Promise<IOrder[]> {
    const orders = await this._orderRepository.getOrders();
    return orders;
  }
  async getOrdersByUserId(userId: string): Promise<IOrder[]> {
    const orders = await this._orderRepository.getOrdersByUserId(userId);
    return orders;
  }
  async getOrder(id: string, userId: string): Promise<IOrder> {
    const order = await this._orderRepository.getOrder(id, userId);
    return order;
  }
  async createOrder(userId: string, reservationId: string, paymentId: string): Promise<IOrder> {
    const reservation = await this._reservationRepository.findById(reservationId);
    const payment = await this._paymentRepository.findById(paymentId);
    const user = await this._userRepository.findById(userId);
    if (!reservation) {
      throw new HttpException(404, '예약을 찾을 수 없습니다.');
    }
    if (!payment) {
      throw new HttpException(404, '결제를 찾을 수 없습니다.');
    }
    if (!user) {
      throw new HttpException(404, '사용자를 찾을 수 없습니다.');
    }

    const order = await this._orderRepository.createOrder({
      reservation,
      payment,
      user,
      status: 'pending',
    });
    return order;
  }
  async updateOrder(id: string, userId: string, status: string): Promise<void> {
    await this._orderRepository.updateOrder(id, userId, status);
  }
  async deleteOrder(id: string, userId: string): Promise<void> {
    await this._orderRepository.deleteOrder(id, userId);
  }
}
