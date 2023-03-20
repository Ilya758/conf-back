import { RequestHandler, Router } from 'express';
import { TagPath } from '../../common/constants/controllerPath';
import { IController } from '../../common/models/interfaces';
import { authMiddleware } from '../../middlewares';
import { validatePrimaryKey } from '../../middlewares/validatePrimaryKey';
import { useAllPathRoute } from '../../utils';
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
      .get(`${TagPath.Tags}/:id`, validatePrimaryKey, this.getById);
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
}
