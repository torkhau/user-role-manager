import { createContext, useContext } from 'react';
import type { INotificationMessage } from '../../types';

type TNotificationContext = {
  showNotification: (msg: INotificationMessage) => void;
};

export const NotificationContext = createContext<TNotificationContext>({ showNotification: () => {} });

export const useNotificationContext = () => useContext(NotificationContext);
