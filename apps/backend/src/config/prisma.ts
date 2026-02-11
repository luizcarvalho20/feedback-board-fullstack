import path from "node:path";
import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(`DATABASE_URL não definida. Verifique apps/backend/${envFile}`);
}

const adapter = new PrismaBetterSqlite3({ url });

export const prisma = new PrismaClient({ adapter });
