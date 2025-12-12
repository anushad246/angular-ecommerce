import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import * as ProductActions from '../products/product.actions';
import { Product } from '../products/product.model';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.httpService.get<Product[]>('/api/products').pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(
              ProductActions.loadProductsFailure({
                error: error.message || 'Failed to load products',
              })
            )
          )
        )
      )
    )
  );

  // Load single product detail
  loadProductDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductDetail),
      switchMap(({ id }) =>
        // TODO: Replace with your actual API endpoint
        this.httpService.get<Product>(`/api/products/${id}`).pipe(
          map((product) =>
            ProductActions.loadProductDetailSuccess({ product })
          ),
          catchError((error) =>
            of(
              ProductActions.loadProductDetailFailure({
                error: error.message || 'Failed to load product details',
              })
            )
          )
        )
      )
    )
  );

  // Add product
  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap(({ product }) =>
        // TODO: Replace with your actual API endpoint
        this.httpService.post<Product>('/api/products', product).pipe(
          map((newProduct) =>
            ProductActions.addProductSuccess({ product: newProduct })
          ),
          catchError((error) =>
            of(
              ProductActions.addProductFailure({
                error: error.message || 'Failed to add product',
              })
            )
          )
        )
      )
    )
  );

  // Update product
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({ product }) =>
        // TODO: Replace with your actual API endpoint
        this.httpService
          .put<Product>(`/api/products/${product.id}`, product)
          .pipe(
            map((updatedProduct) =>
              ProductActions.updateProductSuccess({ product: updatedProduct })
            ),
            catchError((error) =>
              of(
                ProductActions.updateProductFailure({
                  error: error.message || 'Failed to update product',
                })
              )
            )
          )
      )
    )
  );

  // Delete product
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ id }) =>
        // TODO: Replace with your actual API endpoint
        this.httpService.delete<void>(`/api/products/${id}`).pipe(
          map(() => ProductActions.deleteProductSuccess({ id })),
          catchError((error) =>
            of(
              ProductActions.deleteProductFailure({
                error: error.message || 'Failed to delete product',
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private httpService: HttpService
  ) {}
}
