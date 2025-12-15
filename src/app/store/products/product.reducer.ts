import { createReducer, on } from '@ngrx/store';
import { ProductsState, Product } from './product.model';
import * as ProductActions from './product.actions';

// Helper functions for common state mutations
const setLoading = (state: ProductsState): ProductsState => ({
  ...state,
  loading: true,
  error: null,
});

const setSuccess = (state: ProductsState): ProductsState => ({
  ...state,
  loading: false,
  error: null,
});

const setError =
  (error: string) =>
  (state: ProductsState): ProductsState => ({
    ...state,
    loading: false,
    error,
  });

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 79.99,
    image: 'https://via.placeholder.com/300x300?text=Headphones',
    category: 'electronics',
    inStock: true,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking capabilities',
    price: 199.99,
    image: 'https://via.placeholder.com/300x300?text=SmartWatch',
    category: 'watches',
    inStock: true,
    rating: 4.8,
    reviews: 256,
  },
  {
    id: '3',
    name: 'USB-C Cable',
    description: 'Durable 2-meter USB-C charging and data transfer cable',
    price: 12.99,
    image: 'https://via.placeholder.com/300x300?text=Cable',
    category: 'electronics',
    inStock: true,
    rating: 4.2,
    reviews: 512,
  },
];

export const initialProductsState: ProductsState = {
  items: sampleProducts,
  loading: false,
  error: null,
  selectedProduct: null,
};

export const productReducer = createReducer(
  initialProductsState,

  // Load Products
  on(ProductActions.loadProducts, setLoading),

  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...setSuccess(state),
    items: products,
  })),

  on(ProductActions.loadProductsFailure, (state, { error }) =>
    setError(error)(state)
  ),

  // Load Product Detail
  on(ProductActions.loadProductDetail, setLoading),

  on(ProductActions.loadProductDetailSuccess, (state, { product }) => ({
    ...setSuccess(state),
    selectedProduct: product,
  })),

  on(ProductActions.loadProductDetailFailure, (state, { error }) =>
    setError(error)(state)
  ),

  // Add Product
  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...setSuccess(state),
    items: [...state.items, product],
  })),

  on(ProductActions.addProductFailure, (state, { error }) =>
    setError(error)(state)
  ),

  // Update Product
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...setSuccess(state),
    items: state.items.map((p) => (p.id === product.id ? product : p)),
    selectedProduct:
      state.selectedProduct?.id === product.id
        ? product
        : state.selectedProduct,
  })),

  on(ProductActions.updateProductFailure, (state, { error }) =>
    setError(error)(state)
  ),

  // Delete Product
  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...setSuccess(state),
    items: state.items.filter((p) => p.id !== id),
  })),

  on(ProductActions.deleteProductFailure, (state, { error }) =>
    setError(error)(state)
  ),

  // Clear Selected Product
  on(ProductActions.clearSelectedProduct, (state) => ({
    ...state,
    selectedProduct: null,
  }))
);
