import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);

  getNotifications(): Observable<Notification[]> {
    return this.notifications$.asObservable();
  }

  show(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration: number = 3000
  ) {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      duration,
    };

    const current = this.notifications$.value;
    this.notifications$.next([...current, notification]);

    if (duration) {
      setTimeout(() => this.remove(notification.id), duration);
    }
  }

  remove(id: string) {
    const current = this.notifications$.value;
    this.notifications$.next(current.filter((n) => n.id !== id));
  }

  clear() {
    this.notifications$.next([]);
  }
}
