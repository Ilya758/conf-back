/* eslint-disable no-new */
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { Sequelize } from 'sequelize';
import { DEFAULT_PORT } from './common/constants/defaultPort';
import { IController } from './common/models/interfaces';
import * as config from './config';
import { errorMiddleware } from './middlewares';
import { ModelService } from './models/ModelService';
import { validateEnv } from './utils';

validateEnv();

const {
  default: { database, host, nodeEnv, password, port, username, dialect },
} = config;

export default class App {
  private app: express.Application;

  constructor(controllers: IController[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
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

  private initializeControllers = (controllers: IController[]): void => {
    controllers.forEach(({ router }) => {
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

    this.initializeModels(sequelize);

    return sequelize;
  };

  private initializeModels = (sequelize: Sequelize): void => {
    new ModelService(sequelize);
  };

  public listen = (): void => {
    this.app.listen(port, () => {
      console.log(`Application was running on port ${port || DEFAULT_PORT}`);
    });
  };
}
