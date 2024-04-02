import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class JsonServiceAddEdit {
  constructor(private http: HttpClient) {}

  AddEdit(data: any) {
    const apiURL = 'http://localhost:3000/employes';
    return this.http.post(apiURL, data);
  }
}
