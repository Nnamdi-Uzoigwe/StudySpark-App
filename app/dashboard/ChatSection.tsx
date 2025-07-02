// // export default function ChatSection() {
// //     return (
// //         <div className="border-2 border-black py-[260px] flex justify-center">Chat Section</div>
// //     )
// // }

// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { Send, Bot, User } from 'lucide-react'

// interface Message {
//   id: string
//   content: string
//   sender: 'user' | 'ai'
//   timestamp: Date
// }

// export default function ChatSection() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       content: "Hello! I'm StudySpark AI. I'm here to help you with your studies. What would you like to learn about today?",
//       sender: 'ai',
//       timestamp: new Date()
//     }
//   ])
//   const [inputMessage, setInputMessage] = useState('')
//   const [isTyping, setIsTyping] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const sendMessage = async () => {
//     if (!inputMessage.trim()) return

//     // Add user message
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       content: inputMessage,
//       sender: 'user',
//       timestamp: new Date()
//     }

//     setMessages(prev => [...prev, userMessage])
//     setInputMessage('')
//     setIsTyping(true)

//     // Simulate AI response (replace with actual API call later)
//     setTimeout(() => {
//       const aiMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: "Thanks for your message! I'm still learning how to help you better. This is where I'll provide study assistance, explanations, and answer your questions.",
//         sender: 'ai',
//         timestamp: new Date()
//       }
//       setMessages(prev => [...prev, aiMessage])
//       setIsTyping(false)
//     }, 1500)
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault()
//       sendMessage()
//     }
//   }

//   return (
//     <div className="bg-gray-50 h-[600px] flex flex-col border border-gray-300">
//       {/* Chat Header */}
//       <div className="bg-[#398378] text-white p-4">
//         <h2 className="text-lg font-semibold flex items-center gap-2">
//           <Bot className="w-5 h-5" />
//           StudySpark AI Assistant
//         </h2>
//         <p className="text-sm opacity-90">Ask me anything about your studies!</p>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`max-w-[70%] rounded-lg p-3 ${
//                 message.sender === 'user'
//                   ? 'bg-[#398378] text-white rounded-br-sm'
//                   : 'bg-white border rounded-bl-sm shadow-sm'
//               }`}
//             >
//               <div className="flex items-start gap-2">
//                 {message.sender === 'ai' && (
//                   <Bot className="w-4 h-4 mt-1 text-[#398378] flex-shrink-0" />
//                 )}
//                 <div className="flex-1">
//                   <p className="text-sm leading-relaxed">{message.content}</p>
//                   <span className={`text-xs mt-1 block ${
//                     message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
//                   }`}>
//                     {message.timestamp.toLocaleTimeString([], { 
//                       hour: '2-digit', 
//                       minute: '2-digit' 
//                     })}
//                   </span>
//                 </div>
//                 {message.sender === 'user' && (
//                   <User className="w-4 h-4 mt-1 text-green-100 flex-shrink-0" />
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Typing Indicator */}
//         {isTyping && (
//           <div className="flex justify-start">
//             <div className="bg-white border rounded-lg p-3 rounded-bl-sm shadow-sm max-w-[70%]">
//               <div className="flex items-center gap-2">
//                 <Bot className="w-4 h-4 text-[#398378]" />
//                 <div className="flex space-x-1">
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="border-t bg-white p-4 rounded-b-lg">
//         <div className="flex gap-2">
//           <div className="flex-1 relative">
//             <textarea
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask me anything about your studies..."
//               className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#398378] focus:border-transparent"
//               rows={1}
//               style={{ 
//                 minHeight: '44px',
//                 maxHeight: '120px'
//               }}
//             />
//           </div>
//           <button
//             onClick={sendMessage}
//             disabled={!inputMessage.trim() || isTyping}
//             className="bg-[#398378] text-white p-3 rounded-lg hover:bg-[#376059] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
//           >
//             <Send className="w-4 h-4" />
//           </button>
//         </div>
        
//         <div className="mt-2 text-xs text-gray-500 text-center">
//           Press Enter to send, Shift+Enter for new line
//         </div>
//       </div>
//     </div>
//   )
// }



// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { Send, Bot, User } from 'lucide-react'

// interface Message {
//   id: string
//   content: string
//   sender: 'user' | 'ai'
//   timestamp: Date
// }

// export default function ChatSection() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       content: "Hello! I'm StudySpark AI. I'm here to help you with your studies, recommend courses, and guide you through your learning journey. What would you like to learn about today?",
//       sender: 'ai',
//       timestamp: new Date()
//     }
//   ])
//   const [inputMessage, setInputMessage] = useState('')
//   const [isTyping, setIsTyping] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   // Function to call Gemini API
//   const callGeminiAPI = async (userMessage: string): Promise<string> => {
//     try {
//       // Replace with your actual API key
//       const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      
//       if (!API_KEY) {
//         throw new Error('API key not found')
//       }

