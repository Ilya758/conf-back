import { HttpCodes } from '../../common/constants/httpCodes';
import HttpException from '../../exceptions/httpException';

export const createServerHttpException = (): HttpException =>
  new HttpException(HttpCodes.InternalServerError, 'Internal server error');
