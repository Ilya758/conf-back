/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { HttpCodes } from '../common/constants/httpCodes';
import HttpException from '../exceptions/httpException';

export const errorMiddleware = (
  error: HttpException,
  _: Request,
  response: Response,
  __: NextFunction
): void => {
  const { status, code } = error;
  const message = error.message || 'Something went wrong';
  response.status(status || HttpCodes.InternalServerError).send({
    code,
    message,
  });
};
