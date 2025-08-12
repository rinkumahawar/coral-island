export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  data?: any;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestConfig extends RequestInit {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: BodyInit | null;
} 

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error: boolean;
  code: number;
}
