import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

export const APP_ROUTES: Routes = [
  // Login route - accessible without authentication
  {
    path: 'login',
    loadComponent: () =>
      import('./main/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  
  // Protected routes - require authentication
  {
    path: 'app',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'main',
        loadChildren: () =>
          import('./main/main.module').then((m) => m.MainModule),
      },
    ],
  },
  
  // Default route - redirect to app (will be protected by AuthGuard)
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  
  // Wildcard route - redirect to app
  { path: '**', redirectTo: 'app' },
];
