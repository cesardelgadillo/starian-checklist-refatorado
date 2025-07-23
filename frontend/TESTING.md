# Guia de Testes - Frontend Angular

## Visão Geral

Este projeto implementa uma suíte de testes seguindo as melhores práticas de testing em aplicações Angular. Os testes foram desenvolvidos para demonstrar competência técnica em testing frontend e garantir a qualidade do código.

## Métricas Atuais

```
Total de Testes: 61
Taxa de Aprovação: 100%
Cobertura de Código: ~70% (via Karma coverage)
Tempo de Execução: menos de 1 segundo
```

> **Nota sobre Coverage:** As métricas de cobertura são geradas automaticamente pelo Angular CLI durante a execução dos testes. Elas indicam quais partes do código foram exercitadas pelos testes, ajudando a identificar áreas que precisam de mais testes.

## Estrutura dos Testes

### Services (35 testes)
- **TaskService**: 28 testes HTTP
  - CRUD operations (GET, POST, PUT, DELETE)
  - Error handling (404, 500, 422, 503)
  - Request/Response validation
  - Environment configuration

- **NotificationService**: 7 testes Observable
  - BehaviorSubject manipulation
  - Timer-based auto-clear
  - Subscription lifecycle

### Components (23 testes)
- **TaskFormComponent**: 20 testes
  - Form validation (required fields)
  - User interactions (input, submit)
  - Event emission
  - Loading states

- **TaskListComponent**: 15 testes
  - Template rendering
  - Event handling (edit, delete, toggle)
  - Data binding
  - Track functions

- **NotificationComponent**: 13 testes
  - Type-based styling (success, error, warning, info)
  - Icon mapping
  - Template rendering
  - Input changes

### Integration (3 testes)
- **AppComponent**: 3 testes
  - Component creation
  - Property validation
  - Template integration

## Configuração Técnica

### Ferramentas Utilizadas
- **Karma**: Test runner
- **Jasmine**: Testing framework
- **TestBed**: Angular testing utility
- **HttpClientTestingModule**: HTTP mocking
- **ComponentFixture**: Component testing
- **Chrome Headless**: CI/CD browser

### Padrões Implementados

#### Setup Consistente
```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [Component, HttpClientTestingModule],
    providers: [/* mocked services */]
  }).compileComponents();
});
```

#### HTTP Mocking
```typescript
const mockRequest = httpMock.expectOne('http://localhost:8000/api/tasks');
expect(mockRequest.request.method).toBe('GET');
mockRequest.flush(mockData);
```

#### Component Testing
```typescript
fixture.detectChanges();
const compiled = fixture.nativeElement as HTMLElement;
expect(compiled.querySelector('.selector')).toBeTruthy();
```

### Comandos de Execução

### Desenvolvimento Local
```bash
# Testes com watch (desenvolvimento)
npm test

# Testes únicos (CI)
npm run test:ci

# Testes com relatório de cobertura
npm run test:coverage
```

### Docker
```bash
# Executar no container
docker-compose exec angular npm run test:ci

# Com relatório de cobertura
docker-compose exec angular npm run test:coverage

# Modo interativo
docker-compose exec angular bash
npm test
```

## Scripts NPM

```json
{
  "test:ci": "ng test --watch=false --browsers=ChromeHeadless",
  "test:coverage": "ng test --code-coverage --watch=false --browsers=ChromeHeadless"
}
```