//       const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`

//       // Create a context-aware prompt for educational assistance
//       const systemPrompt = `You are StudySpark AI, a helpful university learning assistant. Your role is to:
// - Help students understand complex concepts
// - Recommend courses based on their interests and goals
// - Provide study tips and strategies
// - Explain academic topics clearly
// - Guide students through their learning journey
// - Suggest prerequisite courses when needed

// Keep responses helpful, encouraging, and educational. If asked about course recommendations, consider the student's level, interests, and career goals.

// Student's message: ${userMessage}`

//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: systemPrompt
//                 }
//               ]
//             }
//           ],
//           generationConfig: {
//             temperature: 0.7,
//             topK: 40,
//             topP: 0.95,
//             maxOutputTokens: 1024,
//           }
//         })
//       })

//       if (!response.ok) {
//         throw new Error(`API request failed: ${response.status}`)
//       }

//       const data = await response.json()
      
//       if (data.candidates && data.candidates[0] && data.candidates[0].content) {
//         return data.candidates[0].content.parts[0].text
//       } else {
//         throw new Error('Invalid response format')
//       }
//     } catch (error) {
//       console.error('Error calling Gemini API:', error)
//       return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment. In the meantime, feel free to ask me about study tips, course recommendations, or any academic topics!"
//     }
//   }

//   const sendMessage = async () => {
//     if (!inputMessage.trim()) return

//     // Add user message
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       content: inputMessage,
//       sender: 'user',
//       timestamp: new Date()
//     }

//     setMessages(prev => [...prev, userMessage])
//     const currentMessage = inputMessage
//     setInputMessage('')
//     setIsTyping(true)

//     try {
//       // Call Gemini API
//       const aiResponse = await callGeminiAPI(currentMessage)
      
//       const aiMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: aiResponse,
//         sender: 'ai',
//         timestamp: new Date()
//       }
      
//       setMessages(prev => [...prev, aiMessage])
//     } catch (error) {
//       console.error('Error:', error)
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: "I apologize, but I'm experiencing some technical difficulties. Please try again later!",
//         sender: 'ai',
//         timestamp: new Date()
//       }
//       setMessages(prev => [...prev, errorMessage])
//     } finally {
//       setIsTyping(false)
//     }
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault()
//       sendMessage()
//     }
//   }

//   return (
//     <div className="bg-gray-50 h-[600px] flex flex-col border border-gray-300">
//       {/* Chat Header */}
//       <div className="bg-[#398378] text-white p-4">
//         <h2 className="text-lg font-semibold flex items-center gap-2">
//           <Bot className="w-5 h-5" />
//           StudySpark AI Assistant
//         </h2>
//         <p className="text-sm opacity-90">Ask me about courses, study tips, or any academic topic!</p>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`max-w-[70%] rounded-lg p-3 ${
//                 message.sender === 'user'
//                   ? 'bg-[#398378] text-white rounded-br-sm'
//                   : 'bg-white border rounded-bl-sm shadow-sm'
//               }`}
//             >
//               <div className="flex items-start gap-2">
//                 {message.sender === 'ai' && (
//                   <Bot className="w-4 h-4 mt-1 text-[#398378] flex-shrink-0" />
//                 )}
//                 <div className="flex-1">
//                   <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
//                   <span className={`text-xs mt-1 block ${
//                     message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
//                   }`}>
//                     {message.timestamp.toLocaleTimeString([], { 
//                       hour: '2-digit', 
//                       minute: '2-digit' 
//                     })}
//                   </span>
//                 </div>
//                 {message.sender === 'user' && (
//                   <User className="w-4 h-4 mt-1 text-green-100 flex-shrink-0" />
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Typing Indicator */}
//         {isTyping && (
//           <div className="flex justify-start">
//             <div className="bg-white border rounded-lg p-3 rounded-bl-sm shadow-sm max-w-[70%]">
//               <div className="flex items-center gap-2">
//                 <Bot className="w-4 h-4 text-[#398378]" />
//                 <div className="flex space-x-1">
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="border-t bg-white p-4 rounded-b-lg">
//         <div className="flex gap-2">
//           <div className="flex-1 relative">
//             <textarea
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask me about courses, study strategies, or any academic topic..."
//               className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#398378] focus:border-transparent"
//               rows={1}
//               style={{ 
//                 minHeight: '44px',
//                 maxHeight: '120px'
//               }}
//             />
//           </div>
//           <button
//             onClick={sendMessage}
//             disabled={!inputMessage.trim() || isTyping}
//             className="bg-[#398378] text-white p-3 rounded-lg hover:bg-[#376059] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
//           >
//             <Send className="w-4 h-4" />
//           </button>
//         </div>
        
