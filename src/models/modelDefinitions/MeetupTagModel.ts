import { Sequelize, ModelDefined, Optional, DataTypes } from 'sequelize';
import { TableName } from '../../common/constants';
import { COMMON_MODEL_WITHOUT_TIMESTAMP_OPTIONS } from '../../common/constants/modelOptions';
import { IMeetupTag } from '../../common/models/interfaces/IMeetupTag';

export const MeetupTagModel = (
  sqlz: Sequelize
): ModelDefined<IMeetupTag, Optional<IMeetupTag, 'id'>> =>
  sqlz.define(
    TableName.MeetupTags,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      meetup_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    COMMON_MODEL_WITHOUT_TIMESTAMP_OPTIONS
  );
