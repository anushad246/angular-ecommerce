import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DetailsComponent } from './details/details.component';


export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent, data: { title: 'Employee List' } },
      { path: 'form', component: FormComponent, data: { title: 'Add Employee' } },
      { path: 'form/:id', component: FormComponent, data: { title: 'Edit Employee' } },
      { path: 'details/:id', component: DetailsComponent, data: { title: 'Employee Details' } }
    ]
  }
];
