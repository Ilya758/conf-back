import { HttpCodes } from '../../common/constants/httpCodes';
import HttpException from '../../exceptions/httpException';

export const createUserHttpException = (message: string): HttpException =>
  new HttpException(HttpCodes.BadRequest, message);
