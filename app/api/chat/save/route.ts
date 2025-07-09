// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '../../auth/[...nextauth]/route'
// import { MongoClient, ObjectId } from 'mongodb'

// const client = new MongoClient(process.env.MONGODB_URI!)
// const dbName = 'study-spark-app' // Update this if needed

// export async function POST(request: NextRequest) {
//   const session = await getServerSession(authOptions)
//   if (!session || !session.user?.id) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   const body = await request.json()
//   const { content, sender, conversationId } = body

//   if (!content || !sender) {
//     return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
//   }

//   const conn = await client.connect()
//   const db = conn.db(dbName)

//   let convId = conversationId

//   // If no conversation exists, create a new one
//   if (!conversationId) {
//     const newConversation = await db.collection('conversations').insertOne({
//       userId: session.user.id,
//       title: content.slice(0, 30),
//       createdAt: new Date()
//     })
//     convId = newConversation.insertedId.toString()
//   }

//   const savedMsg = await db.collection('messages').insertOne({
//     conversationId: new ObjectId(convId),
//     sender,
//     content,
//     timestamp: new Date()
//   })

//   return NextResponse.json({ success: true, conversationId: convId, messageId: savedMsg.insertedId })
// }

// app/api/chat/save/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import dbConnect from '@/lib/mongodb'
import Chat from '@/models/Chat'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()

  const body = await req.json()
  const { content, sender, conversationId } = body

  if (!content || !sender) {
    return NextResponse.json({ error: 'Missing content or sender' }, { status: 400 })
  }

  let convId = conversationId

  if (!convId) {
    const newChat = await Chat.create({
      userEmail: session.user.email,
      messages: [{
        content,
        sender,
        timestamp: new Date()
      }]
    })

    convId = newChat._id.toString()

    return NextResponse.json({ success: true, conversationId: convId })
  }

  // Push the new message into existing chat
  await Chat.findByIdAndUpdate(convId, {
    $push: {
      messages: {
        content,
        sender,
        timestamp: new Date()
      }
    }
  })

  return NextResponse.json({ success: true, conversationId: convId })
}
