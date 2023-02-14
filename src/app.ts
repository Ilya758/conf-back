import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { Sequelize } from 'sequelize';
import { DEFAULT_PORT } from './common/constants/defaultPort';
import { TControllerTypes } from './common/models/types';
import * as config from './config';
import { AuthController } from './controllers/auth';
import { errorMiddleware } from './middlewares';
import { validateEnv } from './utils';

validateEnv();

const {
  default: { database, host, nodeEnv, password, port, username, dialect },
} = config;

export default class App {
  private app: express.Application;

  constructor() {
    this.app = express();

    const sqlz = this.connectToTheDatabase();
    const controllers = [AuthController];
    this.initializeMiddlewares();
    this.initializeControllers(controllers, sqlz);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares = (): void => {
    if (nodeEnv !== 'prod') {
      this.app.use(morgan('dev'));
    }

    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(compression());
    this.app.use(cors());
  };

  private initializeControllers = (
    controllers: TControllerTypes,
    sqlzInstance: Sequelize
  ): void => {
    controllers.forEach((Controller) => {
      const { router } = new Controller(sqlzInstance);
      this.app.use('/', router);
    });
  };

  private initializeErrorHandling = (): void => {
    this.app.use(errorMiddleware);
  };

  private connectToTheDatabase = (): Sequelize => {
    const sequelize = new Sequelize({
      database,
      dialect,
      host,
      username,
      password,
    });

    sequelize.authenticate().catch((error) => {
      console.log(error);
    });

    return sequelize;
  };

  public listen = (): void => {
    this.app.listen(port, () => {
      console.log(`Application was running on port ${port || DEFAULT_PORT}`);
    });
  };
}