//         <div className="mt-2 text-xs text-gray-500 text-center">
//           Press Enter to send, Shift+Enter for new line
//         </div>
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { Send, Bot, User } from 'lucide-react'

// interface Message {
//   id: string
//   content: string
//   sender: 'user' | 'ai'
//   timestamp: Date
// }

// export default function ChatSection() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       content: "Hello! I'm StudySpark AI. I'm here to help you with your studies, recommend courses, and guide you through your learning journey. What would you like to learn about today?",
//       sender: 'ai',
//       timestamp: new Date()
//     }
//   ])
//   const [inputMessage, setInputMessage] = useState('')
//   const [isTyping, setIsTyping] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   // Function to call Groq API with Llama 3.1
//   const callGroqAPI = async (userMessage: string): Promise<string> => {
//     try {
//       // Replace with your actual API key
//       const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY
      
//       if (!API_KEY) {
//         throw new Error('API key not found')
//       }

//       const API_URL = 'https://api.groq.com/openai/v1/chat/completions'

//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'llama-3.1-70b-versatile', // You can also use 'llama-3.1-8b-instant' for faster responses
//           messages: [
//             {
//               role: 'system',
//               content: `You are StudySpark AI, a friendly and helpful university learning assistant. Your personality is:
// - Conversational and approachable, not overly formal
// - Encouraging and supportive
// - Clear and concise in explanations
// - Knowledgeable about academic topics

// Your main roles are to:
// - Help students understand complex concepts with simple explanations
// - Recommend courses based on interests and career goals
// - Provide practical study tips and strategies
// - Guide students through their learning journey
// - Explain prerequisites and course connections

// Keep responses helpful but natural - like talking to a knowledgeable friend who happens to be great at teaching.`
//             },
//             {
//               role: 'user',
//               content: userMessage
//             }
//           ],
//           temperature: 0.7,
//           max_tokens: 1024,
//           top_p: 0.9,
//           stream: false
//         })
//       })

//       if (!response.ok) {
//         throw new Error(`API request failed: ${response.status}`)
//       }

//       const data = await response.json()
      
//       if (data.choices && data.choices[0] && data.choices[0].message) {
//         return data.choices[0].message.content
//       } else {
//         throw new Error('Invalid response format')
//       }
//     } catch (error) {
//       console.error('Error calling Groq API:', error)
//       return "Hey! I'm having some technical difficulties right now. Give me a moment and try again - I'm usually pretty quick to respond! 😊"
//     }
//   }

//   const sendMessage = async () => {
//     if (!inputMessage.trim()) return

//     // Add user message
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       content: inputMessage,
//       sender: 'user',
//       timestamp: new Date()
//     }

//     setMessages(prev => [...prev, userMessage])
//     const currentMessage = inputMessage
//     setInputMessage('')
//     setIsTyping(true)

//     try {
//       // Call Groq API
//       const aiResponse = await callGroqAPI(currentMessage)
      
//       const aiMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: aiResponse,
//         sender: 'ai',
//         timestamp: new Date()
//       }
      
//       setMessages(prev => [...prev, aiMessage])
//     } catch (error) {
//       console.error('Error:', error)
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: "I apologize, but I'm experiencing some technical difficulties. Please try again later!",
//         sender: 'ai',
//         timestamp: new Date()
//       }
//       setMessages(prev => [...prev, errorMessage])
//     } finally {
//       setIsTyping(false)
//     }
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault()
//       sendMessage()
//     }
//   }

