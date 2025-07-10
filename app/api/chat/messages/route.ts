// import { NextRequest, NextResponse } from 'next/server'
// import dbConnect from '@/lib/mongodb'
// // import Message from '@/models/Message'

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url)
//   const conversationId = searchParams.get('conversationId')

//   if (!conversationId) {
//     return NextResponse.json({ error: 'Missing conversationId' }, { status: 400 })
//   }

//   await dbConnect()

//   const messages = await Message.find({ conversationId }).sort({ timestamp: 1 }).lean()

//   return NextResponse.json(messages)
// }


// app/api/chat/messages/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import dbConnect from '@/lib/mongodb'
// import Chat from '@/models/Chat'

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url)
//   const conversationId = searchParams.get('conversationId')

//   if (!conversationId) {
//     return NextResponse.json({ error: 'Missing conversationId' }, { status: 400 })
//   }

//   await dbConnect()

//   const chat = await Chat.findById(conversationId).lean()

//   if (!chat) {
//     return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
//   }

//   return NextResponse.json(chat.messages || [])
// }


// import { NextRequest, NextResponse } from 'next/server'
// import dbConnect from '@/lib/mongodb'
// import Chat, { IChat } from '@/models/Chat'

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url)
//   const conversationId = searchParams.get('conversationId')

//   if (!conversationId) {
//     return NextResponse.json({ error: 'Missing conversationId' }, { status: 400 })
//   }

//   await dbConnect()

//   const chat = await Chat.findById(conversationId).lean<IChat>()

//   if (!chat || !chat.messages) {
//     return NextResponse.json([], { status: 200 }) // Return empty array if no messages
//   }

//   return NextResponse.json(chat.messages, { status: 200 })
// }


import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Chat, { IChat } from '@/models/Chat';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId');

  if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
    return NextResponse.json({ error: 'Invalid or missing conversationId' }, { status: 400 });
  }

  try {
    await dbConnect();

    const chat = await Chat.findById(conversationId).lean<IChat>();

    if (!chat || !chat.messages || !Array.isArray(chat.messages)) {
      return NextResponse.json([], { status: 200 }); 
    }

    const sortedMessages = [...chat.messages].sort((a, b) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });

    return NextResponse.json(sortedMessages, { status: 200 });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
