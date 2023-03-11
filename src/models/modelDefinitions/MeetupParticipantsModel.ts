import { Sequelize, ModelDefined, Optional, DataTypes } from 'sequelize';
import { TableName } from '../../common/constants';
import { COMMON_MODEL_WITHOUT_TIMESTAMP_OPTIONS } from '../../common/constants/modelOptions';
import { IMeetupParticipantsModel } from '../../common/models/interfaces/IMeetupParticipantsModel';
import { MeetupModel } from './MeetupModel';
import { UserModel } from './UserModel';

export const MeetupParticipantsModel = (
  sqlz: Sequelize
): ModelDefined<
  IMeetupParticipantsModel,
  Optional<IMeetupParticipantsModel, 'id'>
> =>
  sqlz.define(
    TableName.MeetupParticipants,
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
        references: {
          model: MeetupModel(sqlz),
        },
      },
      participant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: UserModel(sqlz),
        },
      },
      is_organizer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    COMMON_MODEL_WITHOUT_TIMESTAMP_OPTIONS
  );
