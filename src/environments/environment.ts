// Development Environment Configuration
export const environment = {
  name: 'DEVELOPMENT',
  production: false,
  apiUrl: 'https://dummyjson.com',
  apiEndpoints: {
    auth: '/auth',
    products: '/api/products',
  },
  cache: {
    enabled: true,
    duration: 60000
  },
  logging: {
    enabled: false,
    level: 'error'
  },
  features: {
    authentication: true,
    notifications: true,
    analytics: false
  }
};
