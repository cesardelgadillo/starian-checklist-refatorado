import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form.component';
import { CreateTaskDto } from '../../models/task.interface';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  describe('Propriedades iniciais', () => {
    it('deve ter valores iniciais corretos', () => {
      expect(component.taskTitle).toBe('');
      expect(component.loading).toBeFalse();
      expect(component.showError).toBeFalse();
      expect(component.errorMessage).toBe('');
    });
  });

  describe('Validação básica', () => {
    it('deve validar formulário vazio como inválido', () => {
      component.taskTitle = '';
      expect(component.isFormValid()).toBeFalse();
    });

    it('deve validar formulário com título como válido', () => {
      component.taskTitle = 'Tarefa válida';
      expect(component.isFormValid()).toBeTrue();
    });

    it('deve mostrar erro para título vazio', () => {
      component.taskTitle = '';
      component.validateInput();

      expect(component.showError).toBeTrue();
      expect(component.errorMessage).toBe('O título da tarefa é obrigatório');
    });
  });

  describe('Submissão do formulário', () => {
    it('deve emitir evento createTask para formulário válido', () => {
      spyOn(component.createTask, 'emit');

      component.taskTitle = 'Nova Tarefa';
      component.onSubmit();

      const expectedTask: CreateTaskDto = { title: 'Nova Tarefa' };
      expect(component.createTask.emit).toHaveBeenCalledWith(expectedTask);
    });

    it('deve limpar formulário após submissão válida', () => {
      component.taskTitle = 'Nova Tarefa';
      component.onSubmit();

      expect(component.taskTitle).toBe('');
    });

    it('não deve emitir evento para formulário inválido', () => {
      spyOn(component.createTask, 'emit');

      component.taskTitle = '';
      component.onSubmit();

      expect(component.createTask.emit).not.toHaveBeenCalled();
    });
  });

  describe('Estados de loading', () => {
    it('deve controlar estado de loading', () => {
      component.setLoading(true);
      expect(component.loading).toBeTrue();

      component.setLoading(false);
      expect(component.loading).toBeFalse();
    });
  });
});
