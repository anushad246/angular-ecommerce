import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  switchMap,
  debounceTime,
} from 'rxjs/operators';
import { HttpService } from '../http.service';
import * as ProductActions from '../products/product.actions';
import { Product } from '../products/product.model';
import URLConfig from '../url-config';

@Injectable()
export class ProductEffects {
  private readonly handleError = (errorMessage: string) => (error: any) =>
    of(
      ProductActions.loadProductsFailure({
        error: error?.message || errorMessage,
      })
    );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      debounceTime(300),
      mergeMap(() =>
        this.httpService
          .get<Product[]>(URLConfig.products.context.getAllProducts)
          .pipe(
            map((products) => ProductActions.loadProductsSuccess({ products })),
            catchError(this.handleError('Failed to load products'))
          )
      )
    )
  );

  // Load single product detail
  loadProductDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductDetail),
      switchMap(({ id }) =>
        this.httpService
          .get<Product>(`${URLConfig.products.context.getProductById}/${id}`)
          .pipe(
            map((product) =>
              ProductActions.loadProductDetailSuccess({ product })
            ),
            catchError(this.handleError('Failed to load product details'))
          )
      )
    )
  );

  // Add product
  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap(({ product }) =>
        this.httpService
          .post<Product>(URLConfig.products.context.createProduct, product)
          .pipe(
            map((newProduct) =>
              ProductActions.addProductSuccess({ product: newProduct })
            ),
            catchError(this.handleError('Failed to add product'))
          )
      )
    )
  );

  // Update product
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({ product }) =>
        this.httpService
          .put<Product>(
            `${URLConfig.products.context.updateProduct}/${product.id}`,
            product
          )
          .pipe(
            map((updatedProduct) =>
              ProductActions.updateProductSuccess({ product: updatedProduct })
            ),
            catchError(this.handleError('Failed to update product'))
          )
      )
    )
  );

  // Delete product
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ id }) =>
        this.httpService
          .delete<void>(`${URLConfig.products.context.deleteProduct}/${id}`)
          .pipe(
            map(() => ProductActions.deleteProductSuccess({ id })),
            catchError(this.handleError('Failed to delete product'))
          )
      )
    )
  );

  constructor(private actions$: Actions, private httpService: HttpService) {}
}
