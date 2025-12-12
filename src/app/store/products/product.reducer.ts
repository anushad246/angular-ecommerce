import { createReducer, on } from '@ngrx/store';
import { ProductsState } from './product.model';
import * as ProductActions from './product.actions';

export const initialProductsState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

export const productReducer = createReducer(
  initialProductsState,

  // Load Products
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    items: products,
    loading: false,
    error: null,
  })),

  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load Product Detail
  on(ProductActions.loadProductDetail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.loadProductDetailSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    loading: false,
    error: null,
  })),

  on(ProductActions.loadProductDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Product
  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state,
    items: [...state.items, product],
    loading: false,
    error: null,
  })),

  on(ProductActions.addProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Product
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    items: state.items.map((p) => (p.id === product.id ? product : p)),
    selectedProduct:
      state.selectedProduct?.id === product.id ? product : state.selectedProduct,
    loading: false,
    error: null,
  })),

  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Product
  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((p) => p.id !== id),
    loading: false,
    error: null,
  })),

  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Clear Selected Product
  on(ProductActions.clearSelectedProduct, (state) => ({
    ...state,
    selectedProduct: null,
  }))
);
