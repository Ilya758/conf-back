import { Sequelize } from 'sequelize';
import { ModelService } from '../../../models/ModelService';
import { arrayAggregate, includeAssociation } from '../../../utils/sequelize';

export default class MeetupService {
  public getAll = async (): Promise<ReturnType<typeof meetupModel.findAll>> => {
    const {
      modelDefinitions: { meetupModel, tagModel, userModel },
    } = ModelService;

    const meetups = await meetupModel.findAll({
      attributes: {
        include: [
          arrayAggregate('tags.name', 'tags'),
          arrayAggregate('participants.username', 'participants'),
        ],
      },
      raw: true,
      include: [
        includeAssociation(tagModel, 'tags'),
        includeAssociation(userModel, 'participants'),
      ],
      order: [[Sequelize.literal('meetups.id'), 'ASC']],
      group: ['meetups.id'],
    });

    return meetups;
  };
}
