import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { NotificationMessage } from '../components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<NotificationMessage | null>(null);

  constructor() {}

  /**
   * Observable para componentes se inscreverem nas notificações
   */
  get notification$(): Observable<NotificationMessage | null> {
    return this.notificationSubject.asObservable();
  }

  /**
   * Mostra uma notificação de sucesso
   */
  showSuccess(message: string, duration: number = 3000): void {
    this.show({
      type: 'success',
      message,
      duration
    });
  }

  /**
   * Mostra uma notificação de erro
   */
  showError(message: string, duration: number = 5000): void {
    this.show({
      type: 'error',
      message,
      duration
    });
  }

  /**
   * Mostra uma notificação de aviso
   */
  showWarning(message: string, duration: number = 4000): void {
    this.show({
      type: 'warning',
      message,
      duration
    });
  }

  /**
   * Mostra uma notificação informativa
   */
  showInfo(message: string, duration: number = 3000): void {
    this.show({
      type: 'info',
      message,
      duration
    });
  }

  /**
   * Mostra uma notificação customizada
   */
  private show(notification: NotificationMessage): void {
    this.notificationSubject.next(notification);

    // Auto-remove a notificação após o tempo especificado
    if (notification.duration && notification.duration > 0) {
      timer(notification.duration).subscribe(() => {
        this.clear();
      });
    }
  }

  /**
   * Remove a notificação atual
   */
  clear(): void {
    this.notificationSubject.next(null);
  }
}
