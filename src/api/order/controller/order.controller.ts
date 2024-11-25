import { Request, Response, NextFunction } from 'express';
import OrderService from '../service/order.service.type';

export default class OrderController {
  private readonly _orderService: OrderService;
  constructor(_orderService: OrderService) {
    this._orderService = _orderService;
    this.getOrders = this.getOrders.bind(this);
    this.getOrdersByUserId = this.getOrdersByUserId.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await this._orderService.getOrders();
      res.send(orders);
    } catch (err) {
      next(err);
    }
  }

  async getOrdersByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const orders = await this._orderService.getOrdersByUserId(userId);
      res.send(orders);
    } catch (err) {
      next(err);
    }
  }

  async getOrder(req: Request, res: Response, next: NextFunction) {
    const { oid } = req.params;
    const { userId } = req.user;
    try {
      const order = await this._orderService.getOrder(oid, userId);
      res.send(order);
    } catch (err) {
      next(err);
    }
  }

  async createOrder(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.user;
    const { reservationId, paymentId } = req.body;
    try {
      const createOrder = await this._orderService.createOrder(userId, reservationId, paymentId);
      res.send(createOrder);
    } catch (err) {
      next(err);
    }
  }

  async updateOrder(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.user;
    const { oid } = req.params;
    const { status } = req.body;
    try {
      await this._orderService.updateOrder(oid, userId, status);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.user;
    const { oid } = req.params;
    try {
      await this._orderService.deleteOrder(oid, userId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
