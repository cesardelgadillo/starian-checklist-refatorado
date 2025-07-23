import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { Task, CreateTaskDto, UpdateTaskDto, TasksResponse, TaskResponse } from '../models/task.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = `${environment.apiUrl}/api/tasks`;

  constructor(private http: HttpClient) {}

  /**
   * Busca todas as tarefas
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<TasksResponse | Task[]>(this.apiUrl).pipe(
      map((response: TasksResponse | Task[]) => {
        return Array.isArray(response) ? response : response.data || [];
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Busca uma tarefa específica por ID
   */
  getTask(id: number): Observable<Task> {
    return this.http.get<TaskResponse | Task>(`${this.apiUrl}/${id}`).pipe(
      map((response: TaskResponse | Task) => {
        return 'data' in response ? response.data : response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Cria uma nova tarefa
   */
  createTask(task: CreateTaskDto): Observable<Task> {
    return this.http.post<TaskResponse | Task>(this.apiUrl, task).pipe(
      map((response: TaskResponse | Task) => {
        return 'data' in response ? response.data : response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Atualiza uma tarefa existente
   */
  updateTask(id: number, task: UpdateTaskDto): Observable<Task> {
    return this.http.put<TaskResponse | Task>(`${this.apiUrl}/${id}`, task).pipe(
      map((response: TaskResponse | Task) => {
        return 'data' in response ? response.data : response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Remove uma tarefa
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Alterna o status de conclusão de uma tarefa
   */
  toggleTaskCompletion(id: number, completed: boolean): Observable<Task> {
    return this.updateTask(id, { completed });
  }

  /**
   * Tratamento centralizado de erros
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro inesperado';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro do cliente: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      switch (error.status) {
        case 400:
          errorMessage = 'Dados inválidos fornecidos';
          break;
        case 404:
          errorMessage = 'Tarefa não encontrada';
          break;
        case 422:
          errorMessage = error.error?.message || 'Dados de validação inválidos';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor';
          break;
        default:
          errorMessage = `Erro: ${error.status} - ${error.message}`;
      }
    }

    console.error('Erro na API:', error);
    return throwError(() => new Error(errorMessage));
  }
}
