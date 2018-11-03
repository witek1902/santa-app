import {UserEntry} from './user-entry.interface';
import {Pair} from './pair.interface';

export interface Draw {
  id: string;
  name: string;
  description: string;
  owner: UserEntry;
  participants: UserEntry[];
  pairs: Pair[];
  status: string;         // ACTIVE, FINISHED
  password: string;
  moneyLimit?: number;
  createdDate?: Date;
}
