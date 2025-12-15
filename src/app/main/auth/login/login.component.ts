import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from 'src/app/store/auth/auth.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as AuthActions from 'src/app/store/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

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
  private fb = inject(FormBuilder);

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();

    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      this.user = user;
      if (user) {
        console.log('  - Email:', user.email);
      }
    });

    this.isAuthenticated$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
        if (isAuth) {
          this.router.navigate(['/app/main/product-details']);
        }
      });

    this.loading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loading) => {
        this.loading = loading;
        console.log('✓ Loading state:', loading);
      });

    this.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((error) => {
      this.error = error;
      if (error) {
      }
    });
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      username: ['emilys', [Validators.required, Validators.minLength(3)]],
      password: ['emilyspass', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    this.store.dispatch(AuthActions.login({ username, password }));
  }

  isUserLoggedIn(): boolean {
    return this.isAuthenticated && this.user !== null;
  }

  getControl(name: string) {
    return this.loginForm.get(name);
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (!control || !control.errors) {
      return '';
    }

    if (control.hasError('required')) {
      return `${controlName} is required`;
    }
    if (control.hasError('minlength')) {
      return `${controlName} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }
}
