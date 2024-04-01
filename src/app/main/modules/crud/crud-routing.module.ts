import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud.component';

const CrudRoutes: Routes = [
  {
    path: '',
    component: CrudComponent,

    // children: [
    //   { path: '', redirectTo: 'product-details', pathMatch: 'full' },
    //   {
    //     path: 'add-edit',
    //     loadChildren: () =>
    //       import('./').then(
    //         (m) => m.AddProductsModule
    //       ),
    //   },
    // ],
  },
];




@NgModule({
  imports: [RouterModule.forChild(CrudRoutes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
