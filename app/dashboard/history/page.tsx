'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Conversation {
  _id: string
  title: string
  createdAt: string
}

export default function ChatHistory() {
  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch('/api/chat/history')
      const data = await res.json()
      setConversations(data)
    }

    fetchHistory()
  }, [])

  return (
    <div className="p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Chat History</h2>
      {conversations.length === 0 ? (
        <p className="text-gray-500">No conversations yet.</p>
      ) : (
        <ul className="space-y-3">
          {conversations.map((conv) => (
            <li key={conv._id} className="border-b pb-2">
              <Link href={`/dashboard/chat/${conv._id}`} className="text-blue-600 hover:underline">
                {conv.title}
              </Link>
              <p className="text-sm text-gray-500">
                {new Date(conv.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
