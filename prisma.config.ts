import { defineConfig, env } from "prisma/config";
import dotenv from "dotenv";

// Prisma CLI only auto-loads `.env` — explicitly load `.env.local` too
// so `DATABASE_URL` resolves in both Next.js and Prisma contexts.
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // This safely pulls your local Docker connection string from .env / .env.local
    url: env("DATABASE_URL"),
  },
});