//   return (
//     <div className="bg-gray-50 h-[600px] flex flex-col border border-gray-300">
//       {/* Chat Header */}
//       <div className="bg-[#398378] text-white p-4">
//         <h2 className="text-lg font-semibold flex items-center gap-2">
//           <Bot className="w-5 h-5" />
//           StudySpark AI Assistant
//         </h2>
//         <p className="text-sm opacity-90">Ask me about courses, study tips, or any academic topic!</p>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`max-w-[70%] rounded-lg p-3 ${
//                 message.sender === 'user'
//                   ? 'bg-[#398378] text-white rounded-br-sm'
//                   : 'bg-white border rounded-bl-sm shadow-sm'
//               }`}
//             >
//               <div className="flex items-start gap-2">
//                 {message.sender === 'ai' && (
//                   <Bot className="w-4 h-4 mt-1 text-[#398378] flex-shrink-0" />
//                 )}
//                 <div className="flex-1">
//                   <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
//                   <span className={`text-xs mt-1 block ${
//                     message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
//                   }`}>
//                     {message.timestamp.toLocaleTimeString([], { 
//                       hour: '2-digit', 
//                       minute: '2-digit' 
//                     })}
//                   </span>
//                 </div>
//                 {message.sender === 'user' && (
//                   <User className="w-4 h-4 mt-1 text-green-100 flex-shrink-0" />
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Typing Indicator */}
//         {isTyping && (
//           <div className="flex justify-start">
//             <div className="bg-white border rounded-lg p-3 rounded-bl-sm shadow-sm max-w-[70%]">
//               <div className="flex items-center gap-2">
//                 <Bot className="w-4 h-4 text-[#398378]" />
//                 <div className="flex space-x-1">
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="border-t bg-white p-4 rounded-b-lg">
//         <div className="flex gap-2">
//           <div className="flex-1 relative">
//             <textarea
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask me about courses, study strategies, or any academic topic..."
//               className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#398378] focus:border-transparent"
//               rows={1}
//               style={{ 
//                 minHeight: '44px',
//                 maxHeight: '120px'
//               }}
//             />
//           </div>
//           <button
//             onClick={sendMessage}
//             disabled={!inputMessage.trim() || isTyping}
//             className="bg-[#398378] text-white p-3 rounded-lg hover:bg-[#376059] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
//           >
//             <Send className="w-4 h-4" />
//           </button>
//         </div>
        
