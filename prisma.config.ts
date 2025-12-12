// prisma.config.ts

export default {
  // 对于直接数据库连接（SQLite）
  datasource: {
    provider: "sqlite",
    url: process.env.DATABASE_URL || "file:./dev.db",
  },
  // 或者对于 Prisma Accelerate
  // accelerateUrl: process.env.PRISMA_ACCELERATE_URL,
}