import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PRODUCT_DETAILS_ROUTES } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PRODUCT_DETAILS_ROUTES),
    ProductDetailsComponent
  ]
})
export class ProductDetailsModule { }
