# 📌 Feedback Board Fullstack

Projeto **Feedback Board Fullstack** --- uma aplicação completa
(frontend + backend) para cadastrar, listar, filtrar, atualizar e
excluir feedbacks, com testes automatizados e integração contínua (CI).

------------------------------------------------------------------------

## 🚀 Visão Geral

Essa aplicação foi desenvolvida durante o Projeto 2 do roadmap
Fullstack, implementando:

-   ✔️ API REST com Node.js, Express e Prisma\
-   ✔️ Banco de dados SQLite\
-   ✔️ Frontend com React + Vite\
-   ✔️ Testes de integração (Jest + Supertest)\
-   ✔️ Testes E2E com Playwright\
-   ✔️ Docker + Docker Compose\
-   ✔️ CI com GitHub Actions

------------------------------------------------------------------------

## 📁 Estrutura do Projeto

    feedback-board-fullstack/
    ├── apps/
    │   ├── backend/              # API Node + Express
    │   └── frontend/             # App React + Vite
    ├── docker-compose.yml        # Docker Compose
    ├── .github/workflows/ci.yml  # Pipeline de CI (GitHub Actions)
    ├── package.json
    ├── prisma/
    ├── README.md
    └── ...

------------------------------------------------------------------------

## 🔧 Tecnologias

### Backend

-   Node.js
-   Express
-   Prisma ORM
-   Jest + Supertest

### Frontend

-   React
-   Vite
-   Playwright

### Containers & CI

-   Docker & Docker Compose
-   GitHub Actions

------------------------------------------------------------------------

## 📦 Pré-requisitos

-   Node.js (v20+)
-   npm
-   Docker (opcional)
-   Git

------------------------------------------------------------------------

## 🛠️ Setup Local --- Backend

``` bash
cd apps/backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

API disponível em:

    http://localhost:3001

------------------------------------------------------------------------

## 🛠️ Setup Local --- Frontend

``` bash
cd apps/frontend
npm install
npm run dev
```

Frontend disponível em:

    http://localhost:5173

------------------------------------------------------------------------

## 📄 API Endpoints

### Health

    GET /health

### Feedbacks

  Método   Rota             Descrição
  -------- ---------------- --------------------
  POST     /feedbacks       Criar feedback
  GET      /feedbacks       Listar feedbacks
  GET      /feedbacks/:id   Buscar por ID
  PATCH    /feedbacks/:id   Atualizar feedback
  DELETE   /feedbacks/:id   Remover feedback

------------------------------------------------------------------------

## 🎯 Filtros (GET /feedbacks)

-   `type` = bug \| idea \| other\
-   `status` = open \| planned \| done\
-   `q` = busca por texto\
-   `sort` = createdAt \| updatedAt\
-   `order` = asc \| desc\
-   `page` = número da página\
-   `pageSize` = itens por página

------------------------------------------------------------------------

## 🧪 Testes Backend

``` bash
cd apps/backend
npm test
```

------------------------------------------------------------------------

## 🌐 Testes E2E (Playwright)

``` bash
cd apps/frontend
npx playwright install
npm run test:e2e
```

------------------------------------------------------------------------

## 🐳 Docker

``` bash
docker compose up --build
```

-   Frontend: http://localhost:5173\
-   Backend: http://localhost:3001

------------------------------------------------------------------------

## ⚙️ CI (GitHub Actions)

Pipeline configurado em:

    .github/workflows/ci.yml

O CI executa: - Testes do backend - Testes E2E do frontend

------------------------------------------------------------------------

## 📘 Postman

Importe a coleção e use:

    baseUrl = http://localhost:3001

------------------------------------------------------------------------

## 🧾 Variáveis de Ambiente

Frontend:

    VITE_API_URL=http://localhost:3001

------------------------------------------------------------------------

## 📌 Observações

-   Projeto em monorepo (frontend + backend).
-   Pode rodar localmente ou via Docker.
-   Inclui testes automatizados e CI.

------------------------------------------------------------------------

## 📄 Licença

Projeto open-source para fins de estudo.

## 👤 Autor

Luiz Felipe Carvalho 
