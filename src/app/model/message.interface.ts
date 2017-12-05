import {UserEntry} from './user-entry.interface';

export interface Message {
  id: string;
  author: UserEntry;
  text: string;
}
