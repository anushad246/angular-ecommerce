import { ApplicationConfig } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productReducer } from '../products/product.reducer';
import { authReducer } from '../auth/auth.reducer';
import { cartReducer } from '../cart/cart.reducer';


export const ngrxConfig = (): ApplicationConfig => {
  return {
    providers: [
      provideStore({
        products: productReducer,
        auth: authReducer,
        cart: cartReducer,
      }),
      
      provideEffects([]),

      provideStoreDevtools({
        maxAge: 25,
        logOnly: false,
      }),
    ],
  };
};
