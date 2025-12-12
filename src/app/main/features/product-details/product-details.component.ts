import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { selectSelectedProduct, selectProductsLoading, selectProductsError, selectAllProducts } from 'src/app/store/products/product.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class ProductDetailsComponent implements OnInit {
  // Store Observables
  product$ = this.store.select(selectSelectedProduct);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);
  products$ = this.store.select(selectAllProducts);

  // Local properties for component use
  product: any = null;
  products: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  private destroyRef = inject(DestroyRef);

  constructor(private store: Store) {}

  ngOnInit(): void {

    this.product$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(product => {
        this.product = product;
        console.log('✓ Product data received in component:', product);
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
          console.error('✗ Error loading product:', error);
        }
      });

    this.products$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(products => {
        this.products = products;
        console.log('✓ Products list received in component:', products);
      });
  }

 
  isDataAvailable(): boolean {
    return this.product !== null && !this.loading;
  }
}
