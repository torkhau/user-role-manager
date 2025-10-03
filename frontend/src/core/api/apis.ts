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

export const putUserRoles = (curUser: IUserSessionData, { userId, roles }: { userId: string; roles: IRole[] }) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': curUser.id,
      'X-User-Email': curUser.email,
      'X-User-Username': curUser.username,
    },
    body: JSON.stringify(roles),
  };

  return apiFetch<IRole[]>(`users/${userId}/roles`, options);
};
