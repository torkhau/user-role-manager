export interface IErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

export interface ISuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export type TApiResponse<T> = IErrorResponse | ISuccessResponse<T>;
