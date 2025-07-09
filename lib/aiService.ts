import Groq from 'groq-sdk';
import { IMessage, IRecommendation, ChatResponse } from '../types/chat';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function getAIResponse(
  userMessage: string, 
  chatHistory: IMessage[] = []
): Promise<ChatResponse> {
  try {
    // Build conversation context
    const messages = [
      {
        role: 'system' as const,
        content: 'You are a helpful AI assistant that recommends courses and learning materials to students. When recommending resources, be specific and provide actionable suggestions.'
      },
      ...chatHistory.slice(-10).map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      {
        role: 'user' as const,
        content: userMessage
      }
    ];

    // Get AI response
    const completion = await groq.chat.completions.create({
      messages,
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiResponse = completion.choices[0]?.message?.content || '';

    // Extract learning topics from the response to find recommendations
    const recommendations = await findRecommendations(aiResponse, userMessage);

    return {
      content: aiResponse,
      recommendations
    };
  } catch (error) {
    console.error('AI Response Error:', error);
    throw new Error('Failed to get AI response');
  }
}

async function findRecommendations(
  aiResponse: string, 
  userQuery: string
): Promise<IRecommendation[]> {
  const recommendations: IRecommendation[] = [];

  try {
    // Search YouTube for relevant videos
    const youtubeResults = await searchYouTube(userQuery);
    recommendations.push(...youtubeResults);

    // Search for relevant ebooks/courses
    const ebookResults = await searchEbooks(userQuery);
    recommendations.push(...ebookResults);
  } catch (error) {
    console.error('Error finding recommendations:', error);
  }

  return recommendations;
}

async function searchYouTube(query: string): Promise<IRecommendation[]> {
  if (!process.env.YOUTUBE_API_KEY) {
    console.warn('YouTube API key not configured');
    return [];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${encodeURIComponent(query)}&type=video&maxResults=3&part=snippet`
    );
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.items?.map((item: any) => ({
      type: 'video' as const,
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      source: 'youtube',
      metadata: {
        thumbnail: item.snippet.thumbnails.medium?.url,
        channelTitle: item.snippet.channelTitle
      }
    })) || [];
  } catch (error) {
    console.error('YouTube search error:', error);
    return [];
  }
}

async function searchEbooks(query: string): Promise<IRecommendation[]> {
  // Implement your ebook API search here
  // This is a placeholder - replace with your actual ebook API
  try {
    // Example with Google Books API
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=3`
    );
    
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    
    return data.items?.map((item: any) => ({
      type: 'ebook' as const,
      title: item.volumeInfo.title,
      url: item.volumeInfo.previewLink || item.volumeInfo.infoLink,
      source: 'google-books',
      metadata: {
        author: item.volumeInfo.authors?.join(', '),
        thumbnail: item.volumeInfo.imageLinks?.thumbnail,
        rating: item.volumeInfo.averageRating
      }
    })) || [];
  } catch (error) {
    console.error('Ebook search error:', error);
    return [];
  }
}