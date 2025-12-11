import { Routes } from '@angular/router';
import { CrudComponent } from './crud.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { AddEditComponent } from './add-edit/add-edit.component';

export const CRUD_ROUTES: Routes = [
  {
    path: '',
    component: CrudComponent,

    children: [
      { path: '', redirectTo: 'emp-details', pathMatch: 'full' },
      { path: 'emp-details', component: EmpDetailsComponent },
      { path: 'add-update', component: AddEditComponent }
    ],
  },
];
