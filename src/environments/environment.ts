// Development Environment Configuration
export const environment = {
  name: 'DEVELOPMENT',
  production: false,
  apiUrl: 'http://localhost:3000',
  apiEndpoints: {
    products: '/products',
    employees: '/employees',
    auth: '/auth'
  },
  cache: {
    enabled: false,
    duration: 0
  },
  logging: {
    enabled: true,
    level: 'debug'
  },
  features: {
    authentication: true,
    notifications: true,
    analytics: false
  }
};
