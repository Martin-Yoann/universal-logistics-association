// lib/prisma.ts
// 临时绕过 Prisma
export const prisma = {
  user: {
    findUnique: async ({ where }: any) => {
      console.log('Mock findUnique called with:', where)
      // 返回模拟用户数据
      if (where.email === 'test@test.com') {
        return {
          id: '1',
          name: 'Test User',
          email: 'test@test.com',
          password: '$2a$12$Y2gZbwQ5p5W5f5N5R5V5G.', // test123 的哈希
          role: 'USER',
          image: null
        }
      }
      return null
    },
    create: async ({ data }: any) => {
      console.log('Mock create called with:', data)
      return {
        id: '2',
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
  }
} as any