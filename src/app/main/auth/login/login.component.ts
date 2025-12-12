import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { selectUser, selectIsAuthenticated, selectAuthLoading, selectAuthError } from 'src/app/store/auth/auth.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class LoginComponent implements OnInit {
  // Store Observables
  user$ = this.store.select(selectUser);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  // Local properties for component logic
  user: any = null;
  isAuthenticated: boolean = false;
  loading: boolean = false;
  error: string | null = null;

  private destroyRef = inject(DestroyRef);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        this.user = user;
        console.log('✓ User data received:', user);
        if (user) {
          console.log('  - Email:', user.email);
          console.log('  - Role:', user.role);
          console.log('  - Name:', user.name || 'N/A');
        }
      });

    this.isAuthenticated$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(isAuth => {
        this.isAuthenticated = isAuth;
        console.log('✓ Authentication status:', isAuth);
      });

    this.loading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(loading => {
        this.loading = loading;
        console.log('✓ Loading state:', loading);
      });

    this.error$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(error => {
        this.error = error;
        if (error) {
          console.error('✗ Authentication error:', error);
        }
      });
  }


  isUserLoggedIn(): boolean {
    return this.isAuthenticated && this.user !== null;
  }


  isAdminUser(): boolean {
    return this.user?.role === 'admin';
  }
}
