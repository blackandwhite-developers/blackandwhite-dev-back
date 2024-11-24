export default interface OrderRepository {
  getOrders(): Promise<IOrder[]>;
  getOrdersByUserId(userId: string): Promise<IOrder[]>;
  getOrder(id: string, userId: string): Promise<IOrder>;
  createOrder(order: Omit<IOrder, 'id'>): Promise<IOrder>;
  updateOrder(id: string, userId: string, status: string): Promise<void>;
  deleteOrder(id: string, userId: string): Promise<void>;
}
