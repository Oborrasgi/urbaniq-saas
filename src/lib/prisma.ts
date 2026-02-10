import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true // Equivalente a verify-full
  }
});

const adapter = new PrismaPg(pool);

export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}