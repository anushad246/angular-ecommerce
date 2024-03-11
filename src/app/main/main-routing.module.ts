import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,

    children: [
      { path: '', redirectTo: 'product-details', pathMatch: 'full' },
      {
        path: 'add-products',
        loadChildren: () =>
          import('./modules/add-products/add-products.module').then(
            (m) => m.AddProductsModule
          ),
      },
      {
        path: 'product-details',
        loadChildren: () =>
          import('./modules/product-details/product-details.module').then(
            (m) => m.ProductDetailsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
})

export class MainRoutingModule {}
