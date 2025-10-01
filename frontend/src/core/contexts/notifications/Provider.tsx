import { Alert, Snackbar } from '@mui/material';
import { useCallback, useState, type ReactNode } from 'react';
import type { INotificationMessage } from '../../types';
import { NotificationContext } from './context';

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<INotificationMessage | null>(null);

  const showNotification = useCallback(
    (msg: INotificationMessage) => {
      setMessage(msg);
      setOpen(true);
    },
    [setMessage]
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <NotificationContext value={{ showNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleClose} severity={message?.severity} sx={{ width: '100%' }}>
          {message?.text}
        </Alert>
      </Snackbar>
    </NotificationContext>
  );
};
