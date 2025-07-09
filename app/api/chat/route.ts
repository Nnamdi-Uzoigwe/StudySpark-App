import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Chat from '@/models/Chat';
import { CreateChatRequest } from '@/types/chat';

// GET: Fetch all chats
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const chats = await Chat.find({ userId: session.user.id })
      .sort({ lastActivity: -1 })
      .select('title lastActivity messages createdAt')
      .lean();

    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch chats:', error);
    return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 });
  }
}

// POST: Create new chat
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const { title = 'New Chat', initialMessage }: CreateChatRequest = body;

    const newChat = new Chat({
      userId: session.user.id,
      title,
      messages: initialMessage
        ? [{
            role: 'user',
            content: initialMessage,
            timestamp: new Date()
          }]
        : []
    });

    await newChat.save();

    return NextResponse.json(newChat, { status: 201 });
  } catch (error) {
    console.error('Failed to create chat:', error);
    return NextResponse.json({ error: 'Failed to create chat' }, { status: 500 });
  }
}
