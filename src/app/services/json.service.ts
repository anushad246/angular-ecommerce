import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonService {
  private productsData: any[] = [];

  constructor() {}

  /**
   * Add a new product
   */
  AddProduct(data: any): Observable<any> {
    // You can use either local storage or API
    // For API: return this.httpService.post('/products', data);
    const newProduct = { ...data, id: this.generateId() };
    this.productsData.push(newProduct);
    return of(newProduct);
  }

  /**
   * Get all products
   */
  getProducts(): Observable<any[]> {
    // You can use either local storage or API
    // For API: return this.httpService.get('/products');
    return of(this.productsData);
  }

  /**
   * Get a single product by ID
   */
  getProductById(id: string | number): Observable<any> {
    // You can use either local storage or API
    // For API: return this.httpService.get(`/products/${id}`);
    const product = this.productsData.find((p) => p.id === id.toString());
    return of(product);
  }

  /**
   * Delete a product
   */
  deleteProduct(id: string | number): Observable<any> {
    // You can use either local storage or API
    // For API: return this.httpService.delete(`/products/${id}`);
    const index = this.productsData.findIndex(
      (product) => product.id === id.toString()
    );
    if (index > -1) {
      this.productsData.splice(index, 1);
    }
    return of({ success: true });
  }

  /**
   * Update a product
   */
  updateProduct(id: string, data: any): Observable<any> {
    // You can use either local storage or API
    // For API: return this.httpService.put(`/products/${id}`, data);
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
