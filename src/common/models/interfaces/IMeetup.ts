import { IMeetupModel } from './IMeetupModel';

export interface IMeetup extends IMeetupModel {
  tags: string[];
  participants: string[];
}
