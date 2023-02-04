import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpCodes } from '../../common/constants/httpCodes';
import { TErrorConstraints } from '../../common/models/types/TErrorConstraints';
import { AuthErrorCodes } from '../../controllers/auth/codes';
import HttpException from '../../exceptions/httpException';
import { createErrorMessage } from '../../utils/createErrorMessage';
import { createUserHttpException } from '../../utils/createHttpExceptions';

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
        const message = errors
          .map((error: ValidationError) =>
            Object.values(<TErrorConstraints>error.constraints).join(', ')
          )
          .join(', ');

        next(
          createUserHttpException(
            createErrorMessage(
              AuthErrorCodes.UserSingupDtoValidationFailed,
              message
            )
          )
        );
      } else {
        next();
      }
    } catch (error) {
      next(new HttpException(HttpCodes.InternalServerError, ''));
    }
  };