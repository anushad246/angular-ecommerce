import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  responseType?: any;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Perform GET request
   */
  get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.get<T>(url, options);
  }

  post<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.post<T>(url, body, options);
  }


  put<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.put<T>(url, body, options);
  }

  /**
   * Perform PATCH request
   */
  patch<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.patch<T>(url, body, options);
  }

  /**
   * Perform DELETE request
   */
  delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.delete<T>(url, options);
  }

  /**
   * Set authorization token
   */
  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   * Get authorization token
   */
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Clear authorization token
   */
  clearAuthToken(): void {
    localStorage.removeItem('authToken');
  }
}
