

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class JsonService {
  constructor(private http: HttpClient) {}

  AddProduct(data: any) {
    const apiURL = 'http://localhost:3000/posts';
    return this.http.post(apiURL, data);
  }
}
