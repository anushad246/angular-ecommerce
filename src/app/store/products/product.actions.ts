import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';

// Load Products
export const loadProducts = createAction(
  '[Product Page] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Product API] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product API] Load Products Failure',
  props<{ error: string }>()
);

// Load Single Product
export const loadProductDetail = createAction(
  '[Product Detail Page] Load Product Detail',
  props<{ id: string }>()
);

export const loadProductDetailSuccess = createAction(
  '[Product API] Load Product Detail Success',
  props<{ product: Product }>()
);

export const loadProductDetailFailure = createAction(
  '[Product API] Load Product Detail Failure',
  props<{ error: string }>()
);

// Add Product
export const addProduct = createAction(
  '[Product Admin] Add Product',
  props<{ product: Omit<Product, 'id'> }>()
);

export const addProductSuccess = createAction(
  '[Product API] Add Product Success',
  props<{ product: Product }>()
);

export const addProductFailure = createAction(
  '[Product API] Add Product Failure',
  props<{ error: string }>()
);

// Update Product
export const updateProduct = createAction(
  '[Product Admin] Update Product',
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  '[Product API] Update Product Success',
  props<{ product: Product }>()
);

export const updateProductFailure = createAction(
  '[Product API] Update Product Failure',
  props<{ error: string }>()
);

// Delete Product
export const deleteProduct = createAction(
  '[Product Admin] Delete Product',
  props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product API] Delete Product Success',
  props<{ id: string }>()
);

export const deleteProductFailure = createAction(
  '[Product API] Delete Product Failure',
  props<{ error: string }>()
);

// Clear Selected Product
export const clearSelectedProduct = createAction(
  '[Product Detail] Clear Selected Product'
);
