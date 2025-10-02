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
