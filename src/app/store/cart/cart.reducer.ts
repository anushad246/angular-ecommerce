import { createReducer, on } from '@ngrx/store';
import { CartState, CartItem } from './cart.model';
import * as CartActions from './cart.actions';

export const initialCartState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialCartState,

  on(CartActions.addToCart, (state, { product, quantity }) => {
    const existingItem = state.items.find((item) => item.product.id === product.id);
    
    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                totalPrice: (item.quantity + quantity) * product.price,
              }
            : item
        ),
      };
    }

    return {
      ...state,
      items: [
        ...state.items,
        {
          product,
          quantity,
          totalPrice: quantity * product.price,
        },
      ],
    };
  }),

  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter((item) => item.product.id !== productId),
  })),

  on(CartActions.updateCartQuantity, (state, { productId, quantity }) => {
    if (quantity <= 0) {
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== productId),
      };
    }

    return {
      ...state,
      items: state.items.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
              totalPrice: quantity * item.product.price,
            }
          : item
      ),
    };
  }),

  on(CartActions.clearCart, () => initialCartState),

  on(CartActions.loadCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CartActions.loadCartSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
  })),

  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
