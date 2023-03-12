import { Filterable, Sequelize } from 'sequelize';
import { IMeetupModel } from '../../../common/models/interfaces';
import { ModelService } from '../../../models/ModelService';
import { arrayAggregate, includeAssociation } from '../../../utils/sequelize';

export default class MeetupService {
  public getAll = async (
    id: string | null = null
  ): Promise<
    | ReturnType<typeof meetupModel.findAll>
    | ReturnType<typeof meetupModel.findByPk>
  > => {
    const {
      modelDefinitions: { meetupModel, tagModel, userModel },
    } = ModelService;
    const whereStatement: Filterable<IMeetupModel>['where'] = id
      ? {
          id,
        }
      : {};
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
      where: whereStatement,
    });

    return !id ? meetups : meetups[0];
  };
}
