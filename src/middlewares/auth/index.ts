import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IStoredToken } from '../../common/models/interfaces/IStoredToken';
import config from '../../config';
import {
  AuthErrorCodes,
  authErrorCodesMap,
} from '../../controllers/auth/codes';
import { ModelService } from '../../models/ModelService';
import { createUserHttpException } from '../../utils/createHttpExceptions';

const { jwtSecret } = config;

export const authMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const generateWrongAuthTokenException = (): void => {
    next(
      createUserHttpException(
        AuthErrorCodes.WrongAuthenticationToken,
        authErrorCodesMap
      )
    );
  };

  if (req.headers.authorization) {
    const [, storedToken] = req.headers.authorization.split(' ');
    try {
      const { id } = <IStoredToken>jwt.verify(storedToken, jwtSecret);
      const { userModel } = ModelService.modelDefinitions;
      const user = await userModel.findOne({
        where: { id },
      });

      if (user) {
        next();
      } else {
        generateWrongAuthTokenException();
      }
    } catch (error) {
      next(generateWrongAuthTokenException());
    }
  } else {
    next(
      createUserHttpException(
        AuthErrorCodes.AuthenticationTokenIsMissing,
        authErrorCodesMap
      )
    );
  }
};
