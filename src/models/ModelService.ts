/* eslint-disable no-constructor-return */
import { Sequelize } from 'sequelize';
import {
  MeetupModel,
  MeetupParticipantsModel,
  MeetupTagModel,
  TagModel,
  UserModel,
} from './modelDefinitions';

type TModelDefinitions = {
  meetupModel: ReturnType<typeof MeetupModel>;
  meetupParticipantsModel: ReturnType<typeof MeetupParticipantsModel>;
  meetupTagsModel: ReturnType<typeof MeetupTagModel>;
  tagModel: ReturnType<typeof TagModel>;
  userModel: ReturnType<typeof UserModel>;
};

export class ModelService {
  static instance: ModelService;

  static modelDefinitions: TModelDefinitions;

  static sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    if (ModelService.instance) {
      return ModelService.instance;
    }

    ModelService.modelDefinitions = {
      meetupModel: MeetupModel(sequelize),
      meetupParticipantsModel: MeetupParticipantsModel(sequelize),
      meetupTagsModel: MeetupTagModel(sequelize),
      tagModel: TagModel(sequelize),
      userModel: UserModel(sequelize),
    };

    ModelService.sequelize = sequelize;

    this.associateMeetupsWithTags();
    this.associateMeetupWithParticipants();

    ModelService.instance = this;
  }

  private associateMeetupsWithTags = (): void => {
    const { meetupModel, tagModel } = ModelService.modelDefinitions;

    meetupModel.belongsToMany(tagModel, {
      through: 'meetup_tags',
      as: {
        singular: 'tag',
        plural: 'tags',
      },
      foreignKey: 'meetup_id',
    });

    tagModel.belongsToMany(meetupModel, {
      through: 'meetup_tags',
      as: {
        singular: 'meetup',
        plural: 'meetups',
      },
      foreignKey: 'tag_id',
    });
  };

  private associateMeetupWithParticipants = (): void => {
    const { meetupModel, userModel } = ModelService.modelDefinitions;

    userModel.belongsToMany(meetupModel, {
      through: 'meetup_participants',
      as: {
        singular: 'meetup',
        plural: 'meetups',
      },
      foreignKey: 'participant_id',
    });

    meetupModel.belongsToMany(userModel, {
      through: 'meetup_participants',
      as: {
        singular: 'participant',
        plural: 'participants',
      },
      foreignKey: 'meetup_id',
    });
  };
}
