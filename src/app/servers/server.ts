

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class JsonService {
  private productsData = [
    {
      "id": "de2b",
      "productTitle": "chk",
      "description": "dsssssss",
      "ManufacturerName": " vgtvgv",
      "manufacturerBrand": "dell",
      "stocks": "10",
      "orders": "2",
      "price": "600",
      "discount": "30",
      "productCategory": "appliances",
      "visibility": "hidden",
      "status": "draft",
      "shortDescription": "ddddddd",
      "dateRange": {
        "startDate": "2024-03-19T18:30:00.000Z",
        "endDate": "2024-03-22T18:30:00.000Z"
      }
    }
  ];

  constructor(private http: HttpClient) {}

  AddProduct(data: any) {
    const newProduct = { ...data, id: this.generateId() };
    this.productsData.push(newProduct);
    return of(newProduct);
  }

  getProductsData() {
    return of(this.productsData);
  }

  private generateId(): string {
    return Math.random().toString(16).substr(2, 9);
  }
}
