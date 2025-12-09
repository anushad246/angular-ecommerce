import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'app',
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'main',
        loadChildren: () =>
          import('./main/main.module').then((m) => m.MainModule),
      },
    ],
  },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
];
