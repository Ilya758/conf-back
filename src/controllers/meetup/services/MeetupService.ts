import { Filterable, Op, Sequelize } from 'sequelize';
import {
  IMeetupDto,
  IMeetupModel,
  IPageView,
} from '../../../common/models/interfaces';
import { ModelService } from '../../../models/ModelService';
import { createUserHttpException } from '../../../utils/createHttpExceptions';
import { arrayAggregate, includeAssociation } from '../../../utils/sequelize';
import { MeetupErrorCodes, meetupErrorCodesMap } from '../../../common/codes';
import { CreateMeetupDto, UpdateMeetupDto } from '../DTO';
import { getUniqueParticipants } from './helpers';
import { generatePage } from '../../../utils';

export default class MeetupService {
  public getAll = async (
    id: string | null = null,
    { pageIndex, pageSize }: IPageView = { pageIndex: 1, pageSize: 10 }
  ):
    | Promise<
        | ReturnType<typeof meetupModel.findByPk>
        | IMeetupDto<ReturnType<typeof meetupModel.findAll>>
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
      subQuery: false,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
    });

    if (id && !meetups.length) {
      throw createUserHttpException(
        MeetupErrorCodes.MeetupIsNotExist,
        meetupErrorCodesMap
      );
    }

    if (!id) {
      const { count } = await meetupModel.findAndCountAll({ raw: true });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore incompatibility of types
      return generatePage(meetups, count, { pageIndex, pageSize });
    }

    return meetups[0];
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

  public updateMeetup = async (
    id: number,
    meetup: UpdateMeetupDto
  ): Promise<void> | never => {
    const {
      modelDefinitions: { meetupModel },
    } = ModelService;

    if (await meetupModel.findByPk(id)) {
      const { participantIds, tagIds } = meetup;

      await meetupModel.update(meetup, {
        where: {
          id,
        },
      });

      try {
        await this.updateParticipants(id, participantIds);
        await this.updateTags(id, tagIds);
      } catch (error) {
        throw createUserHttpException(
          MeetupErrorCodes.MeetupModificationFailed,
          meetupErrorCodesMap
        );
      }
    } else {
      throw createUserHttpException(
        MeetupErrorCodes.MeetupIsNotExist,
        meetupErrorCodesMap
      );
    }
  };

  public deleteMeetup = async (id: number): Promise<void> | never => {
    const {
      modelDefinitions: { meetupModel },
    } = ModelService;

    if (!(await meetupModel.findByPk(id)))
      throw createUserHttpException(
        MeetupErrorCodes.MeetupIsNotExist,
        meetupErrorCodesMap
      );

    await meetupModel.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
  };

  public updateParticipants = async (
    id: number,
    participantIds: number[] | null = null
  ): Promise<void> | never => {
    const {
      sequelize,
      modelDefinitions: { meetupParticipantsModel },
    } = ModelService;

    await sequelize.transaction(async (t) => {
      const participants = await meetupParticipantsModel.findAll({
        transaction: t,
        where: {
          meetup_id: {
            [Op.eq]: id,
          },
        },
      });

      if (participantIds) {
        if (participants.length > 1) {
          const organizer = participants.find(
            ({ dataValues: { is_organizer } }) => is_organizer
          );

          await meetupParticipantsModel.destroy({
            transaction: t,
            where: {
              participant_id: {
                [Op.ne]: organizer?.dataValues.participant_id,
              },
            },
          });
        }

        if (participantIds.length)
          await meetupParticipantsModel.bulkCreate(
            participantIds.map((participant_id) => ({
              meetup_id: id,
              participant_id,
              is_organizer: false,
            })),
            { transaction: t }
          );
      }
    });
  };

  public updateTags = async (
    id: number,
    tagIds: number[] | null = null
  ): Promise<void> | never => {
    const {
      sequelize,
      modelDefinitions: { meetupTagsModel },
    } = ModelService;

    await sequelize.transaction(async (t) => {
      if (tagIds) {
        const tags = await meetupTagsModel.findAll({
          transaction: t,
          where: {
            meetup_id: {
              [Op.eq]: id,
            },
          },
        });

        if (tags.length)
          await meetupTagsModel.destroy({
            transaction: t,
            where: {
              meetup_id: {
                [Op.eq]: id,
              },
            },
          });

        if (tagIds.length)
          await meetupTagsModel.bulkCreate(
            tagIds.map((tag_id) => ({
              meetup_id: id,
              tag_id,
            })),
            { transaction: t }
          );
      }
    });
  };
}
