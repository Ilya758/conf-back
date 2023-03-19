import { Filterable, Sequelize } from 'sequelize';
import { IMeetupModel } from '../../../common/models/interfaces';
import { ModelService } from '../../../models/ModelService';
import { arrayAggregate, includeAssociation } from '../../../utils/sequelize';

export default class MeetupService {
  public getAll = async (
    id: string | null = null
  ):
    | Promise<
        | ReturnType<typeof meetupModel.findAll>
        | ReturnType<typeof meetupModel.findByPk>
      >
    | never => {
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

    if (id && !meetups.length) {
      throw createUserHttpException(
        MeetupErrorCodes.MeetupIsNotExist,
        meetupErrorCodesMap
      );
    }

    return !id ? meetups : meetups[0];
  };

  public createMeetup = async (
    meetup: CreateMeetupDto
  ): Promise<number> | never => {
    const {
      modelDefinitions: {
        meetupModel,
        meetupParticipantsModel,
        meetupTagsModel,
      },
      sequelize,
    } = ModelService;

    const meetupId = await sequelize.transaction(async (t) => {
      const {
        dataValues: { id },
      } = await meetupModel.create(meetup, { transaction: t });

      if (id) {
        if (meetup.tagIds) {
          await meetupTagsModel.bulkCreate(
            meetup.tagIds.map((tag_id) => ({
              tag_id,
              meetup_id: id,
            })),
            { transaction: t }
          );
        }

        const { participantIds, organizerId } = meetup;

        const participants = [
          meetup.organizerId,
          ...(participantIds
            ? getUniqueParticipants(participantIds, organizerId)
            : []),
        ].map((participant_id, index) => ({
          participant_id,
          is_organizer: index === 0,
          meetup_id: id,
        }));

        await meetupParticipantsModel.bulkCreate(participants, {
          transaction: t,
        });
      } else {
        createUserHttpException(
          MeetupErrorCodes.MeetupCreationFailed,
          meetupErrorCodesMap
        );
      }

      return id;
    });

    return <number>meetupId;
  };

}
