// Production Environment Configuration
export const environment = {
  name: 'PRODUCTION',
  production: true,
  apiUrl: 'https://api.yourdomain.com',
  apiEndpoints: {
    products: '/products',
    employees: '/employees',
    auth: '/auth'
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
