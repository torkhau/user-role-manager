import { useState, type ReactNode } from 'react';
import type { IUser } from '../../types';
import { UserContext } from './context';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
};
