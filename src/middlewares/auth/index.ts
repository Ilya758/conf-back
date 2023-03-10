import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IStoredToken } from '../../common/models/interfaces/IStoredToken';
import config from '../../config';
import { AuthErrorCodes } from '../../controllers/auth/codes';
import { AuthErrorMessages } from '../../controllers/auth/codes/errorMessages';
import { ModelService } from '../../models/ModelService';
import { createUserHttpException } from '../../utils/createHttpExceptions';

const { jwtSecret } = config;
const errorCodesMap = {
  [AuthErrorCodes.AuthenticationTokenIsMissing]:
    AuthErrorMessages.AuthenticationTokenIsMissing,
  [AuthErrorCodes.WrongAuthenticationToken]:
    AuthErrorMessages.WrongAuthenticationToken,
};

export const authMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const generateWrongAuthTokenException = (): void => {
    next(
      createUserHttpException(
        AuthErrorCodes.WrongAuthenticationToken,
        errorCodesMap
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
        errorCodesMap
      )
    );
  }
};
