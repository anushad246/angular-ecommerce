import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'product-details', pathMatch: 'full' },
      {
        path: 'add-products',
        loadChildren: () =>
          import('./features/add-products/add-products.module').then(
            (m) => m.AddProductsModule
          ),
      },
      {
        path: 'product-details',
        loadChildren: () =>
          import('./features/product-details/product-details.module').then(
            (m) => m.ProductDetailsModule
          ),
      },
      {
        path: 'basic-crud',
        loadChildren: () =>
          import('./features/crud/crud.module').then((m) => m.CrudModule),
      },
    ],
  },
];
