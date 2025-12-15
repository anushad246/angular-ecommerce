import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router
  ) {}

  /**
   * Check if user is authenticated
   * If authenticated, allow access to route
   * If not authenticated, redirect to login
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          console.log('✓ Access granted - user is authenticated');
          return true;
        } else {

          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
