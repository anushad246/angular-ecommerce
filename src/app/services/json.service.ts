import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonService {
  private productsData: any[] = [];

  constructor() {}

  AddProduct(data: any): Observable<any> {
    const newProduct = { ...data, id: this.generateId() };
    this.productsData.push(newProduct);
    return of(newProduct);
  }

  getProducts(): Observable<any[]> {
    return of(this.productsData);
  }

  getProductById(id: string | number): Observable<any> {
    const product = this.productsData.find((p) => p.id === id.toString());
    return of(product);
  }

  deleteProduct(id: string | number): Observable<any> {
    const index = this.productsData.findIndex(
      (product) => product.id === id.toString()
    );
    if (index > -1) {
      this.productsData.splice(index, 1);
    }
    return of({ success: true });
  }

  updateProduct(id: string, data: any): Observable<any> {
    const index = this.productsData.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.productsData[index] = {
        ...this.productsData[index],
        ...data,
      };
    }
    return of(this.productsData[index]);
  }

  private generateId(): string {
    return Math.random().toString(16).substr(2, 9);
  }
}
