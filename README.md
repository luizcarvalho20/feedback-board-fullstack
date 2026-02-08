# feedback-board-fullstack

Projeto fullstack em formato monorepo usando workspaces.

## Estrutura do projeto

- apps/backend → API em Express + TypeScript
- apps/frontend → Frontend em React + Vite + TypeScript

## Requisitos

- Node.js 18+ (ou 20+)
- NPM
- Git

## Instalação

Na raiz do projeto, execute:

npm install

## Rodando o backend

Na raiz do projeto, execute:

npm run dev:backend

O backend irá subir em:

http://localhost:3001

Teste de saúde:

http://localhost:3001/health

## Rodando o frontend

Na raiz do projeto, execute:

npm run dev:frontend

O frontend irá subir normalmente em:

http://localhost:5173

## Variáveis de ambiente (Frontend)

Arquivo: apps/frontend/.env

Conteúdo:

VITE_API_URL=http://localhost:3001

## Scripts úteis (na raiz)

- npm run dev:backend → roda só o backend
- npm run dev:frontend → roda só o frontend
- npm run dev → roda backend e frontend juntos (se suportado no seu terminal)

## Objetivo do projeto

Criar um sistema de Feedback Board com:

- API REST em Node + Express
- Frontend em React
- CRUD de feedbacks
- Filtros e busca
- Testes automatizados
- Documentação
- Boas práticas de arquitetura e organização de código

## Status

Projeto em desenvolvimento

## Autor
Luiz Felipe Carvalho.