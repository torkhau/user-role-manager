import { createContext, useContext } from 'react';

type TMenuItemContext = {
  menuItem: number;
  setMenuItem: (newMenuItem: number) => void;
};

export const MenuItemContext = createContext<TMenuItemContext>({ menuItem: 0, setMenuItem: () => {} });

export const useMenuItemContext = () => useContext(MenuItemContext);
