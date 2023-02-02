/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpCodes } from '../common/constants/httpCodes';
import { TErrorConstraints } from '../common/models/types';
import { AuthErrorCodes } from '../controllers/auth/codes';
import HttpException from '../exceptions/httpException';

export const validationMiddleware =
  (
    type: ClassConstructor<object>,
    skipMissingProperties = false
  ): RequestHandler =>
  async (req, _, next) => {
    try {
      const errors = await validate(plainToInstance(type, req.body), {
        skipMissingProperties,
      });

      if (errors.length) {
        console.log(errors);
        const message = errors
          .map((error: ValidationError) =>
            Object.values(<TErrorConstraints>error.constraints).join(', ')
          )
          .join(', ');

        next(
          new HttpException(
            HttpCodes.BadRequest,
            AuthErrorCodes.UserSignupValidationFailed,
            message
          )
        );
      } else {
        next();
      }
    } catch (error) {
      next(new HttpException(HttpCodes.InternalServerError, 0, ''));
    }
  };
