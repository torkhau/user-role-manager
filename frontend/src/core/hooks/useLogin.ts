import { useState } from 'react';
import { useAuthContext } from '../context/user';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthContext();

  const fetchLogin = async ({ email, password }: { email: string; password: string }) => {
    setIsLoading(true);

    try {
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      login({ id: '1', email });
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchLogin };
};
