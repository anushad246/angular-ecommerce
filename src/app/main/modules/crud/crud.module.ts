import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CRUD_ROUTES } from './crud-routing.module';
import { CrudComponent} from './crud.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import {MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TestComponentComponent } from './test-component/test-component.component';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(CRUD_ROUTES),
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    CrudComponent,
    AddEditComponent,
    EmpDetailsComponent,
    TestComponentComponent
  ]
})
export class CrudModule { }
