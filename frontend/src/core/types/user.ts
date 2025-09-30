export interface IUser {
  id: string;
  email: string;
  name?: string;
  roles: string[];
}

export interface IUserSessionData extends Pick<IUser, 'id' | 'email'> {}