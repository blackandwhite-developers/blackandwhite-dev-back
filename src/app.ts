import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from '@/api/common/middlewares/errorHandler.middleware';
import userRouter from './api/users/router/users.router';
import lodgeRouter from './api/lodge/router/lodge.router';
import adminLodgeRouter from './api/lodge/router/adminLodge.router';
import categoryRouter from './api/category/router/category.router';
import eventRouter from './api/event/router/event.router';
import { ROUTES_INDEX } from './api';
import reservationRouter from './api/reservation/router/reservation.router';
import adminReservationRouter from './api/reservation/router/adminReservation.router';
import paymentRouter from './api/payment/router/payment.router';
import roomRouter from './api/room/router/room.router';
import authRouter from './api/auth/router/auth.router';
import adminRoomRouter from './api/room/router/adminRoom.router';
import couponRouter from './api/coupon/router/coupon.router';
import searchRouter from './api/search/router/search.router';

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const whiteList = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4000',
  'https://2a52-1-243-69-22.ngrok-free.app',
];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (whiteList.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
  optionsSuccessStatus: 200,
  method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!');
  next();
});

/** ------- AUTH ------- */
app.use(ROUTES_INDEX.AUTH_API, authRouter);

/** ------- USER ------- */
app.use(ROUTES_INDEX.USERS_API, userRouter);
app.use(ROUTES_INDEX.ADMIN_USERS_API, userRouter);

/** ------- LODGE ------- */
app.use(ROUTES_INDEX.LODGES_API, lodgeRouter);
app.use(ROUTES_INDEX.ADMIN_LODGES_API, adminLodgeRouter);

/** ------- ROOMS ------- */
app.use(ROUTES_INDEX.ROOMS_API, roomRouter);
app.use(ROUTES_INDEX.ADMIN_ROOMS_API, adminRoomRouter);

/** ------- CATEGORY ------- */
app.use(ROUTES_INDEX.CATEGORY_API, categoryRouter);

/** ------- Reservation ------- */
app.use(ROUTES_INDEX.RESERVATION_API, reservationRouter);
app.use(ROUTES_INDEX.ADMIN_RESERVATION_API, adminReservationRouter);

/** ------- RESERVATION ------- */
app.use(ROUTES_INDEX.RESERVATION_API, reservationRouter);

/** ------- PAYMENT ------- */
app.use(ROUTES_INDEX.PAYMENT_API, paymentRouter);

/** ------- 이벤트 알림용 SSE 라우터 ------- */
app.use(ROUTES_INDEX.EVENT_API, eventRouter);

/** ------- Coupon ------- */
app.use(ROUTES_INDEX.COUPON_API, couponRouter);

/** ------- Search ------- */

app.use(ROUTES_INDEX.SEARCH_API, searchRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`SERVER started at http://localhost:${port} ^-^`);
});
