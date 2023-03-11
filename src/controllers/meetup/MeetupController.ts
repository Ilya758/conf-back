import { RequestHandler, Router } from 'express';
import { MeetupPath } from '../../common/constants/controllerPath';
import { IController } from '../../common/models/interfaces';
import { authMiddleware } from '../../middlewares';
import { useAllPathRoute } from '../../utils';
import { MeetupService } from './services';

export class MeetupController implements IController {
  public meetupService = new MeetupService();

  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .all(useAllPathRoute(MeetupPath.Meetups), authMiddleware)
      .get(`${MeetupPath.Meetups}`, this.getAll);
  }

  private getAll: RequestHandler = async (_, res, next) => {
    try {
      const meetups = await this.meetupService.getAll();
      res.send(meetups);
    } catch (error) {
      next(error);
    }
  };
}
