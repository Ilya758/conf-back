import { RequestHandler, Router } from 'express';
import { MeetupPath } from '../../common/constants/controllerPath';
import { IController } from '../../common/models/interfaces';
import { authMiddleware } from '../../middlewares';
import { validatePrimaryKey } from '../../middlewares/validatePrimaryKey';
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
      .get(`${MeetupPath.Meetups}`, this.getAll)
      .post(
        `${MeetupPath.Meetups}`,
        validationMiddleware(
          CreateMeetupDto,
          MeetupErrorCodes.MeetupDtoValidationFailed
        ),
        this.createMeetup
      )
      .put(
        `${MeetupPath.Meetups}/:id`,
        validatePrimaryKey,
        validationMiddleware(
          UpdateMeetupDto,
          MeetupErrorCodes.MeetupDtoValidationFailed
        ),
        this.updateMeetup
      )
      .get(`${MeetupPath.Meetups}/:id`, validatePrimaryKey, this.getById);
  }

  private getAll: RequestHandler = async (_, res, next) => {
    try {
      const meetups = await this.meetupService.getAll();
      res.send(meetups);
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
      const meetup = await this.meetupService.getAll(id);
      res.send(meetup);
    } catch (error) {
      next(error);
    }
  };

  private createMeetup: RequestHandler = async (
    req: IRequest<CreateMeetupDto>,
    res,
    next
  ) => {
    try {
      const id = await this.meetupService.createMeetup(req.body);
      res.status(HttpCodes.Created).send({ id });
    } catch (error) {
      next(
        createUserHttpException(
          MeetupErrorCodes.MeetupDtoValidationFailed,
          meetupErrorCodesMap
        )
      );
    }
  };

  private updateMeetup: RequestHandler = async (
    req: IRequest<UpdateMeetupDto>,
    res,
    next
  ) => {
    try {
      if (!req.params.id)
        createUserHttpException(
          MeetupErrorCodes.MeetupIsNotExist,
          meetupErrorCodesMap
        );

      await this.meetupService.updateMeetup(Number(req.params.id), req.body);

      res.sendStatus(HttpCodes.NoContent);
    } catch (error) {
      next(error);
    }
  };

}
