import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpCodes } from '../../common/constants/httpCodes';
import { TErrorConstraints } from '../../common/models/types/TErrorConstraints';
import HttpException from '../../exceptions/httpException';
import { createUserHttpException } from '../../utils/createHttpExceptions';

export const validationMiddleware =
  (
    type: ClassConstructor<object>,
    errorCode: number,
    skipMissingProperties = false
  ): RequestHandler =>
  async (req, _, next) => {
    try {
      const errors = await validate(plainToInstance(type, req.body), {
        skipMissingProperties,
      });

      if (errors.length) {
        const message = errors
          .map((error: ValidationError) =>
            Object.values(<TErrorConstraints>error.constraints).join(', ')
          )
          .join(', ');

        next(createUserHttpException(errorCode, message));
      } else {
        next();
      }
    } catch (error) {
      next(new HttpException(HttpCodes.InternalServerError, ''));
    }
  };
