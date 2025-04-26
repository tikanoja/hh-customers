import { HttpMethod } from './types';

export const API_CONFIG = {
  BASE_URL: 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api',
  RESET: {
    URL: 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/reset',
    METHOD: 'POST' as HttpMethod,
  },

  CUSTOMERS: {
    BASE: 'customers',
    LIST: {
      URL: 'customers',
      METHOD: 'GET' as HttpMethod,
    },
    GET_BY_ID: (id: number | string) => ({
      URL: `customers/${id}`,
      METHOD: 'GET' as HttpMethod,
    }),
    CREATE: {
      URL: 'customers',
      METHOD: 'POST' as HttpMethod,
    },
    UPDATE: (id: number | string) => ({
      URL: `customers/${id}`,
      METHOD: 'PUT' as HttpMethod,
    }),
    DELETE: (id: number | string) => ({
      URL: `customers/${id}`,
      METHOD: 'DELETE' as HttpMethod,
    }),
  },

  TRAININGS: {
    BASE: 'trainings',
    LIST: {
      URL: 'trainings',
      METHOD: 'GET' as HttpMethod,
    },
    GET_WITH_CUSTOMERS: {
      URL: 'gettrainings',
      METHOD: 'GET' as HttpMethod,
    },
    CREATE: {
      URL: 'trainings',
      METHOD: 'POST' as HttpMethod,
    },
    DELETE: (id: number | string) => ({
      URL: `trainings/${id}`,
      METHOD: 'DELETE' as HttpMethod,
    }),
  },
};
