import { User } from 'src/database/entities';

export interface DataDTO extends Pick<User, 'id' | 'email' | 'username'> {}
