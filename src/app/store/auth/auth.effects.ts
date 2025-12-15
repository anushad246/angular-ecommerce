import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, interval } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  switchMap,
  tap,
  filter,
  exhaustMap,
} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import URLConfig from '../url-config';
import * as AuthActions from '../auth/auth.actions';
import { User } from './auth.model';

@Injectable()
export class AuthEffects {
  private readonly TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000;
  private lastUserLoadTime = 0;
  private readonly USER_LOAD_CACHE_DURATION = 60000; 

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) => {
        const apiUrl = environment.apiUrl + URLConfig.auth.uri;
        const loginUrl = `${apiUrl}${URLConfig.auth.context.login}`;

        return this.http
          .post<any>(loginUrl, {
            username,
            password,
            expiresInMins: 30,
          })
          .pipe(
            tap(({ accessToken, refreshToken, ...user }) => {
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);

              const expirationTime = new Date().getTime() + 30 * 60 * 1000;
              localStorage.setItem(
                'tokenExpiration',
                expirationTime.toString()
              );
            }),
            map(({ accessToken, refreshToken, ...user }) => {
              return AuthActions.loginSuccess({
                user: user as any,
                accessToken,
                refreshToken,
              });
            }),
            catchError((error) => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              return of(
                AuthActions.loginFailure({
                  error: error.error?.message || 'Login failed',
                })
              );
            })
          );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiration');
      }),
      mergeMap(() => {
        return of(AuthActions.logoutSuccess());
      })
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      switchMap(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          return of(AuthActions.loadUserFailure({ error: 'No token found' }));
        }

        if (this.isTokenExpired()) {
          return of(AuthActions.refreshToken());
        }

        // Prevent duplicate API calls within 60 seconds
        const now = new Date().getTime();
        if (now - this.lastUserLoadTime < this.USER_LOAD_CACHE_DURATION) {
          return of();
        }

        this.lastUserLoadTime = now;

        const apiUrl = environment.apiUrl + URLConfig.auth.uri;
        const profileUrl = `${apiUrl}${URLConfig.auth.context.profile}`;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        });

        return this.http.get<User>(profileUrl, { headers }).pipe(

          map((user) => AuthActions.loadUserSuccess({ user })),
          catchError((error) => {


            if (error.status === 401) {
              return of(AuthActions.refreshToken());
            }

            return of(
              AuthActions.loadUserFailure({
                error: error.error?.message || 'Failed to load user',
              })
            );
          })
        );
      })
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(() => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('tokenExpiration');
          return of(
            AuthActions.refreshTokenFailure({ error: 'No refresh token' })
          );
        }

        const apiUrl = environment.apiUrl + URLConfig.auth.uri;
        const refreshUrl = `${apiUrl}${URLConfig.auth.context.tokenRefresh}`;

        return this.http
          .post<any>(refreshUrl, {
            refreshToken,
            expiresInMins: 30,
          })
          .pipe(
            tap(({ accessToken, refreshToken: newRefreshToken }) => {
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', newRefreshToken);

              const expirationTime = new Date().getTime() + 30 * 60 * 1000;
              localStorage.setItem(
                'tokenExpiration',
                expirationTime.toString()
              );


            }),
            map(({ accessToken, refreshToken: newRefreshToken }) =>
              AuthActions.refreshTokenSuccess({
                accessToken,
                refreshToken: newRefreshToken,
              })
            ),
            catchError((error) => {

              // Clear all auth data on refresh failure
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('tokenExpiration');

              return of(
                AuthActions.refreshTokenFailure({
                  error: error.error?.message || 'Token refresh failed',
                })
              );
            })
          );
      })
    )
  );

  autoRefreshToken$ = createEffect(() =>
    interval(30000).pipe(
      filter(() => !!localStorage.getItem('accessToken')),
      filter(() => !this.isTokenExpired() && this.shouldRefreshToken()),
      exhaustMap(() => of(AuthActions.refreshToken()))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private http: HttpClient
  ) {}

  private isTokenExpired(): boolean {
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (!expirationTime) {
      return true;
    }

    const currentTime = new Date().getTime();
    return currentTime > parseInt(expirationTime, 10);
  }

  private shouldRefreshToken(): boolean {
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (!expirationTime) {
      return false;
    }

    const currentTime = new Date().getTime();
    const timeUntilExpiration = parseInt(expirationTime, 10) - currentTime;

    return timeUntilExpiration <= this.TOKEN_REFRESH_THRESHOLD;
  }
}
