import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUserHttpException } from '../../utils/createHttpExceptions';
import { AuthErrorCodes, authErrorCodesMap } from './codes';
import { UserDto } from './DTO';
import { getUserModel } from './models/user.model';
import * as config from '../../config';
import { ITokenData } from '../../common/models/interfaces';
import HttpException from '../../exceptions/httpException';

const {
  default: { jwtSecret },
} = config;

export default class AuthService {
  public createUserHttpException = (code: number): HttpException =>
    createUserHttpException(code, authErrorCodesMap);

  public signup = async (
    sqlzInstance: Sequelize,
    { password, username }: UserDto
  ): Promise<Record<'id' | 'token', string>> => {
    const userModel = getUserModel(sqlzInstance);

    if (
      await userModel.findOne({
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
    } = await userModel.create({
      username,
      password: hashedPassword,
    });
    const { token } = this.createToken(id);

    return {
      id,
      token,
    };
  };

  public signin = async (
    sqlzInstance: Sequelize,
    { password, username }: UserDto
  ): Promise<Record<'id' | 'token', string>> => {
    const userModel = getUserModel(sqlzInstance);
    const user = await userModel.findOne({
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
