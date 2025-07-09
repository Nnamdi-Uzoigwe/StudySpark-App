'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ChatSection from '@/components/ChatSection'

interface Message {
  _id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string | Date;
}

export default function ChatDetailPage() {
  const { id } = useParams()
  const [initialMessages, setInitialMessages] = useState([])


useEffect(() => {
  async function fetchMessages() {
    try {
      const res = await fetch(`/api/chat/messages?conversationId=${id}`);
      const data = await res.json();
      const parsedMessages = (data || []).map((msg: Message) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setInitialMessages(parsedMessages);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  }

  fetchMessages();
}, [id]);
  return (
    <div className="p-4">
      <ChatSection initialMessages={initialMessages} conversationId={id as string} />
    </div>
  )
}



