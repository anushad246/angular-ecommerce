import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductsRoutingModule } from './add-products-routing.module';
import { AddProductsComponent } from './add-products.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [AddProductsComponent],
  imports: [
    CommonModule,
    AddProductsRoutingModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule
  ],
})
export class AddProductsModule {}
