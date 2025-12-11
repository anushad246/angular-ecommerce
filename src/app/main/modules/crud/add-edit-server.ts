import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Observable, of } from 'rxjs';

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

  constructor(private http: HttpClient, private httpService: HttpService) {}

  /**
   * Add or edit an employee
   */
  AddEdit(data: any): Observable<any> {
    // You can use either local storage or API
    // For API: return this.httpService.post('/employees', data);
    const newEmployee = { ...data, id: this.generateId() };
    this.employeesData.push(newEmployee);
    return of(newEmployee);
  }

  /**
   * Get all employees
   */
  getEmpData(): Observable<any[]> {
    // You can use either local storage or API
    // For API: return this.httpService.get('/employees');
    return of(this.employeesData);
  }

  /**
   * Delete an employee
   */
  getEmpDelete(id: number | string): Observable<any> {
    // You can use either local storage or API
    // For API: return this.httpService.delete(`/employees/${id}`);
    const index = this.employeesData.findIndex(
      (emp) => emp.id === id.toString()
    );
    if (index > -1) {
      this.employeesData.splice(index, 1);
    }
    return of({ success: true });
  }

  /**
   * Update an employee
   */
  updateEmployee(id: string, data: any): Observable<any> {
    // You can use either local storage or API
    // For API: return this.httpService.put(`/employees/${id}`, data);
    const index = this.employeesData.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employeesData[index] = { ...this.employeesData[index], ...data };
    }
    return of(this.employeesData[index]);
  }

  private generateId(): string {
    return Math.random().toString(16).substr(2, 9);
  }
}
