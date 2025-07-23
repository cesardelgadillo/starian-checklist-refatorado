import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { NotificationMessage } from '../components/notification/notification.component';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve ter notification$ observable inicializado', () => {
    expect(service.notification$).toBeTruthy();
  });

  describe('showSuccess', () => {
    it('deve emitir notificação de sucesso com duração padrão', (done) => {
      const message = 'Operação realizada com sucesso!';

      service.notification$.subscribe(notification => {
        if (notification) {
          expect(notification.type).toBe('success');
          expect(notification.message).toBe(message);
          expect(notification.duration).toBe(3000);
          done();
        }
      });

      service.showSuccess(message);
    });

    it('deve emitir notificação de sucesso com duração customizada', (done) => {
      const message = 'Sucesso!';
      const duration = 5000;

      service.notification$.subscribe(notification => {
        if (notification) {
          expect(notification.type).toBe('success');
          expect(notification.message).toBe(message);
          expect(notification.duration).toBe(duration);
          done();
        }
      });

      service.showSuccess(message, duration);
    });
  });

  describe('showError', () => {
    it('deve emitir notificação de erro com duração padrão', (done) => {
      const message = 'Ocorreu um erro!';

      service.notification$.subscribe(notification => {
        if (notification) {
          expect(notification.type).toBe('error');
          expect(notification.message).toBe(message);
          expect(notification.duration).toBe(5000);
          done();
        }
      });

      service.showError(message);
    });

    it('deve emitir notificação de erro com duração customizada', (done) => {
      const message = 'Erro crítico!';
      const duration = 10000;

      service.notification$.subscribe(notification => {
        if (notification) {
          expect(notification.type).toBe('error');
          expect(notification.message).toBe(message);
          expect(notification.duration).toBe(duration);
          done();
        }
      });

      service.showError(message, duration);
    });
  });

  describe('showWarning', () => {
    it('deve emitir notificação de aviso com duração padrão', (done) => {
      const message = 'Atenção necessária!';

      service.notification$.subscribe(notification => {
        if (notification) {
          expect(notification.type).toBe('warning');
          expect(notification.message).toBe(message);
          expect(notification.duration).toBe(4000);
          done();
        }
      });

      service.showWarning(message);
    });
  });

  describe('showInfo', () => {
    it('deve emitir notificação informativa com duração padrão', (done) => {
      const message = 'Informação importante!';

      service.notification$.subscribe(notification => {
        if (notification) {
          expect(notification.type).toBe('info');
          expect(notification.message).toBe(message);
          expect(notification.duration).toBe(3000);
          done();
        }
      });

      service.showInfo(message);
    });
  });

  describe('clear', () => {
    it('deve limpar a notificação atual', (done) => {
      let notificationCount = 0;

      service.notification$.subscribe(notification => {
        notificationCount++;

        if (notificationCount === 1) {
          // Primeira emissão - deve ser null (estado inicial)
          expect(notification).toBeNull();
        } else if (notificationCount === 2) {
          // Segunda emissão - deve ser a notificação
          expect(notification).toBeTruthy();
          expect(notification!.type).toBe('success');
        } else if (notificationCount === 3) {
          // Terceira emissão - deve ser null após clear
          expect(notification).toBeNull();
          done();
        }
      });

      service.showSuccess('Teste');
      service.clear();
    });
  });

  describe('auto-clear', () => {
    it('deve limpar automaticamente após duração especificada', (done) => {
      let notificationCount = 0;
      const duration = 100; // 100ms para teste rápido

      service.notification$.subscribe(notification => {
        notificationCount++;

        if (notificationCount === 1) {
          // Estado inicial - null
          expect(notification).toBeNull();
        } else if (notificationCount === 2) {
          // Notificação mostrada
          expect(notification).toBeTruthy();
          expect(notification!.message).toBe('Teste auto-clear');
        } else if (notificationCount === 3) {
          // Auto-cleared após duração
          expect(notification).toBeNull();
          done();
        }
      });

      service.showSuccess('Teste auto-clear', duration);
    });

    it('não deve auto-clear quando duração é 0', (done) => {
      let notificationCount = 0;

      service.notification$.subscribe(notification => {
        notificationCount++;

        if (notificationCount === 1) {
          expect(notification).toBeNull();
        } else if (notificationCount === 2) {
          expect(notification).toBeTruthy();
          expect(notification!.message).toBe('Sem auto-clear');

          // Aguarda um tempo e verifica se ainda está presente
          setTimeout(() => {
            expect(notificationCount).toBe(2); // Não deve ter terceira emissão
            done();
          }, 200);
        }
      });

      service.showSuccess('Sem auto-clear', 0);
    });
  });

  describe('múltiplas notificações', () => {
    it('deve substituir notificação anterior', (done) => {
      let notificationCount = 0;

      service.notification$.subscribe(notification => {
        notificationCount++;

        if (notificationCount === 1) {
          expect(notification).toBeNull();
        } else if (notificationCount === 2) {
          expect(notification!.message).toBe('Primeira');
        } else if (notificationCount === 3) {
          expect(notification!.message).toBe('Segunda');
          done();
        }
      });

      service.showSuccess('Primeira', 0);
      service.showError('Segunda', 0);
    });
  });
});
