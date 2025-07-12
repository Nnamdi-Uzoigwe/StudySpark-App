'use client'

import { useEffect, useState } from 'react';
import { extractKeywords } from '@/lib/utils/topicExtractor';
import { searchBooks } from '@/lib/api/books';
import { searchYouTube } from '@/lib/api/youtube';
import { searchWikipedia } from '@/lib/api/wikipedia';
import { Settings, ArrowLeft, Bot, Maximize2 } from 'lucide-react';
import Link from 'next/link';

interface Message {
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export default function RecommendPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);

      const res = await fetch('/api/chat/all-messages');
      const messages: Message[] = await res.json();

      const userTexts = messages
        .filter(msg => msg.sender === 'user')
        .map(msg => msg.content);

      const keywords = extractKeywords(userTexts);

      const topic = keywords[0]; // Pick the most relevant one
      if (!topic) {
        setLoading(false);
        return;
      }

      const [bookResults, videoResults, articleResults] = await Promise.all([
        searchBooks(topic),
        searchYouTube(topic),
        searchWikipedia(topic),
      ]);

      setBooks(bookResults);
      setVideos(videoResults);
      setArticles(articleResults);
      setLoading(false);
    };

    fetchRecommendations();
  }, []);

  const LoadingCard = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
    </div>
  );

  const BookCard = ({ book }: { book: any }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-20 bg-gradient-to-br from-[#202222] to-[#398378] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
            📚
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 cursor-pointer transition-colors mb-2 line-clamp-2">
             <a href={book.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {book.title}
            </a>
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">By:</span> {book.authors}
          </p>
          {book.description && (
            <p className="text-sm text-gray-500 line-clamp-3">
              {book.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const VideoCard = ({ video }: { video: any }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-red-200 group">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md">
            ▶️
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors mb-2 line-clamp-2">
            <a href={video.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {video.title}
            </a>
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Channel:</span> {video.channel}
          </p>
          {video.description && (
            <p className="text-sm text-gray-500 line-clamp-3">
              {video.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const ArticleCard = ({ article }: { article: any }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 group">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md">
            📄
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-2 line-clamp-2">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {article.title}
            </a>
          </h3>
          {article.summary && (
            <p className="text-sm text-gray-500 line-clamp-4">
              {article.summary}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">

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

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-600 via-[#202222] to-[#398378] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">✨ Your StudySpark Recommendations</h1>
          <p className="text-xl opacity-90">
            Personalized learning resources based on your chat history
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#398378] transition ease-in-out duration-150 cursor-not-allowed">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading your personalized recommendations...
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Books Section */}
            {books.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#202222] to-[#398378] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      📚
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Recommended Books</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {books.map((book, i) => (
                    <BookCard key={i} book={book} />
                  ))}
                </div>
              </section>
            )}

            {/* Videos Section */}
            {videos.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      📺
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Recommended Videos</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video, i) => (
                    <VideoCard key={i} video={video} />
                  ))}
                </div>
              </section>
            )}

            {/* Articles Section */}
            {articles.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#202222] to-[#398378] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      📖
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Recommended Articles</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, i) => (
                    <ArticleCard key={i} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* Empty State */}
            {books.length === 0 && videos.length === 0 && articles.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🤔</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No recommendations yet
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Start chatting with StudySpark to get personalized learning recommendations based on your interests and questions.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}