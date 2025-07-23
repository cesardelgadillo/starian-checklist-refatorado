import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="task-list">
      <h2 class="task-list__title">Tarefas</h2>
      
      <div *ngIf="tasks.length === 0" class="task-list__empty">
        <p>Nenhuma tarefa encontrada.</p>
      </div>
      
      <ul *ngIf="tasks.length > 0" class="task-list__items">
        <li 
          *ngFor="let task of tasks; trackBy: trackByTaskId" 
          class="task-item"
          [class.task-item--completed]="task.completed"
        >
          <div class="task-item__content">
            <span 
              class="task-item__title"
              [class.task-item__title--completed]="task.completed"
            >
              {{ task.title }}
            </span>
            <span class="task-item__status">
              {{ task.completed ? 'Concluída' : 'Pendente' }}
            </span>
          </div>
          
          <div class="task-item__actions">
            <button 
              *ngIf="!task.completed"
              (click)="onToggleComplete(task)"
              class="btn btn--success"
              [disabled]="loading"
              title="Marcar como concluída"
            >
              ✓ Concluir
            </button>
            
            <button 
              *ngIf="task.completed"
              (click)="onToggleComplete(task)"
              class="btn btn--warning"
              [disabled]="loading"
              title="Marcar como pendente"
            >
              ↻ Reabrir
            </button>
            
            <button 
              (click)="onDelete(task)"
              class="btn btn--danger"
              [disabled]="loading"
              title="Remover tarefa"
            >
              ✕ Remover
            </button>
          </div>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() loading = false;

  @Output() deleteTask = new EventEmitter<Task>();
  @Output() toggleComplete = new EventEmitter<Task>();

  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }

  onDelete(task: Task): void {
    if (confirm(`Tem certeza que deseja remover a tarefa "${task.title}"?`)) {
      this.deleteTask.emit(task);
    }
  }

  onToggleComplete(task: Task): void {
    this.toggleComplete.emit(task);
  }
}
