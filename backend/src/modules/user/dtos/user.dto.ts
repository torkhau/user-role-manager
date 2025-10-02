import { User } from 'src/database/entities';

export interface UserDTO extends Omit<User, 'password'> {}
