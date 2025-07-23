# 🧪 Teste Técnico — Refatoração Fullstack (Angular + PHP)


Bem-vindo(a) ao teste técnico!  
Este repositório contém um projeto propositalmente **mal estruturado** e com diversas **más práticas** tanto no **frontend (Angular)** quanto no **backend (PHP)**.

O objetivo deste teste **não é entregar uma feature nova**, mas sim **refatorar o projeto existente**, identificando e corrigindo problemas de estrutura, organização, legibilidade e boas práticas.

---

## 🎯 Objetivo

Avaliar sua capacidade de:

- Identificar más práticas e problemas técnicos em projetos existentes
- Refatorar código front e back para melhorar **qualidade, legibilidade, manutenibilidade e boas práticas**
- Separar responsabilidades, aplicar arquitetura mais limpa e moderna
- Garantir que a aplicação continue funcionando após as melhorias
- Escrever código de forma clara, coesa e consistente
- Garantir responsividade.

📬 Instruções de Entrega
- Crie um novo respositório utilizando este como template;
  <img width="1285" height="242" alt="image" src="https://github.com/user-attachments/assets/093203bc-88d3-4806-b688-877369d0bfec" />
- Clone o seu repositório gerado do template;
- Após concluir o teste, envie o link do seu repositório para a equipe técnica responsável pela avaliação

---

## 🚀 Como Executar a Aplicação

### Pré-requisitos
- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

### Instruções de Execução

1. **Clone o repositório:**
   ```bash
   git clone <url-do-seu-repositorio>
   cd starian-checklist-refatorado
   ```

2. **Inicie os containers:**
   ```bash
   docker-compose up -d
   ```
   
   Este comando irá:
   - Construir e iniciar o container do backend (Laravel) na porta 8000
   - Construir e iniciar o container do frontend (Angular) na porta 4200
   - Configurar automaticamente o banco de dados SQLite
   - Executar as migrações e seeders

3. **Aguarde a inicialização completa:**
   - Backend: http://localhost:8000
   - Frontend: http://localhost:4200
   
   O processo pode levar alguns minutos na primeira execução.

4. **Verificar se está funcionando:**
   - Acesse http://localhost:4200 no seu navegador
   - A aplicação deve carregar com algumas tarefas de exemplo
   - Teste as funcionalidades: criar, editar, completar e remover tarefas

### Comandos Úteis

```bash
# Parar os containers
docker-compose down

# Rebuild completo (caso necessário)
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Ver logs do frontend
docker-compose logs angular

# Ver logs do backend
docker-compose logs laravel

# Executar comandos no container Laravel
docker-compose exec laravel php artisan migrate
docker-compose exec laravel php artisan db:seed
```

### Funcionalidades Implementadas

- ✅ **CRUD completo de tarefas**
- ✅ **Interface responsiva** (mobile-first)
- ✅ **Notificações em tempo real**
- ✅ **Estados de carregamento**
- ✅ **Arquitetura modular** (componentes standalone Angular 17)
- ✅ **API RESTful** (Laravel 11 com padrões de repository e service)
- ✅ **Hot reload** otimizado para desenvolvimento
- ✅ **Tratamento de erros** consistente
- ✅ **Validação de dados** (frontend e backend)

### Tecnologias Utilizadas

**Frontend:**
- Angular 17 (standalone components)
- TypeScript
- SCSS
- RxJS para programação reativa

**Backend:**
- Laravel 11
- PHP 8.3
- SQLite (banco de dados)
- Eloquent ORM

**DevOps:**
- Docker & Docker Compose
- Hot reload configurado
- Environment isolation
