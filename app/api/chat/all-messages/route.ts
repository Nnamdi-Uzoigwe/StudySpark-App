


// import { NextApiRequest, NextApiResponse } from 'next';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/authOptions';
// import Chat from '@/models/Chat';
// import dbConnect from '@/lib/mongodb';
// import { IMessage } from '@/types/chat';


// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const session = await getServerSession(req, res, authOptions);
  
//   if (!session?.user?.id) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   try {
//     await dbConnect();

//     // Get all chats for the user
//     const chats = await Chat.find({ userEmail: session.user.email })
//       .select('messages')
//       .lean();

//     // Extract all messages from all chats
//     const allMessages = chats.flatMap(chat =>
//   (chat.messages as IMessage[]).map((message) => ({
//     content: message.content,
//     sender: message.role === 'user' ? 'user' : 'ai',
//     timestamp: message.timestamp,
//   }))
// );


//     res.status(200).json(allMessages);
//   } catch (error) {
//     console.error('Failed to fetch all messages:', error);
//     res.status(500).json({ error: 'Failed to fetch messages' });
//   }
// }

// app/api/chat/all-messages/route.ts

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
