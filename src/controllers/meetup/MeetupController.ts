import { RequestHandler, Router } from 'express';
import { HttpCodes } from '../../common/constants';
import { MeetupPath } from '../../common/constants/controllerPath';
import { IController, IRequest } from '../../common/models/interfaces';
import { authMiddleware, validationMiddleware } from '../../middlewares';
import { validatePrimaryKey } from '../../middlewares/validatePrimaryKey';
import { useAllPathRoute } from '../../utils';
import { createUserHttpException } from '../../utils/createHttpExceptions';
import {
  CommonErrorCodes,
  commonErrorCodesMap,
  MeetupErrorCodes,
  meetupErrorCodesMap,
} from '../../common/codes';
import { CreateMeetupDto, UpdateMeetupDto } from './DTO';
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
      .delete(
        `${MeetupPath.Meetups}/:id`,
        validatePrimaryKey,
        this.deleteMeetup
      )
      .get(`${MeetupPath.Meetups}/:id`, validatePrimaryKey, this.getById);
  }

  private getAll: RequestHandler = async (req, res, next) => {
    try {
      if (req.query.pageSize && req.query.pageIndex) {
        const { pageIndex, pageSize } = req.query;
        const meetups = await this.meetupService.getAll(null, {
          pageIndex: Number(pageIndex),
          pageSize: Number(pageSize),
        });
        res.send(meetups);
      } else {
        throw createUserHttpException(
          CommonErrorCodes.PaginationValidationFailed,
          commonErrorCodesMap
        );
      }
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
          MeetupErrorCodes.MeetupModificationFailed,
          meetupErrorCodesMap
        );

      await this.meetupService.updateMeetup(Number(req.params.id), req.body);

      res.sendStatus(HttpCodes.NoContent);
    } catch (error) {
      next(error);
    }
  };

  private deleteMeetup: RequestHandler = async (req, res, next) => {
    try {
      if (!req.params.id)
        createUserHttpException(
          MeetupErrorCodes.MeetupDeletionFailed,
          meetupErrorCodesMap
        );

      await this.meetupService.deleteMeetup(Number(req.params.id));
      res.sendStatus(HttpCodes.NoContent);
    } catch (error) {
      next(error);
    }
  };
}
