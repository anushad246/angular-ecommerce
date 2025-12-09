import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonServiceAddEdit {
  private employeesData = [
    {
      id: '1dfd',
      firstName: 'bala',
      lastName: 'krishna',
      email: 'bala34@gmail.com',
      gender: '',
      education: 'Diploma',
      company: 'aimlytics',
    },
    {
      id: '716c',
      firstName: 'manoj',
      lastName: 'kumar',
      email: 'manoj@gmail.com',
      gender: 'male',
      education: 'Diploma',
      company: 'infosis',
    },
    {
      id: '8c7d',
      firstName: 'jaya',
      lastName: 'latha',
      email: 'latha@gmail.com',
      gender: 'female',
      education: 'Intermediate',
      company: 'apollo',
    },
  ];

  constructor(private http: HttpClient) {}

  AddEdit(data: any) {
    const newEmployee = { ...data, id: this.generateId() };
    this.employeesData.push(newEmployee);
    return of(newEmployee);
  }

  getEmpData() {
    return of(this.employeesData);
  }

  getEmpDelete(id: number) {
    const index = this.employeesData.findIndex(
      (emp) => emp.id === id.toString()
    );
    if (index > -1) {
      this.employeesData.splice(index, 1);
    }
    return of({ success: true });
  }

  private generateId(): string {
    return Math.random().toString(16).substr(2, 9);
  }
}
