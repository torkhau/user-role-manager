import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/auth';
import { useNotificationContext } from '../contexts/notifications';
import { useSession } from './useSession';

export const useSessionAuth = () => {
  const { isSessionActive, getUserSessionData } = useSession();
  const { showNotification } = useNotificationContext();
  const { login } = useAuthContext();
  const [isSessionChecking, setIsSessionChecking] = useState(true);

  useEffect(() => {
    if (isSessionActive()) {
      const userData = getUserSessionData();

      if (userData) {
        showNotification({ text: `Your session restored, ${userData.username}`, severity: 'info' });
        login({ id: userData.id, email: userData.email, username: userData.username });
      }
    }

    setIsSessionChecking(false);
  }, [isSessionActive, getUserSessionData, login, showNotification]);

  return { isSessionChecking };
};
