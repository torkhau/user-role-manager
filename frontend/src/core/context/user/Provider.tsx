import { useState, type ReactNode } from 'react';
import { useSession } from '../../hooks';
import type { IUserSessionData } from '../../types';
import { AuthContext } from './context';

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserSessionData | null>(null);
  const { endSession, startSession } = useSession();

  const logout = () => {
    setUser(null);
    endSession();
  };

  const login = (user: IUserSessionData) => {
    setUser(user);
    startSession(user);
  };

  return <AuthContext value={{ user, logout, login }}>{children}</AuthContext>;
};
