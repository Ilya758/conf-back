import { HttpCodes } from '../../common/constants/httpCodes';
import HttpException from '../../exceptions/httpException';
import { createErrorMessage } from '../createErrorMessage';

export const createUserHttpException = (
  code: number,
  errorCodesMapOrMessage: Record<number, string> | string
): HttpException =>
  new HttpException(
    HttpCodes.BadRequest,
    createErrorMessage(code, errorCodesMapOrMessage)
  );
