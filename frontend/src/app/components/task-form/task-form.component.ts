import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateTaskDto } from '../../models/task.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form (ngSubmit)="onSubmit()" class="task-form">
      <div class="task-form__group">
        <label for="taskTitle" class="task-form__label">
          Nova Tarefa
        </label>
        <div class="task-form__input-group">
          <input
            id="taskTitle"
            type="text"
            [(ngModel)]="taskTitle"
            name="taskTitle"
            placeholder="Digite uma nova tarefa..."
            class="task-form__input"
            [class.task-form__input--error]="showError"
            [disabled]="loading"
            maxlength="255"
            (blur)="validateInput()"
            required
          />
          <button
            type="submit"
            class="btn btn--primary"
            [disabled]="!isFormValid() || loading"
          >
            <span *ngIf="!loading">Adicionar</span>
            <span *ngIf="loading" class="loading-spinner">⟳</span>
          </button>
        </div>
        <div *ngIf="showError" class="task-form__error">
          {{ errorMessage }}
        </div>
      </div>
    </form>
  `,
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Output() createTask = new EventEmitter<CreateTaskDto>();

  taskTitle = '';
  loading = false;
  showError = false;
  errorMessage = '';

  onSubmit(): void {
    if (this.isFormValid()) {
      const newTask: CreateTaskDto = {
        title: this.taskTitle.trim()
      };

      this.createTask.emit(newTask);
      this.resetForm();
    }
  }

  isFormValid(): boolean {
    return this.taskTitle.trim().length > 0;
  }

  validateInput(): void {
    this.showError = false;

    if (this.taskTitle.trim().length === 0) {
      this.showError = true;
      this.errorMessage = 'O título da tarefa é obrigatório';
      return;
    }

    if (this.taskTitle.length > 255) {
      this.showError = true;
      this.errorMessage = 'O título deve ter no máximo 255 caracteres';
      return;
    }
  }

  private resetForm(): void {
    this.taskTitle = '';
    this.showError = false;
    this.errorMessage = '';
  }

  setLoading(loading: boolean): void {
    this.loading = loading;
  }
}
