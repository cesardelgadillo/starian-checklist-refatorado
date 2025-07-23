import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { Task } from '../../models/task.interface';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  const mockTasks: Task[] = [
    {
      id: 1,
      title: 'Tarefa Pendente',
      completed: false,
      created_at: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 2,
      title: 'Tarefa Concluída',
      completed: true,
      created_at: '2024-01-02T00:00:00.000Z'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  describe('Propriedades iniciais', () => {
    it('deve ter valores iniciais corretos', () => {
      expect(component.tasks).toEqual([]);
      expect(component.loading).toBeFalse();
    });
  });

  describe('Template rendering', () => {
    it('deve mostrar mensagem quando não há tarefas', () => {
      component.tasks = [];
      fixture.detectChanges();

      const emptyMessage = fixture.nativeElement.querySelector('.task-list__empty p');
      expect(emptyMessage).toBeTruthy();
      expect(emptyMessage.textContent.trim()).toBe('Nenhuma tarefa encontrada.');
    });

    it('deve renderizar lista de tarefas', () => {
      component.tasks = mockTasks;
      fixture.detectChanges();

      const taskItems = fixture.nativeElement.querySelectorAll('.task-item');
      expect(taskItems.length).toBe(2);
    });

    it('deve renderizar títulos das tarefas corretamente', () => {
      component.tasks = mockTasks;
      fixture.detectChanges();

      const taskTitles = fixture.nativeElement.querySelectorAll('.task-item__title');
      expect(taskTitles[0].textContent.trim()).toBe('Tarefa Pendente');
      expect(taskTitles[1].textContent.trim()).toBe('Tarefa Concluída');
    });
  });

  describe('trackByTaskId', () => {
    it('deve retornar o ID da tarefa', () => {
      const task = mockTasks[0];
      const result = component.trackByTaskId(0, task);

      expect(result).toBe(task.id);
    });
  });

  describe('Eventos', () => {
    beforeEach(() => {
      component.tasks = mockTasks;
      fixture.detectChanges();
    });

    it('deve emitir evento toggleComplete', () => {
      spyOn(component.toggleComplete, 'emit');

      const taskPendente = mockTasks[0];
      component.onToggleComplete(taskPendente);

      expect(component.toggleComplete.emit).toHaveBeenCalledWith(taskPendente);
    });

    it('deve emitir evento deleteTask quando usuário confirma', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(component.deleteTask, 'emit');

      const taskToDelete = mockTasks[0];
      component.onDelete(taskToDelete);

      expect(component.deleteTask.emit).toHaveBeenCalledWith(taskToDelete);
    });

    it('não deve emitir evento deleteTask quando usuário cancela', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      spyOn(component.deleteTask, 'emit');

      const taskToDelete = mockTasks[0];
      component.onDelete(taskToDelete);

      expect(component.deleteTask.emit).not.toHaveBeenCalled();
    });
  });
});
