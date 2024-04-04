import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const CrudRoutes: Routes = [
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


@NgModule({
  imports: [RouterModule.forChild(CrudRoutes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
