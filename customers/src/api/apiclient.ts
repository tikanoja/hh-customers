import { HttpMethod } from './types';
import { API_CONFIG } from './config';

interface RequestOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
}

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const apiClient = {
  request<T = any>(endpoint: string, options: RequestOptions = {}) {
    const { method = 'GET', body, headers } = options;
    return fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    }).then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`API error ${response.status}: ${text}`);
        });
      }

      if (response.status === 204) {
        return {} as T;
      }

      return response.json();
    });
  },

  get<T = any>(endpoint: string) {
    return apiClient.request<T>(endpoint, { method: 'GET' });
  },

  post<T = any>(endpoint: string, body: any) {
    return apiClient.request<T>(endpoint, { method: 'POST', body });
  },

  put<T = any>(endpoint: string, body: any) {
    return apiClient.request<T>(endpoint, { method: 'PUT', body });
  },

  delete<T = any>(endpoint: string) {
    return apiClient.request<T>(endpoint, { method: 'DELETE' });
  },
};
