import { useCallback } from 'react';
import type { IUserSessionData } from '../types';

const SESSION_DURATION = 60 * 60 * 1000; // 1 hour
const SESSION_USER_DATA = 'session_user_data';
const SESSION_EXPIRES_AT = 'session_expires_at';

export const useSession = () => {
  const startSession = useCallback((user: IUserSessionData) => {
    const expiresAt = Date.now() + SESSION_DURATION;

    localStorage.setItem(SESSION_USER_DATA, JSON.stringify(user));
    localStorage.setItem(SESSION_EXPIRES_AT, expiresAt.toString());
  }, []);

  const endSession = useCallback(() => {
    localStorage.removeItem(SESSION_USER_DATA);
    localStorage.removeItem(SESSION_EXPIRES_AT);
  }, []);

  const isSessionActive = useCallback(() => {
    const expiresAt = localStorage.getItem(SESSION_EXPIRES_AT);

    if (expiresAt === null) return null;

    const date = parseInt(expiresAt, 10);

    if (isNaN(date)) return false;

    return Date.now() < date;
  }, []);

  const getUserSessionData = useCallback(() => {
    const userData = localStorage.getItem(SESSION_USER_DATA);

    if (!userData) return null;

    const user: IUserSessionData = JSON.parse(userData);

    return user;
  }, []);

  return { startSession, endSession, isSessionActive, getUserSessionData };
};
