import { createReducer, on } from '@ngrx/store';
import { ProductsState, Product } from './product.model';
import * as ProductActions from './product.actions';

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
