import { useState } from 'react';
import { auth } from '../api';
import { useAuthContext } from '../contexts/auth';
import { useNotificationContext } from '../contexts/notifications';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthContext();
  const { showNotification } = useNotificationContext();

  const fetchLogin = async (body: { email: string; password: string }) => {
    setIsLoading(true);

    const result = await auth(body);

    setIsLoading(false);

    if (result.success) login(result.data);

    if (result.message) showNotification({ text: result.message, severity: result.success ? 'success' : 'error' });
  };

  return { isLoading, fetchLogin };
};
