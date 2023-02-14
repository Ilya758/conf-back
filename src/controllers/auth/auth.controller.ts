import { RequestHandler, Router } from 'express';
import { Sequelize } from 'sequelize';
import { AuthPath } from '../../common/constants/controllerPath';
import Controller from '../../common/models/abstract/Controller';
import { IRequest } from '../../common/models/interfaces';
import { validationMiddleware } from '../../middlewares/index';
import AuthService from './auth.service';
import UserDto from './DTO/UserDto';

export class AuthController implements Controller {
  public path = AuthPath.SignUp;

  public authService = new AuthService();

  public router = Router();

  public sqlzInstance: Sequelize;

  constructor(sqlzInstance: Sequelize) {
    this.sqlzInstance = sqlzInstance;
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router
      .post(AuthPath.SignUp, validationMiddleware(UserDto), this.signup)
      .post(AuthPath.SignIn, validationMiddleware(UserDto), this.signin);
  };

  private signup: RequestHandler = async (
    req: IRequest<UserDto>,
    res,
    next
  ): Promise<void> => {
    try {
      res.send(await this.authService.signup(this.sqlzInstance, req.body));
    } catch (error) {
      next(error);
    }
  };

  private signin: RequestHandler = async (
    req: IRequest<UserDto>,
    res,
    next
  ) => {
    try {
      res.send(await this.authService.signin(this.sqlzInstance, req.body));
    } catch (error) {
      next(error);
    }
  };
}
