"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  BookOpen,
  Video,
  ExternalLink,
  ArrowLeft,
  Maximize2,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Book,
  Videos,
  Article,
  YouTubeAPIItem,
  WikipediaArticle,
  GoogleBooksAPIItem,
} from "@/types/resources";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  resources?: {
    books?: Book[];
    videos?: Videos[];
    articles?: Article[];
  };
  shouldRecommend?: boolean;
}

interface WikipediaSearchItem {
  title: string;
  snippet: string;
  pageid: number;
  size: number;
  wordcount: number;
  timestamp: string;
}


export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm StudySpark AI. I can help you with your studies and find real books, videos, and articles when you need recommendations. Just ask me to recommend materials for any topic! What would you like to learn about today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // YouTube Data API
  const searchYouTube = async (query: string) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      if (!API_KEY) return [];

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query + " tutorial course"
        )}&type=video&maxResults=3&key=${API_KEY}`
      );

      if (!response.ok) return [];

      const data = await response.json();
      return (
        (data.items as YouTubeAPIItem[])?.map(
          (item): Videos => ({
            title: item.snippet.title,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            thumbnail: item.snippet.thumbnails.default.url,
            channel: item.snippet.channelTitle,
          })
        ) || []
      );
    } catch (error) {
      console.error("YouTube API error:", error);
      return [];
    }
  };

  // Google Books API
  const searchBooks = async (query: string): Promise<Book[]> => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=3&printType=books`
      );

      if (!response.ok) return [];

      const data = await response.json();

      return (
        (data.items as GoogleBooksAPIItem[])?.map(
          (item): Book => ({
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors?.join(", ") || "Unknown Author",
            thumbnail: item.volumeInfo.imageLinks?.thumbnail,
            previewLink: item.volumeInfo.previewLink,
            infoLink: item.volumeInfo.infoLink,
          })
        ) || []
      );
    } catch (error) {
      console.error("Books API error:", error);
      return [];
    }
  };

  // Wikipedia API for articles
  const searchWikipedia = async (query: string, limit: number = 4): Promise<WikipediaArticle[]> => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=${limit}&utf8=&format=json&origin=*`
        );
    
        if (!response.ok) return [];
    
        const data = await response.json();
    
        return (data.query.search || []).map((item: WikipediaSearchItem): WikipediaArticle => ({
          title: item.title,
          description: item.snippet.replace(/<[^>]+>/g, ''),
          url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`
        }));
      } catch (error) {
        console.error('Wikipedia API error:', error);
        return [];
      }
    };
  // Function to call Groq API
    // FIXED: Function to call Groq API with full conversation history
  const callGroqAPI = async (chatHistory: Array<{role: string, content: string}>): Promise<string> => {
    try {
      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: chatHistory, // Send full conversation history
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error('Error calling Groq API:', error)
      return "I'm having some technical difficulties right now. Please try again in a moment!"
    }
  }

  // Enhanced recommendation detection
  const shouldRecommendResources = (message: string): boolean => {
    const lowercaseMessage = message.toLowerCase();

    // Explicit recommendation requests
    const recommendationTriggers = [
      "recommend",
      "suggest",
      "find me",
      "show me",
      "i need",
      "looking for",
      "help me find",
      "what books",
      "what videos",
      "good resources",
      "study materials",
      "learning materials",
      "where can i",
      "best books",
      "best videos",
      "best courses",
      "resources for",
      "materials for",
      "content for",
      "give me some",
      "can you find",
      "any suggestions",
      "point me to",
      "direct me to",
    ];

    // Question patterns that typically want recommendations
    const questionPatterns = [
      "what should i read",
      "what should i watch",
      "what should i study",
      "how can i learn",
      "where do i start",
      "what are good",
      "what are the best",
    ];

    return (
      recommendationTriggers.some((trigger) =>
        lowercaseMessage.includes(trigger)
      ) ||
      questionPatterns.some((pattern) => lowercaseMessage.includes(pattern))
    );
  };

  // Extract topic from recommendation request
  const extractTopicFromRequest = (message: string): string | null => {
    const lowercaseMessage = message.toLowerCase();

    // Common patterns to extract topics
    const patterns = [
      /recommend.*?(?:about|on|for|regarding)\s+(.*?)(?:\?|$|\.)/i,
      /suggest.*?(?:about|on|for|regarding)\s+(.*?)(?:\?|$|\.)/i,
      /find.*?(?:about|on|for|regarding)\s+(.*?)(?:\?|$|\.)/i,
      /(?:books|videos|materials|resources|courses).*?(?:about|on|for|regarding)\s+(.*?)(?:\?|$|\.)/i,
      /(?:learn|study|understand)\s+(.*?)(?:\?|$|\.)/i,
      /(?:i need|looking for|help with)\s+(.*?)(?:\?|$|\.)/i,
    ];

    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    // Fallback: look for key subject words
    const subjects = [
      "math",
      "mathematics",
      "calculus",
      "algebra",
      "geometry",
      "physics",
      "chemistry",
      "biology",
      "science",
      "history",
      "literature",
      "english",
      "writing",
      "programming",
      "coding",
      "javascript",
      "python",
      "web development",
      "business",
      "economics",
      "marketing",
      "finance",
      "psychology",
      "philosophy",
      "sociology",
      "art",
      "music",
      "design",
      "photography",
    ];

    const foundSubjects = subjects.filter((subject) =>
      lowercaseMessage.includes(subject)
    );

    return foundSubjects.length > 0 ? foundSubjects[0] : null;
  };

  // Generate suggestion prompt for users
  const generateSuggestionPrompt = (userMessage: string): string => {
    const hasQuestionMark = userMessage.includes("?");
    const isGeneralTopic = !shouldRecommendResources(userMessage);

    if (isGeneralTopic && hasQuestionMark) {
      return '\n\n💡 *Tip: If you\'d like me to recommend specific books, videos, or articles about this topic, just ask me to "recommend materials for [topic]" or "suggest resources for [topic]"!*';
    }

    return "";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const currentMessage = inputMessage;
    const timestamp = new Date();

    const userMessage: Message = {
      id: timestamp.getTime().toString(),
      content: currentMessage,
      sender: 'user',
      timestamp,
    };

    // Immediately show user message
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Check if we should recommend resources
      const needsRecommendations = shouldRecommendResources(currentMessage);
      
      // FIXED: Build full conversation history including the new user message
      const chatHistory = [...messages, userMessage].map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }));

      // Call Groq API with full conversation history
      const aiText = await callGroqAPI(chatHistory);

      const responseWithSuggestion = aiText + generateSuggestionPrompt(currentMessage);

      let resources = {};
      if (needsRecommendations) {
        const topic = extractTopicFromRequest(currentMessage);
        if (topic) {
          const [books, videos, articles] = await Promise.all([
            searchBooks(topic),
            searchYouTube(topic),
            searchWikipedia(topic),
          ]);
          resources = {
            books: books.length ? books : undefined,
            videos: videos.length ? videos : undefined,
            articles: articles.length ? articles : undefined,
          };
        }
      }

      const aiMessage: Message = {
        id: (timestamp.getTime() + 1).toString(),
        content: responseWithSuggestion,
        sender: 'ai',
        timestamp: new Date(),
        resources: Object.keys(resources).length > 0 ? resources : undefined,
        shouldRecommend: needsRecommendations,
      };

      // Append AI message to UI
      setMessages((prev) => [...prev, aiMessage]);

      // Save user message
      const saveUserRes = await fetch('/api/chat/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: userMessage.content,
          sender: userMessage.sender,
          conversationId: conversationId, // may be null initially
        }),
      });

      const saveUserData = await saveUserRes.json();

      // If new conversation started, save ID
      if (!conversationId && saveUserData.conversationId) {
        setConversationId(saveUserData.conversationId);
      }

      // Save AI message using the correct conversationId
      const saveAiRes = await fetch('/api/chat/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: aiMessage.content,
          sender: aiMessage.sender,
          conversationId: saveUserData.conversationId || conversationId,
        }),
      });

      // Optional: handle saveAiRes or log if needed
      await saveAiRes.json();

    } catch (error) {
      console.error('Error during message send/save:', error);

      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm having trouble responding right now. Please try again shortly.",
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col border border-gray-300">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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
              <h1 className="text-xl font-semibold text-gray-900">
                StudySpark AI Chat
              </h1>
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
      <div className="my-4 w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-80px)]">
        {/* Chat Header */}
        <div className="bg-[#202222] rounded-t-lg  text-white p-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Bot className="w-5 h-5" />
            StudySpark AI Assistant
          </h2>
          <p className="text-sm opacity-90">
            Ask me questions or request recommendations for books, videos, and
            articles!
          </p>
        </div>

        <div className=" flex-1 overflow-y-auto bg-white border-l border-r p-4 space-y-4 h-0 min-h-0">
          {messages.map((message) => (
            <div key={message.id} className="space-y-3">
              <div
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-[#398378] text-white rounded-br-sm"
                      : "bg-white border rounded-bl-sm shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === "ai" && (
                      <Bot className="w-4 h-4 mt-1 text-[#398378] flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                      <span
                        className={`text-xs mt-1 block ${
                          message.sender === "user"
                            ? "text-green-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {message.sender === "user" && (
                      <User className="w-4 h-4 mt-1 text-green-100 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>

              {/* Resources Section */}
              {message.sender === "ai" && message.resources && (
                <div className="ml-8 space-y-3">
                  {/* Books */}
                  {message.resources.books && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <h4 className="font-semibold text-blue-800 flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4" />
                        Recommended Books
                      </h4>
                      <div className="space-y-2">
                        {message.resources.books.map(
                          (book: Book, index: number) => (
                            <div key={index} className="flex items-start gap-2">
                              {book.thumbnail && (
                                <Image
                                  src={book.thumbnail}
                                  alt="thumbnail"
                                  width={48}
                                  height={48}
                                />
                              )}
                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  {book.title}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {book.authors}
                                </p>
                                <div className="flex gap-2 mt-1">
                                  {book.previewLink && (
                                    <a
                                      href={book.previewLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                      Preview{" "}
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                  {book.infoLink && (
                                    <a
                                      href={book.infoLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                      More Info{" "}
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        )}
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
                        {message.resources.videos.map(
                          (video: Videos, index: number) => (
                            <div key={index} className="flex items-start gap-2">
                              {video.thumbnail && (
                                <Image
                                  src={video.thumbnail}
                                  alt="thumbnail"
                                  width={64}
                                  height={64}
                                />
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
                                <p className="text-xs text-gray-600">
                                  {video.channel}
                                </p>
                              </div>
                            </div>
                          )
                        )}
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
                        {message.resources.articles.map(
                          (article: Article, index: number) => (
                            <div key={index}>
                              <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-sm text-green-700 hover:underline"
                              >
                                {article.title}
                              </a>
                              {article.summary && (
                                <p className="text-xs text-gray-600 mt-1">
                                  {article.summary}
                                </p>
                              )}
                            </div>
                          )
                        )}
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
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border border-t-1 bg-white p-4 rounded-b-lg">
          {/* Input Area */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything or say 'recommend materials for [topic]' to get resources!"
                className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#202222] focus:border-transparent"
                rows={1}
                style={{
                  minHeight: "44px",
                  maxHeight: "120px",
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
    </div>
  );
}
