import { createAction, props } from '@ngrx/store';
import { User } from './auth.model';

export const login = createAction(
  '[Auth Page] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: User; accessToken: string; refreshToken: string }>()
);

export const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction(
  '[Auth Page] Logout'
);

export const logoutSuccess = createAction(
  '[Auth API] Logout Success'
);

export const loadUser = createAction(
  '[App Init] Load User'
);

export const loadUserSuccess = createAction(
  '[Auth API] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[Auth API] Load User Failure',
  props<{ error: string }>()
);

// Refresh Token
export const refreshToken = createAction(
  '[Auth] Refresh Token'
);

export const refreshTokenSuccess = createAction(
  '[Auth API] Refresh Token Success',
  props<{ accessToken: string; refreshToken: string }>()
);

export const refreshTokenFailure = createAction(
  '[Auth API] Refresh Token Failure',
  props<{ error: string }>()
);
