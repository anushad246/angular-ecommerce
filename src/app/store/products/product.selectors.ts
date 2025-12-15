import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState, Product } from './product.model';

export const selectProductsFeature = createFeatureSelector<ProductsState>('products');

// Base selectors
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

// Derived selectors
export const selectProductById = (id: string) =>
  createSelector(
    selectAllProducts,
    (products: Product[]) => products.find((product) => product.id === id)
  );

export const selectProductsByCategory = (category: string) =>
  createSelector(
    selectAllProducts,
    (products: Product[]) =>
      products.filter((product) => product.category === category)
  );

export const selectInStockProducts = createSelector(
  selectAllProducts,
  (products: Product[]) => products.filter((product) => product.inStock)
);

export const selectProductCount = createSelector(
  selectAllProducts,
  (products: Product[]) => products.length
);

// Memoized combined selectors for better performance
export const selectProductsWithLoadingState = createSelector(
  selectAllProducts,
  selectProductsLoading,
  selectProductsError,
  (items, loading, error) => ({ items, loading, error })
);

export const selectInStockProductCount = createSelector(
  selectInStockProducts,
  (products: Product[]) => products.length
);

export const selectProductsByPriceRange = (minPrice: number, maxPrice: number) =>
  createSelector(
    selectAllProducts,
    (products: Product[]) =>
      products.filter((p) => p.price >= minPrice && p.price <= maxPrice)
  );
