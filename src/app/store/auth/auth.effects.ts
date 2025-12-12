import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import * as AuthActions from '../auth/auth.actions';
import { User } from '../auth/auth.model';

/**
 * Auth Effects
 * Handle side effects like API calls for authentication operations
 * NOTE: This is a template - uncomment and integrate with your HTTP service
 */
@Injectable()
export class AuthEffects {
  // Login effect
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        // TODO: Replace with your actual API endpoint
        this.httpService
          .post<{ user: User; token: string }>('/api/auth/login', {
            email,
            password,
          })
          .pipe(
            map(({ user, token }) => {
              // Store token in localStorage
              localStorage.setItem('token', token);
              return AuthActions.loginSuccess({ user, token });
            }),
            catchError((error) =>
              of(
                AuthActions.loginFailure({
                  error: error.message || 'Login failed',
                })
              )
            )
          )
      )
    )
  );

  // Register effect
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ email, password, name }) =>
        // TODO: Replace with your actual API endpoint
        this.httpService
          .post<{ user: User; token: string }>('/api/auth/register', {
            email,
            password,
            name,
          })
          .pipe(
            map(({ user, token }) => {
              localStorage.setItem('token', token);
              return AuthActions.registerSuccess({ user, token });
            }),
            catchError((error) =>
              of(
                AuthActions.registerFailure({
                  error: error.message || 'Registration failed',
                })
              )
            )
          )
      )
    )
  );

  // Logout effect
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() => {
        // Clear token from localStorage
        localStorage.removeItem('token');
        // TODO: Call logout API endpoint if needed
        return of(AuthActions.logoutSuccess());
      })
    )
  );

  // Load user effect (check if token exists and load user)
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      switchMap(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          return of(
            AuthActions.loadUserFailure({ error: 'No token found' })
          );
        }

        // TODO: Replace with your actual API endpoint
        return this.httpService.get<User>('/api/auth/me').pipe(
          map((user) => AuthActions.loadUserSuccess({ user })),
          catchError((error) =>
            of(
              AuthActions.loadUserFailure({
                error: error.message || 'Failed to load user',
              })
            )
          )
        );
      })
    )
  );

  // Update profile effect
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateProfile),
      mergeMap(({ user }) =>
        // TODO: Replace with your actual API endpoint
        this.httpService.put<User>('/api/auth/profile', user).pipe(
          map((updatedUser) =>
            AuthActions.updateProfileSuccess({ user: updatedUser })
          ),
          catchError((error) =>
            of(
              AuthActions.updateProfileFailure({
                error: error.message || 'Failed to update profile',
              })
            )
          )
        )
      )
    )
  );

  // Reset password effect
  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      mergeMap(({ email }) =>
        // TODO: Replace with your actual API endpoint
        this.httpService
          .post<void>('/api/auth/reset-password', { email })
          .pipe(
            map(() => AuthActions.resetPasswordSuccess()),
            catchError((error) =>
              of(
                AuthActions.resetPasswordFailure({
                  error: error.message || 'Failed to reset password',
                })
              )
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private httpService: HttpService
  ) {}
}
