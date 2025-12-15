import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
})
export class AppComponent implements OnInit {
  title = 'ecommerce';

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Check if user has a token on app initialization
    // If yes, load user data; if no, redirect to login via guard
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.store.dispatch(AuthActions.loadUser());
    }
  }
}
