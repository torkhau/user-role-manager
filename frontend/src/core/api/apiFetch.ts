import { API_BASE_URL } from '../const';
import type { IErrorResponse, ISuccessResponse, TApiResponse } from './types';

export const apiFetch = async <T>(endpoint: string, options?: RequestInit): Promise<TApiResponse<T>> => {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    const resData = await res.json();

    if (res.ok) {
      return { success: true, ...resData } as ISuccessResponse<T>;
    } else {
      return { success: false, ...resData } as IErrorResponse;
    }
  } catch (error) {
    console.error('Login failed', error);

    return { success: false, error: 'Unknown error', message: 'An unknown error occurred', statusCode: 500 };
  }
};
