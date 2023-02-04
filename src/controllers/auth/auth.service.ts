import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createErrorMessage } from '../../utils/createErrorMessage';
import { createUserHttpException } from '../../utils/createHttpExceptions';
import { AuthErrorCodes, authErrorCodesMap } from './codes';
import { CreateUserDto } from './DTO';
import { getUserModel } from './models/user.model';
import * as config from '../../config';
import { ITokenData } from '../../common/models/interfaces';

const {
  default: { jwtSecret },
} = config;

export default class AuthService {
  public signup = async (
    sqlzInstance: Sequelize,
    { password, username }: CreateUserDto
  ): Promise<Record<'id' | 'token', string>> => {
    const userModel = getUserModel(sqlzInstance);

    if (
      await userModel.findOne({
        where: {
          username,
        },
      })
    ) {
      throw createUserHttpException(
        createErrorMessage(
          AuthErrorCodes.UsernameIsNotUnique,
          authErrorCodesMap
        )
      );
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

  public createToken = (id: string): ITokenData => ({
    token: jwt.sign({ id }, jwtSecret, { expiresIn: 3600 }),
  });
}
