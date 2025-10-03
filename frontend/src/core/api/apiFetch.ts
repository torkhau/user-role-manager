import { FAKE_DELAY } from '../const';
import { fakeDelay } from '../utils';
import type { IErrorResponse, ISuccessResponse, TApiResponse } from './types';

const API_BASE_URL = 'http://localhost:5173/api';

export const apiFetch = async <T>(endpoint: string, options?: RequestInit): Promise<TApiResponse<T>> => {
  if (FAKE_DELAY) await fakeDelay();

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
