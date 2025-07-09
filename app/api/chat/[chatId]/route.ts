import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Chat from '@/models/Chat';
import dbConnect from '@/lib/mongodb';
import { getAIResponse } from '@/lib/aiService';
import { SendMessageRequest } from '@/types/chat';
import { Types } from 'mongoose';

// GET /api/chat/[chatId]
export async function GET(req: NextRequest, { params }: { params: { chatId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { chatId } = params;

  if (!Types.ObjectId.isValid(chatId)) {
    return NextResponse.json({ error: 'Invalid chat ID' }, { status: 400 });
  }

  await dbConnect();

  try {
    const chat = await Chat.findOne({
      _id: chatId,
      userId: session.user.id
    }).lean();

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch chat:', error);
    return NextResponse.json({ error: 'Failed to fetch chat' }, { status: 500 });
  }
}

// POST /api/chat/[chatId]
export async function POST(req: NextRequest, { params }: { params: { chatId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { chatId } = params;

  if (!Types.ObjectId.isValid(chatId)) {
    return NextResponse.json({ error: 'Invalid chat ID' }, { status: 400 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const { message }: SendMessageRequest = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Add user message to chat
    const chat = await Chat.findOneAndUpdate(
      { _id: chatId, userId: session.user.id },
      {
        $push: {
          messages: {
            role: 'user',
            content: message,
            timestamp: new Date()
          }
        },
        $set: { lastActivity: new Date() }
      },
      { new: true }
    );

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    // Get AI response
    const aiResponse = await getAIResponse(message, chat.messages);

    // Add AI response to chat
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          messages: {
            role: 'assistant',
            content: aiResponse.content,
            recommendations: aiResponse.recommendations,
            timestamp: new Date()
          }
        },
        $set: { lastActivity: new Date() }
      },
      { new: true }
    );

    return NextResponse.json({
      message: 'Message added successfully',
      aiResponse,
      chat: updatedChat
    }, { status: 200 });
  } catch (error) {
    console.error('Failed to add message:', error);
    return NextResponse.json({ error: 'Failed to add message' }, { status: 500 });
  }
}

// DELETE /api/chat/[chatId]
export async function DELETE(req: NextRequest, { params }: { params: { chatId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { chatId } = params;

  if (!Types.ObjectId.isValid(chatId)) {
    return NextResponse.json({ error: 'Invalid chat ID' }, { status: 400 });
  }

  await dbConnect();

  try {
    const deletedChat = await Chat.findOneAndDelete({
      _id: chatId,
      userId: session.user.id
    });

    if (!deletedChat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Chat deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete chat:', error);
    return NextResponse.json({ error: 'Failed to delete chat' }, { status: 500 });
  }
}
