import { Filterable } from 'sequelize';
import { TagErrorCodes, tagErrorCodesMap } from '../../common/codes';
import { ITag } from '../../common/models/interfaces/ITag';
import { ModelService } from '../../models/ModelService';
import { createUserHttpException } from '../../utils/createHttpExceptions';
import { TagDto } from './DTO';

export default class TagService {
  public getAll = async (
    id: string | null = null
  ): Promise<
    | ReturnType<typeof tagModel.findAll>
    | ReturnType<typeof tagModel.findByPk>
    | never
  > => {
    const {
      modelDefinitions: { tagModel },
    } = ModelService;
    const whereStatement: Filterable<ITag>['where'] = id
      ? {
          id,
        }
      : {};

    const tags = await tagModel.findAll({ raw: true, where: whereStatement });

    if (id && !tags.length)
      throw createUserHttpException(
        TagErrorCodes.TagIsNotExist,
        tagErrorCodesMap
      );

    return !id ? tags : tags[0];
  };

  public createTag = async (tag: TagDto): Promise<number> | never => {
    const {
      modelDefinitions: { tagModel },
    } = ModelService;

    try {
      const {
        dataValues: { id },
      } = await tagModel.create(tag);

      return id;
    } catch (error) {
      throw createUserHttpException(
        TagErrorCodes.TagCreationFailed,
        tagErrorCodesMap
      );
    }
  };

  public updateTag = async (id: number, tag: TagDto): Promise<void> | never => {
    const {
      modelDefinitions: { tagModel },
    } = ModelService;
    if (await tagModel.findByPk(id)) {
      try {
        await tagModel.update(tag, {
          where: {
            id,
          },
        });
      } catch (error) {
        throw createUserHttpException(
          TagErrorCodes.TagModificationFailed,
          tagErrorCodesMap
        );
      }
    } else {
      throw createUserHttpException(
        TagErrorCodes.TagIsNotExist,
        tagErrorCodesMap
      );
    }
  };
}
