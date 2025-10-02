import { useState, type ReactNode } from 'react';
import { MenuItemContext } from './context';

export const MenuItemProvider = ({ children }: { children: ReactNode }) => {
  const [menuItem, setMenuItem] = useState(0);

  return <MenuItemContext value={{ menuItem, setMenuItem }}>{children}</MenuItemContext>;
};
