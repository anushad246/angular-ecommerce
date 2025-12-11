import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Clone the request and add headers
    const clonedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add authorization header if token exists
        ...(this.getAuthToken() && {
          'Authorization': `Bearer ${this.getAuthToken()}`
        })
      }
    });

    if (environment.logging.enabled) {
      console.log('HTTP Request:', clonedRequest);
    }

    return next.handle(clonedRequest).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && environment.logging.enabled) {
          console.log('HTTP Response:', event);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        
        // Handle different error types
        let errorMessage = 'An error occurred';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        
        if (environment.logging.enabled) {
          console.error(errorMessage);
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Helper method to get auth token from localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
