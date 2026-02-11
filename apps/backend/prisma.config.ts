import path from "node:path";
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// Se NODE_ENV=test, carrega .env.test; senão .env
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: path.resolve(__dirname, envFile) });

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(`DATABASE_URL não encontrada. Verifique apps/backend/${envFile}`);
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url,
  },
});
