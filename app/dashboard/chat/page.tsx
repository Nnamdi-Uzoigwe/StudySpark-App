'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, ArrowLeft, Maximize2, Settings } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm StudySpark AI. I'm here to help you with your studies. What would you like to learn about today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! I'm still learning how to help you better. This is where I'll provide study assistance, explanations, and answer your questions.",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b shadow-sm p-4">
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

      {/* Main Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4">
        <div className="bg-white rounded-lg shadow-sm border h-[calc(100vh-140px)] flex flex-col">
          
          {/* Chat Header */}
          <div className="bg-[#398378] text-white p-6 rounded-t-lg">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-semibold">AI Study Assistant</h2>
                <p className="text-sm opacity-90">Your personal learning companion - ask me anything!</p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-[#398378] text-white rounded-br-sm'
                      : 'bg-gray-100 border rounded-bl-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {message.sender === 'ai' && (
                      <Bot className="w-5 h-5 mt-1 text-[#398378] flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="leading-relaxed">{message.content}</p>
                      <span className={`text-xs mt-2 block ${
                        message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    {message.sender === 'user' && (
                      <User className="w-5 h-5 mt-1 text-green-100 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 border rounded-xl p-4 rounded-bl-sm max-w-[75%]">
                  <div className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-[#398378]" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t bg-white p-6 rounded-b-lg">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your studies..."
                  className="w-full p-4 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#398378] focus:border-transparent text-sm"
                  rows={1}
                  style={{ 
                    minHeight: '52px',
                    maxHeight: '150px'
                  }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-[#398378] text-white p-4 rounded-xl hover:bg-[#376059] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[52px]"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-3 text-xs text-gray-500 text-center">
              Press Enter to send, Shift+Enter for new line • This is a dedicated chat space for focused study sessions
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
