import { RequestHandler, Router } from 'express';
import { TagErrorCodes, tagErrorCodesMap } from '../../common/codes';
import { HttpCodes } from '../../common/constants';
import { TagPath } from '../../common/constants/controllerPath';
import { IController, IRequest } from '../../common/models/interfaces';
import { authMiddleware, validationMiddleware } from '../../middlewares';
import { validatePrimaryKey } from '../../middlewares/validatePrimaryKey';
import { useAllPathRoute } from '../../utils';
import { createUserHttpException } from '../../utils/createHttpExceptions';
import { TagDto } from './DTO';
import TagService from './TagService';

export class TagController implements IController {
  public tagService = new TagService();

  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router
      .all(useAllPathRoute(TagPath.Tags), authMiddleware)
      .get(TagPath.Tags, this.getAll)
      .get(`${TagPath.Tags}/:id`, validatePrimaryKey, this.getById)
      .post(
        TagPath.Tags,
        validationMiddleware(TagDto, TagErrorCodes.TagDtoValidationFailed),
        this.createTag
      )
      .put(
        `${TagPath.Tags}/:id`,
        validatePrimaryKey,
        validationMiddleware(TagDto, TagErrorCodes.TagDtoValidationFailed),
        this.updateTag
      )
      .delete(`${TagPath.Tags}/:id`, validatePrimaryKey, this.deleteTag);
  };

  private getAll: RequestHandler = async (_, res, next) => {
    try {
      const tags = await this.tagService.getAll();
      res.send(tags);
    } catch (error) {
      next(error);
    }
  };

  private getById: RequestHandler<{ id: string }> = async (
    { params: { id } },
    res,
    next
  ) => {
    try {
      const tag = await this.tagService.getAll(id);
      res.send(tag);
    } catch (error) {
      next(error);
    }
  };

  private createTag: RequestHandler = async (
    req: IRequest<TagDto>,
    res,
    next
  ) => {
    try {
      const id = await this.tagService.createTag(req.body);
      res.status(HttpCodes.Created).send({ id });
    } catch (error) {
      next(error);
    }
  };

  private updateTag: RequestHandler = async (
    req: IRequest<TagDto>,
    res,
    next
  ) => {
    try {
      if (!req.params.id)
        throw createUserHttpException(
          TagErrorCodes.TagModificationFailed,
          tagErrorCodesMap
        );
      await this.tagService.updateTag(+req.params.id, req.body);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  private deleteTag: RequestHandler = async (req, res, next) => {
    try {
      if (!req.params.id)
        throw createUserHttpException(
          TagErrorCodes.TagDeletionFailed,
          tagErrorCodesMap
        );
      await this.tagService.deleteTag(+req.params.id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
