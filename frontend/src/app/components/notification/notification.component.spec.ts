import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent, NotificationMessage } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter notification inicial como null', () => {
    expect(component.notification).toBeNull();
  });

  describe('Template rendering', () => {
    it('não deve renderizar nada quando notification é null', () => {
      component.notification = null;
      fixture.detectChanges();

      const notificationElement = fixture.nativeElement.querySelector('.notification');
      expect(notificationElement).toBeFalsy();
    });

    it('deve renderizar notificação de sucesso', () => {
      component.notification = {
        type: 'success',
        message: 'Operação realizada com sucesso!',
        duration: 3000
      };
      fixture.detectChanges();

      const notificationElement = fixture.nativeElement.querySelector('.notification');
      expect(notificationElement).toBeTruthy();
      expect(notificationElement.classList.contains('notification--success')).toBeTrue();
    });

    it('deve renderizar notificação de erro', () => {
      component.notification = {
        type: 'error',
        message: 'Ocorreu um erro!',
        duration: 5000
      };
      fixture.detectChanges();

      const notificationElement = fixture.nativeElement.querySelector('.notification');
      expect(notificationElement.classList.contains('notification--error')).toBeTrue();
    });
  });

  describe('getIcon method', () => {
    it('deve retornar string vazia quando notification é null', () => {
      component.notification = null;
      expect(component.getIcon()).toBe('');
    });

    it('deve retornar ícone correto para success', () => {
      component.notification = { type: 'success', message: 'teste' };
      expect(component.getIcon()).toBe('✓');
    });

    it('deve retornar ícone correto para error', () => {
      component.notification = { type: 'error', message: 'teste' };
      expect(component.getIcon()).toBe('✗');
    });

    it('deve retornar ícone correto para warning', () => {
      component.notification = { type: 'warning', message: 'teste' };
      expect(component.getIcon()).toBe('⚠');
    });

    it('deve retornar ícone correto para info', () => {
      component.notification = { type: 'info', message: 'teste' };
      expect(component.getIcon()).toBe('i');
    });
  });
});
