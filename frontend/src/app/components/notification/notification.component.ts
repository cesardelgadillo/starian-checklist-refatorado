import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NotificationMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      *ngIf="notification" 
      class="notification"
      [ngClass]="'notification--' + notification.type"
    >
      <div class="notification__icon">
        <span>{{ getIcon() }}</span>
      </div>
      <div class="notification__content">
        {{ notification.message }}
      </div>
    </div>
  `,
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() notification: NotificationMessage | null = null;

  getIcon(): string {
    if (!this.notification) return '';
    
    switch (this.notification.type) {
      case 'success': return '✓';
      case 'error': return '✗';
      case 'warning': return '⚠';
      default: return 'i';
    }
  }
}
