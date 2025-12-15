// Production Environment Configuration
export const environment = {
  name: 'PRODUCTION',
  production: true,
  apiUrl: 'https://api.yourdomain.com',
  apiEndpoints: {
    auth: '/auth',
    products: '/api/products',
  },
  cache: {
    enabled: true,
    duration: 3600000
  },
  logging: {
    enabled: false,
    level: 'error'
  },
  features: {
    authentication: true,
    notifications: true,
    analytics: true
  }
};
