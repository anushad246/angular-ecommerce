import { Injectable, Signal, computed, effect, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';


@Injectable({
  providedIn: 'root'
})
export class NgRxSignalsService {
  constructor(private store: Store) {}

  /**
   * Convert an Observable selector from NgRx Store to a Signal
   * @param selector$ Observable from store.select()
   * @param initialValue Default value while loading
   * @returns Signal of the selected state
   */
  toSignal<T>(selector$: Observable<T>, initialValue: T): Signal<T> {
    return toSignal(selector$, { initialValue });
  }

  /**
   * Create a computed signal based on multiple signals
   * @param computeFn Function that computes value from signals
   * @returns Computed signal
   */
  createComputed<T>(computeFn: () => T): Signal<T> {
    return computed(computeFn);
  }

  /**
   * Create a signal with auto-tracking effect
   * @param initialValue Default value
   * @returns Signal instance
   */
  createSignal<T>(initialValue: T): Signal<T> & { set: (value: T) => void } {
    return signal(initialValue);
  }

  /**
   * Create an effect that responds to signal changes
   * @param effectFn Function to run when signal changes
   */
  createEffect(effectFn: () => void | (() => void)): void {
    effect(effectFn);
  }

  /**
   * Dispatch an action to the NgRx Store
   * @param action The action to dispatch
   */
  dispatch(action: any): void {
    this.store.dispatch(action);
  }

  /**
   * Select from store and convert to Signal
   * @param selector Selector function
   * @param initialValue Initial value
   * @returns Signal of selected state
   */
  selectAsSignal<T>(selector: (state: any) => T, initialValue: T): Signal<T> {
    return toSignal(this.store.select(selector), { initialValue });
  }
}
