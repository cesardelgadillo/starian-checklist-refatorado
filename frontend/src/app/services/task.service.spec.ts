import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task, CreateTaskDto, UpdateTaskDto, TasksResponse, TaskResponse } from '../models/task.interface';
import { environment } from '../../environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/api/tasks`;

  // Mock data
  const mockTask: Task = {
    id: 1,
    title: 'Tarefa Teste',
    completed: false,
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z'
  };

  const mockTasks: Task[] = [
    mockTask,
    {
      id: 2,
      title: 'Segunda Tarefa',
      completed: true,
      created_at: '2024-01-02T00:00:00.000Z',
      updated_at: '2024-01-02T00:00:00.000Z'
    }
  ];

  const mockCreateTaskDto: CreateTaskDto = {
    title: 'Nova Tarefa'
  };

  const mockUpdateTaskDto: UpdateTaskDto = {
    title: 'Tarefa Atualizada',
    completed: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('getTasks', () => {
    it('deve retornar uma lista de tarefas quando a resposta é um array', () => {
      service.getTasks().subscribe(tasks => {
        expect(tasks).toEqual(mockTasks);
        expect(tasks.length).toBe(2);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasks);
    });

    it('deve retornar uma lista de tarefas quando a resposta tem propriedade data', () => {
      const mockResponse: TasksResponse = { data: mockTasks };

      service.getTasks().subscribe(tasks => {
        expect(tasks).toEqual(mockTasks);
        expect(tasks.length).toBe(2);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('deve tratar erro na busca de tarefas', () => {
      service.getTasks().subscribe({
        error: (error) => {
          expect(error.message).toContain('Erro interno do servidor');
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('getTask', () => {
    it('deve retornar uma tarefa específica quando a resposta é um objeto Task', () => {
      service.getTask(1).subscribe(task => {
        expect(task).toEqual(mockTask);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTask);
    });

    it('deve retornar uma tarefa específica quando a resposta tem propriedade data', () => {
      const mockResponse: TaskResponse = { data: mockTask };

      service.getTask(1).subscribe(task => {
        expect(task).toEqual(mockTask);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('deve tratar erro 404 ao buscar tarefa inexistente', () => {
      service.getTask(999).subscribe({
        error: (error) => {
          expect(error.message).toContain('Tarefa não encontrada');
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/999`);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('createTask', () => {
    it('deve criar uma nova tarefa com sucesso', () => {
      service.createTask(mockCreateTaskDto).subscribe(task => {
        expect(task).toEqual(mockTask);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockCreateTaskDto);
      req.flush(mockTask);
    });

    it('deve criar uma nova tarefa com resposta que tem propriedade data', () => {
      const mockResponse: TaskResponse = { data: mockTask };

      service.createTask(mockCreateTaskDto).subscribe(task => {
        expect(task).toEqual(mockTask);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('deve tratar erro de validação ao criar tarefa', () => {
      service.createTask(mockCreateTaskDto).subscribe({
        error: (error) => {
          expect(error.message).toContain('Validation Error');
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush({ message: 'Validation Error' }, { status: 422, statusText: 'Unprocessable Entity' });
    });
  });

  describe('updateTask', () => {
    it('deve atualizar uma tarefa com sucesso', () => {
      const updatedTask = { ...mockTask, ...mockUpdateTaskDto };

      service.updateTask(1, mockUpdateTaskDto).subscribe(task => {
        expect(task).toEqual(updatedTask);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockUpdateTaskDto);
      req.flush(updatedTask);
    });

    it('deve tratar erro ao atualizar tarefa inexistente', () => {
      service.updateTask(999, mockUpdateTaskDto).subscribe({
        error: (error) => {
          expect(error.message).toContain('Tarefa não encontrada');
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/999`);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteTask', () => {
    it('deve deletar uma tarefa com sucesso', () => {
      service.deleteTask(1).subscribe(result => {
        expect(result).toBeNull();
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('deve tratar erro ao deletar tarefa inexistente', () => {
      service.deleteTask(999).subscribe({
        error: (error) => {
          expect(error.message).toContain('Tarefa não encontrada');
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/999`);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('toggleTaskCompletion', () => {
    it('deve alternar status de conclusão para true', () => {
      const completedTask = { ...mockTask, completed: true };

      service.toggleTaskCompletion(1, true).subscribe(task => {
        expect(task).toEqual(completedTask);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ completed: true });
      req.flush(completedTask);
    });

    it('deve alternar status de conclusão para false', () => {
      const incompletedTask = { ...mockTask, completed: false };

      service.toggleTaskCompletion(1, false).subscribe(task => {
        expect(task).toEqual(incompletedTask);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ completed: false });
      req.flush(incompletedTask);
    });
  });

  describe('handleError', () => {
    it('deve tratar erro 400 - Bad Request', () => {
      service.getTasks().subscribe({
        error: (error) => {
          expect(error.message).toContain('Dados inválidos fornecidos');
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });
    });

    it('deve tratar erro genérico do servidor', () => {
      service.getTasks().subscribe({
        error: (error) => {
          expect(error.message).toContain('Erro: 503');
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Service Unavailable', { status: 503, statusText: 'Service Unavailable' });
    });
  });
});
