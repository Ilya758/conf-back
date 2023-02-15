import { Sequelize, ModelDefined, Optional, DataTypes } from 'sequelize';
import { TableName } from '../../common/constants';
import {
  COMMON_MODEL_OPTIONS,
  COMMON_MODEL_ADD_OPTIONS,
} from '../../common/constants/modelOptions';
import { IUser } from '../../common/models/interfaces';

export const UserModel = (
  sqlz: Sequelize
): ModelDefined<IUser, Optional<IUser, 'id' | 'created_at' | 'updated_at'>> =>
  sqlz.define(
    TableName.Users,
    {
      ...COMMON_MODEL_OPTIONS,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          max: 50,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
          max: 20,
        },
      },
    },
    COMMON_MODEL_ADD_OPTIONS
  );
