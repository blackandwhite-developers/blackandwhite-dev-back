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
import reservationRouter from './api/reservation/router/reservation.router';
import { ROUTES_INDEX } from './api';
import paymentRouter from './api/payment/router/payment.router';
import roomRouter from './api/room/router/room.router';

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const whiteList = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:4000'];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (whiteList.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!');
  next();
});

/** ------- USER ------- */
app.use(ROUTES_INDEX.USERS_API, userRouter);
app.use(ROUTES_INDEX.ADMIN_USERS_API, userRouter);

/** ------- LODGE ------- */
app.use(ROUTES_INDEX.LODGES_API, lodgeRouter);
app.use(ROUTES_INDEX.ADMIN_LODGES_API, adminLodgeRouter);

/** ------- ROOMS ------- */
app.use(ROUTES_INDEX.ROOMS_API, roomRouter);
app.use(ROUTES_INDEX.ADMIN_ROOMS_API, roomRouter);

/** ------- CATEGORY ------- */
app.use(ROUTES_INDEX.CATEGORY_API, categoryRouter);

/** ------- RESERVATION ------- */
app.use(ROUTES_INDEX.RESERVATION_API, reservationRouter);

/** ------- PAYMENT ------- */
app.use(ROUTES_INDEX.PAYMENT_API, paymentRouter);

/** ------- 이벤트 알림용 SSE 라우터 ------- */
app.use(ROUTES_INDEX.EVENT_API, eventRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`SERVER started at http://localhost:${port} ^-^`);
});
