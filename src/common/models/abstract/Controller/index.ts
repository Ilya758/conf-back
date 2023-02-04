import { Router } from 'express';
import { Sequelize } from 'sequelize';

export default abstract class Controller {
  abstract path: string;

  abstract router: Router;

  abstract sqlzInstance: Sequelize;
}
