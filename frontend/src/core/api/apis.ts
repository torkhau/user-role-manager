import type { IRole, IUser, IUserSessionData } from '../types';
import { apiFetch } from './apiFetch';

export const getUsers = () => {
  return apiFetch<IUser[]>('users');
};

export const getRoles = () => {
  return apiFetch<IRole[]>('roles');
};

export const auth = (body: { email: string; password: string }) => {
  return apiFetch<IUserSessionData>('login', { method: 'POST', body: JSON.stringify(body) });
};

export const patchUserRoles = (curUser: IUserSessionData, { userId, roles }: { userId: string; roles: IRole[] }) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': curUser.id,
      'X-User-Email': curUser.email,
      'X-User-Username': curUser.username,
    },
    body: JSON.stringify(roles),
  };

  return apiFetch<IUser>(`users/${userId}/roles`, options);
};
