import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id?: string
  userId?: string
  email: string
  name: string
  role?: string
  // Add any other custom fields your token might include
}

export async function GET(request: NextRequest) {
  try {
    // Get the Authorization header
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      )
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.substring(7)
    
    if (!token) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 401 }
      )
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
     
      const userData = {
        id: decoded.id || decoded.userId,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      }

      return NextResponse.json(userData)
      
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError)
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


