/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { HttpCodes } from '../../common/constants/httpCodes';
import HttpException from '../../exceptions/httpException';

export const errorMiddleware = (
  error: HttpException,
  _: Request,
  response: Response,
  __: NextFunction
): void => {
  const { status, message: errorMessage } = error;
  const [code, message] = errorMessage.split(' - ');
  response.status(status || HttpCodes.InternalServerError).send({
    code: Number(code) ?? 0,
    message: message ?? 'Internal server error',
  });
};
