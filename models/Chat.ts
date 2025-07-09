// import mongoose, { Schema, Document } from 'mongoose';
// import { IChat, IMessage, IRecommendation } from '../types/chat';

// interface IChatDocument extends IChat, Document {}

// const recommendationSchema = new Schema<IRecommendation>({
//   type: {
//     type: String,
//     enum: ['course', 'video', 'ebook'],
//     required: true
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   url: {
//     type: String,
//     required: true
//   },
//   source: {
//     type: String,
//     required: true
//   },
//   metadata: {
//     type: Schema.Types.Mixed,
//     default: {}
//   }
// });

// const messageSchema = new Schema<IMessage>({
//   role: {
//     type: String,
//     enum: ['user', 'assistant'],
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   },
//   recommendations: [recommendationSchema]
// });

// const chatSchema = new Schema<IChatDocument>({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   title: {
//     type: String,
//     default: 'New Chat'
//   },
//   messages: [messageSchema],
//   lastActivity: {
//     type: Date,
//     default: Date.now
//   },
//   tags: [String],
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });

// // Index for better query performance
// chatSchema.index({ userId: 1, lastActivity: -1 });

// export default mongoose.models.Chat || mongoose.model<IChatDocument>('Chat', chatSchema);

import mongoose, { Schema, Document, Model } from 'mongoose';
import { IChat, IMessage, IRecommendation } from '../types/chat';

interface IChatDocument extends Document {
  userId: mongoose.Types.ObjectId;
  title?: string;
  messages: IMessage[];
  lastActivity?: Date;
  tags?: string[];
  isActive?: boolean;
}

// Define recommendation schema
const recommendationSchema = new Schema<IRecommendation>({
  type: {
    type: String,
    enum: ['course', 'video', 'ebook'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {}
  }
}, { _id: false });

// Define message schema
const messageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  recommendations: [recommendationSchema]
}, { _id: false });

// Define main chat schema
const chatSchema = new Schema<IChatDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'New Chat'
  },
  messages: [messageSchema],
  lastActivity: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add index to optimize user chat queries
chatSchema.index({ userId: 1, lastActivity: -1 });

const ChatModel: Model<IChatDocument> = mongoose.models.Chat || mongoose.model<IChatDocument>('Chat', chatSchema);

export default ChatModel;
