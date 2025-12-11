import { bootstrapApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app-routing.module';
import { HttpConfigInterceptor } from './app/services/http.interceptor';
import { environment } from './environments/environment';

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
  .catch(err => console.error(err));
