import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.model';

export const selectAuthFeature = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.user
);

export const selectToken = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.accessToken
);

export const selectAccessToken = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.accessToken
);

export const selectRefreshToken = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.refreshToken
);

export const selectIsAuthenticated = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthLoading = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.error
);

export const selectUserRole = createSelector(
  selectUser,
  (user) => null 
);

export const selectIsAdmin = createSelector(
  selectUserRole,
  (role) => false 
);

export const selectUserEmail = createSelector(
  selectUser,
  (user) => user?.email || null
);

