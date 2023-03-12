import { RequestHandler } from 'express';
import {
  CommonErrorCodes,
  commonErrorCodesMap,
} from '../../controllers/auth/codes';
import { createUserHttpException } from '../../utils/createHttpExceptions';

// eslint-disable-next-line @typescript-eslint/require-await
export const validatePrimaryKey: RequestHandler = async (req, _, next) => {
  if (Number.isInteger(Number(req.params.id))) {
    next();
  } else {
    next(
      createUserHttpException(
        CommonErrorCodes.PrimaryKeyValidationFailed,
        commonErrorCodesMap
      )
    );
  }
};
