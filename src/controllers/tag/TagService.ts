import { Filterable } from 'sequelize';
import { TagErrorCodes, tagErrorCodesMap } from '../../common/codes';
import { IMeetupTag } from '../../common/models/interfaces/IMeetupTag';
import { ModelService } from '../../models/ModelService';
import { createUserHttpException } from '../../utils/createHttpExceptions';

export default class TagService {
  public getAll = async (
    id: string | null = null
  ): Promise<
    ReturnType<typeof tagModel.findAll> | ReturnType<typeof tagModel.findByPk>
  > => {
    const {
      modelDefinitions: { tagModel },
    } = ModelService;
    const whereStatement: Filterable<IMeetupTag>['where'] = id
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
}
