import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, finalize } from 'rxjs';

import { Task, CreateTaskDto } from './models/task.interface';
import { TaskService } from './services/task.service';
import { NotificationService } from './services/notification.service';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { NotificationComponent, NotificationMessage } from './components/notification/notification.component';

/**
 * Componente principal da aplicação responsável pelo gerenciamento de tarefas.
 * 
 * Funcionalidades:
 * - Operações CRUD para tarefas
 * - Notificações em tempo real
 * - Gerenciamento de estados de carregamento
 * - Atualizações reativas usando estratégia OnPush
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule,
    TaskListComponent,
    TaskFormComponent,
    NotificationComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Lista de Tarefas';
  tasks: Task[] = [];
  loading = false;
  notification: NotificationMessage | null = null;

  // Subject para gerenciar o ciclo de vida do componente e prevenir vazamentos de memória
  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeToNotifications();
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Inscreve-se nas notificações do serviço para exibir mensagens ao usuário
   */
  private subscribeToNotifications(): void {
    this.notificationService.notification$
      .pipe(takeUntil(this.destroy$))
      .subscribe(notification => {
        this.notification = notification;
        this.cdr.markForCheck();
      });
  }

  /**
   * Carrega a lista inicial de tarefas do backend
   */
  private loadTasks(): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.taskService.getTasks()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.notificationService.showSuccess('Tarefas carregadas com sucesso!');
        },
        error: (error) => {
          console.error('Error loading tasks:', error);
          this.notificationService.showError('Erro ao carregar as tarefas. Tente novamente.');
        }
      });
  }

  /**
   * Manipula a criação de uma nova tarefa
   * @param taskDto - Dados da tarefa a ser criada
   */
  onCreateTask(taskDto: CreateTaskDto): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.taskService.createTask(taskDto)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (newTask) => {
          this.tasks = [newTask, ...this.tasks];
          this.notificationService.showSuccess('Tarefa criada com sucesso!');
        },
        error: (error) => {
          console.error('Error creating task:', error);
          this.notificationService.showError('Erro ao criar a tarefa. Tente novamente.');
        }
      });
  }

  /**
   * Remove uma tarefa da lista
   * @param task - Tarefa a ser removida
   */
  onDeleteTask(task: Task): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.taskService.deleteTask(task.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
          this.notificationService.showSuccess(`Tarefa "${task.title}" removida com sucesso!`);
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          this.notificationService.showError('Erro ao remover a tarefa. Tente novamente.');
        }
      });
  }

  /**
   * Alterna o status de conclusão de uma tarefa
   * @param task - Tarefa a ter o status alterado
   */
  onToggleTaskCompletion(task: Task): void {
    this.loading = true;
    this.cdr.markForCheck();

    const updatedTask = { ...task, completed: !task.completed };

    this.taskService.updateTask(task.id, { title: task.title, completed: !task.completed })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (updated) => {
          const taskIndex = this.tasks.findIndex(t => t.id === task.id);
          if (taskIndex !== -1) {
            this.tasks[taskIndex] = updated;
            this.cdr.markForCheck();
          }
          
          const status = updated.completed ? 'concluída' : 'reaberta';
          this.notificationService.showSuccess(`Tarefa "${updated.title}" ${status}!`);
        },
        error: (error) => {
          console.error('Error updating task:', error);
          this.notificationService.showError('Erro ao atualizar a tarefa. Tente novamente.');
        }
      });
  }
}
