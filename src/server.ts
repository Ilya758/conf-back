import 'reflect-metadata';
import App from './app';
import { AuthController } from './controllers/auth';
import { MeetupController } from './controllers/meetup/MeetupController';
import { TagController } from './controllers/tag/TagController';

new App([
  new AuthController(),
  new MeetupController(),
  new TagController(),
]).listen();
