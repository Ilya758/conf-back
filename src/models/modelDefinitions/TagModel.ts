import { Sequelize, ModelDefined, Optional, DataTypes } from 'sequelize';
import { TableName } from '../../common/constants';
import { COMMON_MODEL_WITHOUT_TIMESTAMP_OPTIONS } from '../../common/constants/modelOptions';
import { ITag } from '../../common/models/interfaces/ITag';

export const TagModel = (
  sqlz: Sequelize
): ModelDefined<ITag, Optional<ITag, 'id'>> =>
  sqlz.define(
    TableName.Tags,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    COMMON_MODEL_WITHOUT_TIMESTAMP_OPTIONS
  );
