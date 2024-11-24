import { ROUTES_INDEX } from '@/api';
import { authUserMiddleware } from '@/api/common/middlewares/authUser.middleware';
import { extractPath } from '@/utils/path.util';
import express from 'express';
import OrderController from '../controller/order.controller';
import OrderServiceImpl from '../service/order.service';
import MongoosePaymentRepository from '@/api/payment/repository/mongoosePayment.repository';
import { MongooseReservationRepository } from '@/api/reservation/repository/mongooseReservation.repository';
import { MongooseUserRepository } from '@/api/users/respository/user/mongooseUser.reopsitory';
import MongooseOrderRepository from '../repository/mongooseOrder.repository';

const router = express.Router();

const ORDER_ROUTES = {
  GET_ORDERS: '/api/orders',
  GET_ORDER: '/api/orders/:id',
  GET_ORDERS_BY_USER_ID: '/api/orders/user/:id',
  CREATE_ORDER: '/api/orders',
  UPDATE_ORDER: '/api/orders/:id',
  DELETE_ORDER: '/api/orders/:id',
} as const;

const orderController = new OrderController(
  new OrderServiceImpl(
    new MongooseOrderRepository(),
    new MongooseReservationRepository(),
    new MongoosePaymentRepository(),
    new MongooseUserRepository(),
  ),
);

router.get(
  extractPath(ORDER_ROUTES.GET_ORDERS_BY_USER_ID, ROUTES_INDEX.ORDER_API),
  authUserMiddleware,
  orderController.getOrdersByUserId,
);

router.get(extractPath(ORDER_ROUTES.GET_ORDER, ROUTES_INDEX.ORDER_API), authUserMiddleware, orderController.getOrder);

router.get(extractPath(ORDER_ROUTES.GET_ORDERS, ROUTES_INDEX.ORDER_API), authUserMiddleware, orderController.getOrders);

router.post(
  extractPath(ORDER_ROUTES.CREATE_ORDER, ROUTES_INDEX.ORDER_API),
  authUserMiddleware,
  orderController.createOrder,
);

router.put(
  extractPath(ORDER_ROUTES.UPDATE_ORDER, ROUTES_INDEX.ORDER_API),
  authUserMiddleware,
  orderController.updateOrder,
);

router.delete(
  extractPath(ORDER_ROUTES.DELETE_ORDER, ROUTES_INDEX.ORDER_API),
  authUserMiddleware,
  orderController.deleteOrder,
);
