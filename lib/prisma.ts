import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// DATABASE_URL / DIRECT_URL 선택 로직
const databaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.DIRECT_URL
    : process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log:
      process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

// Next.js dev HMR 대응
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
