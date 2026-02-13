FROM node:20-alpine

WORKDIR /app

# Copia manifests (workspaces)
COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/package.json

# Instala dependências do monorepo
RUN npm ci

# Copia somente o backend e configs necessários
COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

# Gera o Prisma Client
RUN npx prisma generate

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate dev --name init && npm run dev"]
