import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './add-products.component';

const addProductRoutes: Routes = [
  { path: '', component:AddProductsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(addProductRoutes)],
  exports: [RouterModule]
})
export class AddProductsRoutingModule { }
