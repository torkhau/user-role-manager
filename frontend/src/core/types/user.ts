import type { IEffectiveRole, IRole } from './role';

export interface IUser {
  id: string;
  email: string;
  username: string;
  roles: IRole[];
  effectiveRoles: IEffectiveRole[];
}

export interface IUserSessionData extends Pick<IUser, 'id' | 'email' | 'username'> {}