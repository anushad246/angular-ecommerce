import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, CartItem } from './cart.model';

export const selectCartFeature = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartFeature,
  (state: CartState) => state.items
);

export const selectCartLoading = createSelector(
  selectCartFeature,
  (state: CartState) => state.loading
);

export const selectCartError = createSelector(
  selectCartFeature,
  (state: CartState) => state.error
);

export const selectCartTotal = createSelector(
  selectCartItems,
  (items: CartItem[]) => items.reduce((total, item) => total + item.totalPrice, 0)
);

export const selectCartItemCount = createSelector(
  selectCartItems,
  (items: CartItem[]) => items.reduce((count, item) => count + item.quantity, 0)
);

export const selectCartItemByProductId = (productId: string) =>
  createSelector(selectCartItems, (items) =>
    items.find((item) => item.product.id === productId)
  );

export const selectIsItemInCart = (productId: string) =>
  createSelector(
    selectCartItems,
    (items) => items.some((item) => item.product.id === productId)
  );
