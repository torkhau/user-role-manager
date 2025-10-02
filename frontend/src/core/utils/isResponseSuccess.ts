import type { TApiResponse, ISuccessResponse } from '../api/types';

export const isResponseSuccess = <T>(res: TApiResponse<T>): res is ISuccessResponse<T> => {
  return res.success === true;
};
