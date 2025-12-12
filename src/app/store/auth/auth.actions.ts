import { createAction, props } from '@ngrx/store';
import { User } from './auth.model';

// Login
export const login = createAction(
  '[Auth Page] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: User; token: string }>()
);

export const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ error: string }>()
);

// Register
export const register = createAction(
  '[Auth Page] Register',
  props<{ email: string; password: string; name: string }>()
);

export const registerSuccess = createAction(
  '[Auth API] Register Success',
  props<{ user: User; token: string }>()
);

export const registerFailure = createAction(
  '[Auth API] Register Failure',
  props<{ error: string }>()
);

// Logout
export const logout = createAction(
  '[Auth Page] Logout'
);

export const logoutSuccess = createAction(
  '[Auth API] Logout Success'
);

// Load User (Check if token exists)
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

// Update Profile
export const updateProfile = createAction(
  '[Auth Page] Update Profile',
  props<{ user: Partial<User> }>()
);

export const updateProfileSuccess = createAction(
  '[Auth API] Update Profile Success',
  props<{ user: User }>()
);

export const updateProfileFailure = createAction(
  '[Auth API] Update Profile Failure',
  props<{ error: string }>()
);

// Reset Password
export const resetPassword = createAction(
  '[Auth Page] Reset Password',
  props<{ email: string }>()
);

export const resetPasswordSuccess = createAction(
  '[Auth API] Reset Password Success'
);

export const resetPasswordFailure = createAction(
  '[Auth API] Reset Password Failure',
  props<{ error: string }>()
);