//         <div className="mt-2 text-xs text-gray-500 text-center">
//           Press Enter to send, Shift+Enter for new line
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, BookOpen, Video, ExternalLink } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  resources?: {
    books?: any[]
    videos?: any[]
    articles?: any[]
  }
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm StudySpark AI. I can help you with your studies and find real books, videos, and articles for any topic. What would you like to learn about today?",
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

  // YouTube Data API
  const searchYouTube = async (query: string) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
      if (!API_KEY) return []

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' tutorial course')}&type=video&maxResults=3&key=${API_KEY}`
      )
      
      if (!response.ok) return []
      
      const data = await response.json()
      return data.items?.map((item: any) => ({
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails.default.url,
        channel: item.snippet.channelTitle
      })) || []
    } catch (error) {
      console.error('YouTube API error:', error)
      return []
    }
  }

  // Google Books API
  const searchBooks = async (query: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=3&printType=books`
      )
      
      if (!response.ok) return []
      
      const data = await response.json()
      return data.items?.map((item: any) => ({
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors?.join(', ') || 'Unknown Author',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail,
        previewLink: item.volumeInfo.previewLink,
        infoLink: item.volumeInfo.infoLink
      })) || []
    } catch (error) {
      console.error('Books API error:', error)
      return []
    }
  }

  // Wikipedia API for articles
  const searchWikipedia = async (query: string) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/search?q=${encodeURIComponent(query)}&limit=3`
      )
      
      if (!response.ok) return []
      
      const data = await response.json()
      return data.pages?.map((page: any) => ({
        title: page.title,
        description: page.description,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.key)}`,
        thumbnail: page.thumbnail?.source
      })) || []
    } catch (error) {
      console.error('Wikipedia API error:', error)
      return []
    }
  }

  // Function to call Groq API
  const callGroqAPI = async (userMessage: string): Promise<string> => {
    try {
//       const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY
      
//       if (!API_KEY) {
//         throw new Error('Groq API key not found')
//       }

//       const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'llama3-8b-8192',
//           messages: [
//             {
//               role: 'system',
//               content: `You are StudySpark AI, a friendly university learning assistant. You help students learn by:
// - Providing clear explanations of concepts
// - Recommending study strategies
// - Answering academic questions
// - Being encouraging and supportive

// Keep responses conversational and helpful. When you mention topics, I'll automatically search for relevant books, videos, and articles to show the student.`
//             },
//             {
//               role: 'user',
//               content: userMessage
//             }
//           ],
//           temperature: 0.7,
//           max_tokens: 500
//         })
//       })
 const response = await fetch('api/groq', { // Call your own API route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'user',
            content: userMessage
          }
        ],
      }),
    });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error('Error calling Groq API:', error)
      return "I'm having some technical difficulties right now. Please try again in a moment!"
    }
  }

  // Extract key topics from user message for search
  const extractSearchTopics = (message: string): string[] => {
    // Simple keyword extraction - you can make this more sophisticated
    const educationalKeywords = [
      'learn', 'study', 'understand', 'explain', 'course', 'tutorial', 
      'book', 'video', 'guide', 'how to', 'what is', 'introduction to'
    ]
    
    const words = message.toLowerCase().split(/\s+/)
    const topics = []
    
    // Look for educational phrases
    if (words.some(word => educationalKeywords.includes(word))) {
      // Extract the main topic (simplified approach)
      const topicWords = words.filter(word => 
        word.length > 3 && 
        !educationalKeywords.includes(word) &&
        !['the', 'and', 'for', 'with', 'about', 'from'].includes(word)
      )
      
      if (topicWords.length > 0) {
        topics.push(topicWords.slice(0, 3).join(' '))
      }
    }
    
    return topics
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentMessage = inputMessage
    setInputMessage('')
    setIsTyping(true)

    try {
      // Get AI response
      const aiResponse = await callGroqAPI(currentMessage)
      
      // Extract topics for search
      const searchTopics = extractSearchTopics(currentMessage)
      let resources = {}
      
      // If we found topics, search for resources
      if (searchTopics.length > 0) {
        const mainTopic = searchTopics[0]
        
        const [books, videos, articles] = await Promise.all([
          searchBooks(mainTopic),
          searchYouTube(mainTopic),
          searchWikipedia(mainTopic)
        ])
        
        resources = {
          books: books.length > 0 ? books : undefined,
          videos: videos.length > 0 ? videos : undefined,
          articles: articles.length > 0 ? articles : undefined
        }
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        resources: Object.keys(resources).length > 0 ? resources : undefined
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again later!",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="bg-gray-50 h-[600px] flex flex-col border border-gray-300">
      {/* Chat Header */}
      <div className="bg-[#398378] text-white p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5" />
          StudySpark AI Assistant
        </h2>
        <p className="text-sm opacity-90">Ask me anything - I'll find real books, videos, and articles for you!</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="space-y-3">
            <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-[#398378] text-white rounded-br-sm'
                    : 'bg-white border rounded-bl-sm shadow-sm'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === 'ai' && (
                    <Bot className="w-4 h-4 mt-1 text-[#398378] flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <span className={`text-xs mt-1 block ${
                      message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <User className="w-4 h-4 mt-1 text-green-100 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>

            {/* Resources Section */}
            {message.sender === 'ai' && message.resources && (
              <div className="ml-8 space-y-3">
                {/* Books */}
                {message.resources.books && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="font-semibold text-blue-800 flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4" />
                      Recommended Books
                    </h4>
                    <div className="space-y-2">
                      {message.resources.books.map((book: any, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          {book.thumbnail && (
                            <img src={book.thumbnail} alt="" className="w-12 h-16 object-cover rounded" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-sm">{book.title}</p>
                            <p className="text-xs text-gray-600">{book.authors}</p>
                            <div className="flex gap-2 mt-1">
                              {book.previewLink && (
                                <a 
                                  href={book.previewLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  Preview <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                              {book.infoLink && (
                                <a 
                                  href={book.infoLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  More Info <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Videos */}
                {message.resources.videos && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h4 className="font-semibold text-red-800 flex items-center gap-2 mb-2">
                      <Video className="w-4 h-4" />
                      Video Tutorials
                    </h4>
                    <div className="space-y-2">
                      {message.resources.videos.map((video: any, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          {video.thumbnail && (
                            <img src={video.thumbnail} alt="" className="w-16 h-12 object-cover rounded" />
                          )}
                          <div className="flex-1">
                            <a 
                              href={video.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-medium text-sm text-red-700 hover:underline line-clamp-2"
                            >
                              {video.title}
                            </a>
                            <p className="text-xs text-gray-600">{video.channel}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Articles */}
                {message.resources.articles && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-2">
                      <ExternalLink className="w-4 h-4" />
                      Articles & References
                    </h4>
                    <div className="space-y-2">
                      {message.resources.articles.map((article: any, index: number) => (
                        <div key={index}>
                          <a 
                            href={article.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium text-sm text-green-700 hover:underline"
                          >
                            {article.title}
                          </a>
                          {article.description && (
                            <p className="text-xs text-gray-600 mt-1">{article.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border rounded-lg p-3 rounded-bl-sm shadow-sm max-w-[70%]">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#398378]" />
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
      <div className="border-t bg-white p-4 rounded-b-lg">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about any topic - I'll find books, videos, and articles for you!"
              className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#398378] focus:border-transparent"
              rows={1}
              style={{ 
                minHeight: '44px',
                maxHeight: '120px'
              }}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-[#398378] text-white p-3 rounded-lg hover:bg-[#376059] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-center">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  )
}