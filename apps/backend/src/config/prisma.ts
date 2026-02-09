import path from "node:path";
import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Carrega o .env do backend (garante no Windows/monorepo)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL não definida. Verifique apps/backend/.env");
}

// Prisma 7 + SQLite: precisa de adapter
const adapter = new PrismaBetterSqlite3({ url });

export const prisma = new PrismaClient({ adapter });
