// app/api/auth/register/route.ts
export const runtime = 'edge';



import { NextRequest, NextResponse } from "next/server"
import { userStore } from '@/lib/users'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    console.log('Registration request:', { name, email })
    console.log('Current users before registration:', userStore.getAllUsers().map(u => u.email))

    // 验证输入
    if (!name || !email || !password) {
      return NextResponse.json(
        { 
          success: false,
          error: "All fields are required: name, email, and password" 
        },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false,
          error: "Invalid email format" 
        },
        { status: 400 }
      )
    }

    // 验证密码强度
    if (password.length < 6) {
      return NextResponse.json(
        { 
          success: false,
          error: "Password must be at least 6 characters long" 
        },
        { status: 400 }
      )
    }

    // 检查用户是否已存在
    const existingUser = userStore.findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false,
          error: "User with this email already exists" 
        },
        { status: 409 }
      )
    }

    // 创建新用户
    const newUser = userStore.createUser({
      name,
      email,
      password, // 注意：实际应用中应该哈希存储
      image: null,
      role: "USER"
    })
    
    console.log('New user created:', newUser.email)
    console.log('Current users after registration:', userStore.getAllUsers().map(u => u.email))

    // 创建成功响应
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      timestamp: new Date().toISOString()
    }, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      }
    })

  } catch (error: any) {
    console.error("Registration error:", error)
    
    return NextResponse.json(
      { 
        success: false,
        error: process.env.NODE_ENV === 'development' 
          ? error.message 
          : "An error occurred during registration. Please try again." 
      },
      { status: 500 }
    )
  }
}

// OPTIONS 方法用于 CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}