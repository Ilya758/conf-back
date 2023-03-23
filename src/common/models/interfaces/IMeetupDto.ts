import { IPage } from './IPage';

export interface IMeetupDto<T> {
  items: T[];
  pageView: IPage;
}
