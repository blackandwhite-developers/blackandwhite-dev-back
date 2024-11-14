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
app.use('/api/users', userRouter);

/** ------- LODGE ------- */
app.use('/api/lodges', lodgeRouter);
app.use('/admin-api/lodges', adminLodgeRouter);

/** ------- CATEGORY ------- */

app.use(ROUTES_INDEX.CATEGORY_API, categoryRouter);

/** ------- Reservation ------- */
app.use(ROUTES_INDEX.RESERVATION_API, reservationRouter);
app.use(ROUTES_INDEX.ADMIN_RESERVATION_API, adminReservationRouter);

/** ------- RESERVATION ------- */
app.use('/api/reservation', reservationRouter);

/** ------- 이벤트 알림용 SSE 라우터 ------- */
app.use('/api/event', eventRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`SERVER started at http://localhost:${port} ^-^`);
});
