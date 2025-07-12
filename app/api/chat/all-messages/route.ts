import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import dbConnect from '@/lib/mongodb';
import Chat from '@/models/Chat';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const chats = await Chat.find({ userEmail: session.user.email })
      .select('messages')
      .lean();

    const allMessages = chats.flatMap(chat =>
      (chat.messages || []).map((message: any) => ({
        content: message.content,
        sender: message.sender || 'ai',
        timestamp: message.timestamp,
      }))
    );

    return NextResponse.json(allMessages, { status: 200 });
  } catch (error) {
    console.error('Error fetching all messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}


// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/authOptions';
// import dbConnect from '@/lib/mongodb';
// import Chat from '@/models/Chat';
// import { IMessage } from '@/types/chat'; // Make sure this is defined

// interface ChatDocument {
//   messages: IMessage[];
// }

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     await dbConnect();

//     const chats: ChatDocument[] = await Chat.find({ userEmail: session.user.email })
//       .select('messages')
//       .lean();

//    const allMessages: IMessage[] = chats.flatMap(chat =>
//   (chat.messages || []).map((message) => ({
//     content: message.content,
//     role: message.role, // must be present, and either 'user' or 'assistant'
//     timestamp: new Date(message.timestamp),
//     recommendations: message.recommendations || []
//   }))
// );

//     return NextResponse.json(allMessages, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching all messages:', error);
//     return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
//   }
// }
