import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { IMessage, IChat } from '../types/chat';

export function useChat(chatId: string | null) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (chatId && session) {
      fetchChatHistory();
    }
  }, [chatId, session]);

  const fetchChatHistory = async () => {
    if (!chatId) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/chat/${chatId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }
      
      const chat: IChat = await response.json();
      setMessages(chat.messages || []);
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
      setError('Failed to load chat history');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    if (!session || loading || !chatId) return;

    setLoading(true);
    setError(null);
    
    // Add user message immediately for better UX
    const userMessage: IMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch(`/api/chat/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      // Add AI response
      const aiMessage: IMessage = {
        role: 'assistant',
        content: data.aiResponse.content,
        recommendations: data.aiResponse.recommendations,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message');
      
      // Remove the user message that was optimistically added
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading, error, refetch: fetchChatHistory };
}