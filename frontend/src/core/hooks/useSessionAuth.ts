import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/user';
import { useSession } from './useSession';

export const useSessionAuth = () => {
  const { isSessionActive, getUserSessionData } = useSession();
  const { login } = useAuthContext();
  const [isSessionChecking, setIsSessionChecking] = useState(true);

  useEffect(() => {
    if (isSessionActive()) {
      const userData = getUserSessionData();

      if (userData) login({ id: userData.id, email: userData.email });
    }

    setIsSessionChecking(false);
  }, [isSessionActive, getUserSessionData, login]);

  return { isSessionChecking };
};
