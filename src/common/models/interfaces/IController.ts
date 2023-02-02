import { Router } from 'express';
import { AuthPath } from '../../constants/controllerPath';

export interface IController {
  path: AuthPath;
  router: Router;
}
