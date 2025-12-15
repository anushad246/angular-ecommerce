// Staging Environment Configuration
export const environment = {
  name: 'STAGING',
  production: false,
  apiUrl: 'https://staging-api.yourdomain.com',
  apiEndpoints: {
    auth: '/auth',
    products: '/api/products',
  },
  cache: {
    enabled: true,
    duration: 1800000
  },
  logging: {
    enabled: true,
    level: 'info'
  },
  features: {
    authentication: true,
    notifications: true,
    analytics: true
  }
};
