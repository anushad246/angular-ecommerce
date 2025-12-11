// Staging Environment Configuration
export const environment = {
  name: 'STAGING',
  production: false,
  apiUrl: 'https://staging-api.yourdomain.com',
  apiEndpoints: {
    products: '/products',
    employees: '/employees',
    auth: '/auth'
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
