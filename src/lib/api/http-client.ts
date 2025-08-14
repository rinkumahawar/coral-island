import { API_CONFIG } from './config';
import { ApiError, ApiRequestConfig, ApiResponse } from './types';

export class HttpClient {
  private static getHeaders(config: ApiRequestConfig = {}): HeadersInit {
    const headers = new Headers();
    
    // Add default headers
    Object.entries(API_CONFIG.defaultHeaders).forEach(([key, value]) => {
      headers.append(key, value);
    });

    // Add config headers
    if (config.headers) {
      Object.entries(config.headers).forEach(([key, value]) => {
        headers.append(key, value);
      });
    }

    // Add bearer token if available
    if (API_CONFIG.auth.token) {
      headers.append('Authorization', `Bearer ${API_CONFIG.auth.token}`);
    }

    return headers;
  }

  private static async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_CONFIG.baseURL}${endpoint}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
        headers: this.getHeaders(config)
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          response.status,
          data.message || 'An error occurred',
          data
        );
      }

      return {
        data: data as T,
        status: response.status,
        message: 'Success',
        success: true,
        error: false,
        code: response.status,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError(408, 'Request timeout');
      }

      throw new ApiError(500, 'Network error occurred', error);
    }
  }

  public static async get<T>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  public static async post<T>(endpoint: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public static async put<T>(endpoint: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public static async delete<T>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
} 