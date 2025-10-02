import type { IRole } from './role';

export interface IUser {
  id: string;
  email: string;
  username: string;
  roles: IRole[];
}

export interface IUserSessionData extends Pick<IUser, 'id' | 'email' | 'username'> {
  isAdmin?: boolean;
}

export interface IUserRole extends IRole {
  checked: boolean;
  disabled?: boolean;
}

export interface IUserTableItem extends IUser {
  roles: IUserRole[];
}
