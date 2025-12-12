// lib/users.ts - 共享的用户存储
interface User {
    id: string;
    email: string;
    password: string; // 实际应用中应该存储哈希
    name: string;
    image: string | null;
    role: string;
  }
  
  // 内存中的用户存储
  let users: User[] = [
    {
      id: "1",
      email: "test@test.com",
      password: "test123",
      name: "Test User",
      image: null,
      role: "USER"
    },
    {
      id: "2",
      email: "admin@admin.com",
      password: "admin123",
      name: "Admin User",
      image: null,
      role: "ADMIN"
    }
  ];
  
  // 用户管理函数
  export const userStore = {
    // 查找用户
    findUserByEmail: (email: string): User | undefined => {
      return users.find(u => u.email === email);
    },
    
    // 创建用户
    createUser: (user: Omit<User, 'id'>): User => {
      const newUser: User = {
        ...user,
        id: `user_${Date.now()}`
      };
      users.push(newUser);
      console.log('User created. Total users:', users.length);
      return newUser;
    },
    
    // 验证用户
    verifyUser: (email: string, password: string): User | null => {
      const user = users.find(u => u.email === email && u.password === password);
      return user || null;
    },
    
    // 获取所有用户（仅用于调试）
    getAllUsers: (): User[] => {
      return [...users];
    }
  };