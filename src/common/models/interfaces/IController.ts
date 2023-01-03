import { Router } from 'express';
import { ControllerPath } from '../../constants/controllerPath';

export interface IController {
  path: ControllerPath;
  router: Router;
}
