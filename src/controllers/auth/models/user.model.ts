import { DataTypes, ModelDefined, Optional, Sequelize } from 'sequelize';
import { COMMON_MODEL_OPTIONS } from '../../../common/constants/commonModelOptions';
import { TableName } from '../../../common/constants/tableName';
import { IUser } from '../../../common/models/interfaces';

export const getUserModel = (
  sqlz: Sequelize
): ModelDefined<IUser, Optional<IUser, 'id' | 'created_at' | 'updated_at'>> =>
  sqlz.define(
    TableName.Users,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: 8,
          max: 20,
        },
      },
    },
    COMMON_MODEL_OPTIONS
  );
