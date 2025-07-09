import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { IChat } from '../types/chat';

export function useChats() {
  const { data: session } = useSession();
  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      fetchChats();
    }
  }, [session]);

  const fetchChats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/chat');
      
      if (!response.ok) {
        throw new Error('Failed to fetch chats');
      }
      
      const chats: IChat[] = await response.json();
      setChats(chats);
    } catch (error) {
      console.error('Failed to fetch chats:', error);
      setError('Failed to load chats');
    } finally {
      setLoading(false);
    }
  };

  const createChat = async (title?: string, initialMessage?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, initialMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to create chat');
      }

      const newChat: IChat = await response.json();
      setChats(prev => [newChat, ...prev]);
      
      return newChat;
    } catch (error) {
      console.error('Failed to create chat:', error);
      setError('Failed to create chat');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chat/${chatId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete chat');
      }

      setChats(prev => prev.filter(chat => chat._id !== chatId));
    } catch (error) {
      console.error('Failed to delete chat:', error);
      setError('Failed to delete chat');
    }
  };

  return { 
    chats, 
    loading, 
    error, 
    createChat, 
    deleteChat, 
    refetch: fetchChats 
  };
}