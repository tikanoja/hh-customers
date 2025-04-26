import { API_CONFIG } from "./config";

const BASE_URL = API_CONFIG.BASE_URL;

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    const response = await fetch(`${BASE_URL}/${cleanEndpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },
  
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    // remove leading slashes if present
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
    // check if the URL is a full URL or a relative one and fix iws needed
    const isFullUrl = url.startsWith('http://') || url.startsWith('https://');
    const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
    const fullUrl = isFullUrl ? url : `${BASE_URL}/${cleanUrl}`;
    
    console.log('Making DELETE request to:', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  },
};