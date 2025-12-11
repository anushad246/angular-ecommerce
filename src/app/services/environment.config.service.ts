import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * Service to access environment-specific configuration throughout the application
 * Provides typed access to environment variables with getter methods
 */
@Injectable({
  providedIn: 'root',
})
export class EnvironmentConfigService {
  /**
   * Get the base API URL for the current environment
   */
  get apiUrl(): string {
    return environment.apiUrl;
  }

  /**
   * Get the API endpoint path
   */
  getEndpoint(key: keyof typeof environment.apiEndpoints): string {
    return environment.apiEndpoints[key];
  }

  /**
   * Get complete API endpoint URL
   */
  getFullApiUrl(key: keyof typeof environment.apiEndpoints): string {
    return `${this.apiUrl}${this.getEndpoint(key)}`;
  }

  /**
   * Check if application is in production mode
   */
  get isProduction(): boolean {
    return environment.production;
  }

  /**
   * Check if logging is enabled
   */
  get isLoggingEnabled(): boolean {
    return environment.logging.enabled;
  }

  /**
   * Get logging level
   */
  get loggingLevel(): string {
    return environment.logging.level;
  }

  /**
   * Check if caching is enabled
   */
  get isCachingEnabled(): boolean {
    return environment.cache.enabled;
  }

  /**
   * Get cache duration in milliseconds
   */
  get cacheDuration(): number {
    return environment.cache.duration;
  }

  /**
   * Check if a feature is enabled
   */
  isFeatureEnabled(featureName: keyof typeof environment.features): boolean {
    return environment.features[featureName];
  }

  /**
   * Get all features status
   */
  get features() {
    return environment.features;
  }

  /**
   * Get all environment configuration
   */
  get config() {
    return environment;
  }
}
