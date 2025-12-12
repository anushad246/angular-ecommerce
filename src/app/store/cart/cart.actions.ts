import { createAction, props } from '@ngrx/store';
import { Product } from '../products/product.model';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product; quantity: number }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: string }>()
);

export const updateCartQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: string; quantity: number }>()
);

export const clearCart = createAction(
  '[Cart] Clear Cart'
);

export const loadCart = createAction(
  '[Cart] Load Cart'
);

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: any[] }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: string }>()
);
