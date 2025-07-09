import { Types } from 'mongoose';

export interface IRecommendation {
  type: 'course' | 'video' | 'ebook';
  title: string;
  url: string;
  source: string;
  metadata?: {
    thumbnail?: string;
    channelTitle?: string;
    duration?: string;
    author?: string;
    rating?: number;
    [key: string]: any;
  };
}

export interface IMessage {
  _id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  recommendations?: IRecommendation[];
}

export interface IChat {
  _id: string;
  userId: string | Types.ObjectId;
  title: string;
  messages: IMessage[];
  lastActivity: Date;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatResponse {
  content: string;
  recommendations: IRecommendation[];
}

export interface CreateChatRequest {
  title?: string;
  initialMessage?: string;
}

export interface SendMessageRequest {
  message: string;
}