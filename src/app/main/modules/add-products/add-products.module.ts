import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ADD_PRODUCTS_ROUTES } from './add-products-routing.module';
import { AddProductsComponent } from './add-products.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ADD_PRODUCTS_ROUTES),
    AddProductsComponent,
  ],
})
export class AddProductsModule {}
