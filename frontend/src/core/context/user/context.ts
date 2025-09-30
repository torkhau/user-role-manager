import { createContext, useContext } from 'react';
import type { IUser } from '../../types';

type TUserContext = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
};

export const UserContext = createContext<TUserContext>({ user: null, setUser: () => {} });

export const useUser = () => useContext(UserContext);