import { API_CONFIG } from "./config";

const BASE_URL = API_CONFIG.BASE_URL;

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    // Remove any leading slash from the endpoint to prevent double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    const response = await fetch(`${BASE_URL}/${cleanEndpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },
  
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    // Remove any leading slash from the endpoint to prevent double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    const response = await fetch(`${BASE_URL}/${cleanEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },
  
  put: async <T>(url: string, data: any): Promise<T> => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },
  
  delete: async (url: string): Promise<void> => {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  },
};