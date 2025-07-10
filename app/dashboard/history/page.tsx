'use client'
import { useEffect, useState } from 'react'
import { Bot, ArrowLeft, Maximize2, Settings } from 'lucide-react'
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
    <div className=" bg-white h-auto min-h-screen w-full">
      {/* Top Navigation Bar */}
            <div className="bg-white border-b shadow-sm p-4 w-full">
              <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Link 
                    href="/dashboard"
                    className="flex items-center gap-2 text-gray-600 hover:text-[#398378] transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">Back to Dashboard</span>
                  </Link>
                  
                  <div className="h-6 w-px bg-gray-300"></div>
                  
                  <div className="flex items-center gap-2">
                    <Bot className="w-6 h-6 text-[#398378]" />
                    <h1 className="text-xl font-semibold text-gray-900">StudySpark AI Chat</h1>
                  </div>
                </div>
      
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
      
      <h2 className="text-xl font-bold mb-4 mt-2 text-gray-600 px-6">Chat History</h2>
      {conversations.length === 0 ? (
        <p className="text-gray-500">No conversations yet.</p>
      ) : (
        <ul className="space-y-3 px-6">
          {conversations.map((conv) => (
            <li key={conv._id} className="border-b border-b-gray-400 pb-2">
              <Link href={`/dashboard/chat/${conv._id}`} className="text-[#48b7a6] font-semibold hover:underline hover:decoration-gray-400">
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
