import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import URLConfig from '../../store/url-config';

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + URLConfig.auth.uri;

  constructor(private http: HttpClient) {}

  /**
   * Login with username and password
   * Called from auth.effects.ts
   */
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}${URLConfig.auth.context.login}`, {
        username,
        password,
        expiresInMins: 30,
      })
      .pipe(
        catchError((error) => {

          return throwError(
            () => new Error(error.error?.message || 'Login failed')
          );
        })
      );
  }

  /**
   * Get current authenticated user
   * Called from auth.effects.ts
   */
  getCurrentUser(): Observable<AuthUser> {
    return this.http
      .get<AuthUser>(`${this.apiUrl}${URLConfig.auth.context.profile}`)
      .pipe(
        catchError((error) => {

          return throwError(
            () => new Error(error.error?.message || 'Failed to get user')
          );
        })
      );
  }

  /**
   * Refresh access token
   * Called from auth.effects.ts
   */
  refreshAccessToken(refreshToken: string): Observable<RefreshTokenResponse> {
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http
      .post<RefreshTokenResponse>(
        `${this.apiUrl}${URLConfig.auth.context.tokenRefresh}`,
        {
          refreshToken,
          expiresInMins: 30,
        }
      )
      .pipe(
        catchError((error) => {

          return throwError(() => new Error('Token refresh failed'));
        })
      );
  }

  /**
   * Token management methods (used by effects and interceptor)
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
