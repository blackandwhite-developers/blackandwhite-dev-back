export default interface OrderService {
  getOrders(): Promise<IOrder[]>;
  getOrdersByUserId(userId: string): Promise<IOrder[]>;
  getOrder(id: string, userId: string): Promise<IOrder>;
  createOrder(userId: string, reservationId: string, paymentId: string): Promise<IOrder>;
  updateOrder(id: string, userId: string, status: string): Promise<void>;
  deleteOrder(id: string, userId: string): Promise<void>;
}
