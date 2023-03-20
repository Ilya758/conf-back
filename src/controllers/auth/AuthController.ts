import { RequestHandler, Router } from 'express';
import { AuthPath } from '../../common/constants/controllerPath';
import { IController, IRequest } from '../../common/models/interfaces';
import { validationMiddleware } from '../../middlewares/index';
import AuthService from './AuthService';
import { AuthErrorCodes } from '../../common/codes';
import UserDto from './DTO/UserDto';

export class AuthController implements IController {
  public authService = new AuthService();

  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router
      .post(
        AuthPath.SignUp,
        validationMiddleware(UserDto, AuthErrorCodes.InvalidUserCredentials),
        this.signup
      )
      .post(
        AuthPath.SignIn,
        validationMiddleware(UserDto, AuthErrorCodes.InvalidUserCredentials),
        this.signin
      );
  };

  private signup: RequestHandler = async (
    req: IRequest<UserDto>,
    res,
    next
  ): Promise<void> => {
    try {
      res.send(await this.authService.signup(req.body));
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
      res.send(await this.authService.signin(req.body));
    } catch (error) {
      next(error);
    }
  };
}
