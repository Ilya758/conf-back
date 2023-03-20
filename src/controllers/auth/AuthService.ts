import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUserHttpException } from '../../utils/createHttpExceptions';
import { AuthErrorCodes, authErrorCodesMap } from '../../common/codes';
import { UserDto } from './DTO';
import * as config from '../../config';
import { ITokenData } from '../../common/models/interfaces';
import HttpException from '../../exceptions/httpException';
import { ModelService } from '../../models/ModelService';

const {
  default: { jwtSecret },
} = config;

export default class AuthService {
  public createUserHttpException = (code: number): HttpException =>
    createUserHttpException(code, authErrorCodesMap);

  public signup = async ({
    password,
    username,
  }: UserDto): Promise<Record<'id' | 'token', string>> => {
    const UserModel = ModelService.modelDefinitions.userModel;

    if (
      await UserModel.findOne({
        where: {
          username,
        },
      })
    ) {
      throw this.createUserHttpException(AuthErrorCodes.UsernameIsNotUnique);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const {
      dataValues: { id },
    } = await UserModel.create({
      username,
      password: hashedPassword,
    });
    const { token } = this.createToken(id);

    return {
      id,
      token,
    };
  };

  public signin = async ({
    password,
    username,
  }: UserDto): Promise<Record<'id' | 'token', string>> => {
    const UserModel = ModelService.modelDefinitions.userModel;
    const user = await UserModel.findOne({
      where: { username },
    });

    if (user) {
      const isPasswordEquals = await bcrypt.compare(
        password,
        user.dataValues.password
      );

      if (isPasswordEquals) {
        const {
          dataValues: { id },
        } = user;
        const { token } = this.createToken(id);

        return { id, token };
      }

      throw this.createUserHttpException(AuthErrorCodes.PasswordsDoNotMatch);
    }

    throw this.createUserHttpException(AuthErrorCodes.UserDoesNotExist);
  };

  public createToken = (id: string): ITokenData => ({
    token: jwt.sign({ id }, jwtSecret, { expiresIn: 3600 }),
  });
}
