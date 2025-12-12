import { bootstrapApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app-routing.module';
import { HttpConfigInterceptor } from './app/services/http.interceptor';
import { environment } from './environments/environment';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productReducer } from './app/store/products/product.reducer';
import { authReducer } from './app/store/auth/auth.reducer';
import { cartReducer } from './app/store/cart/cart.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    // NgRx Store Configuration
    provideStore({
      products: productReducer,
      auth: authReducer,
      cart: cartReducer,
    }),
    provideEffects([]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
})
  .then((appRef) => {
    // Log which environment is being triggered
    console.log('========================================');
    console.log(`✓ Environment: ${environment.name}`);
    console.log(`✓ Production Mode: ${environment.production}`);
    console.log(`✓ API URL: ${environment.apiUrl}`);
    console.log(`✓ Logging Level: ${environment.logging.level}`);
    console.log('========================================');
  })
  .catch((err) => console.error(err));
