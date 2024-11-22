import { NextFunction, Request, Response } from 'express';
import HttpException from '@/api/common/exceptions/http.exception';

function errorHandler(
  err: Error & { statusCode?: number },
  _: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  if (err.statusCode == 401) {
    return res.status(err.statusCode).send({
      message: 'Unauthorized',
      details: err.message,
      refreshToken: _.cookies.refreshToken,
    });
  }

  if (err instanceof HttpException) {
    return res.status(err.statusCode).send({
      message: 'client Error',
      details: err.message,
      code: err.cause,
    });
  }

  if (err instanceof Error) {
    res.status(500).send({
      message: 'Internal Server Error',
      details: err.message,
    });
  }

  next();
}

export default errorHandler;
