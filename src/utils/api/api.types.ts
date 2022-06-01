export enum ResponseCode {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  PERMISSION = 403,
  SERVER_ERROR = 500
}

export interface ResponseBase<T> {
  code: ResponseCode;
  success: boolean;
  message?: string;

  data: T;
}

export interface DataResponseError {
  message: string;
  code: ResponseCode;
  success: string;

  error: string;
  status: number;
  path: string;
}
