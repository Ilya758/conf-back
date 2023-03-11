import 'reflect-metadata';
import App from './app';
import { AuthController } from './controllers/auth';
import { MeetupController } from './controllers/meetup/MeetupController';

new App([new AuthController(), new MeetupController()]).listen();
