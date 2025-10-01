import { useState } from 'react';
import { useAuthContext } from '../contexts/auth';
import { useNotificationContext } from '../contexts/notifications';
import type { INotificationMessage } from '../types';


export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthContext();
  const { showNotification } = useNotificationContext();

  const fetchLogin = async ({ email, password }: { email: string; password: string }) => {
    setIsLoading(true);
    const msg: INotificationMessage = { severity: 'error', text: 'Server not answer' };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok)  {
        msg.severity = 'success';
        msg.text = `Welcome, ${data.user.username}!`;
        login({ id: data.user.id, email: data.user.email });
      } else {
        msg.text = data.message;
      }
      
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }

    showNotification(msg);
  };

  return { isLoading, fetchLogin };
};
