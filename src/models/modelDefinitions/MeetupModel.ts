import { Sequelize, ModelDefined, Optional, DataTypes } from 'sequelize';
import { TableName } from '../../common/constants';
import {
  COMMON_MODEL_OPTIONS,
  COMMON_MODEL_ADD_OPTIONS,
} from '../../common/constants/modelOptions';
import { IMeetupModel } from '../../common/models/interfaces';

export const MeetupModel = (
  sqlz: Sequelize
): ModelDefined<
  IMeetupModel,
  Optional<IMeetupModel, 'id' | 'created_at' | 'updated_at'>
> =>
  sqlz.define(
    TableName.Meetups,
    {
      ...COMMON_MODEL_OPTIONS,
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          max: 200,
        },
      },
      location: {
        type: DataTypes.STRING,
        validate: {
          max: 30,
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 30,
        },
      },
    },
    COMMON_MODEL_ADD_OPTIONS
  );
