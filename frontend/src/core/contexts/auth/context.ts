import { createContext, useContext } from 'react';
import type { IUserSessionData } from '../../types';

type TAuthContext = {
  user: IUserSessionData | null;
  logout: () => void;
  login: (user: IUserSessionData) => void;
};

export const AuthContext = createContext<TAuthContext>({ user: null, login: () => {}, logout: () => {} });

export const useAuthContext = () => useContext(AuthContext);
