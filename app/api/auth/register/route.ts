
import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

const client = new MongoClient(process.env.MONGODB_URI!)

export async function POST(request: NextRequest) {
  let mongoClient: MongoClient | null = null
  
  try {
    const { name, email, password } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    mongoClient = await client.connect()
    const db = mongoClient.db()
    const users = db.collection('users')

    // Check if user already exists
    const existingUser = await users.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Get the created user
    const newUser = await users.findOne({ _id: result.insertedId })

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: newUser?._id.toString(),
          name: newUser?.name,
          email: newUser?.email,
        }
      },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('Registration error:', error.message, error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  } finally {
    // Close MongoDB connection
    if (mongoClient) {
      await mongoClient.close()
    }
  }
}