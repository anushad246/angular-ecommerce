import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './product.model';

export const selectProductsFeature = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.items
);

export const selectProductsLoading = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.error
);

export const selectSelectedProduct = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.selectedProduct
);

export const selectProductById = (id: string) =>
  createSelector(selectAllProducts, (products) =>
    products.find((product) => product.id === id)
  );

export const selectProductsByCategory = (category: string) =>
  createSelector(selectAllProducts, (products) =>
    products.filter((product) => product.category === category)
  );

export const selectInStockProducts = createSelector(
  selectAllProducts,
  (products) => products.filter((product) => product.inStock)
);

export const selectProductCount = createSelector(
  selectAllProducts,
  (products) => products.length
);
