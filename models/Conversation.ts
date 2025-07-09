import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
  userId: string;
  title: string;
  createdAt: Date;
}

const ConversationSchema: Schema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Conversation ||
  mongoose.model<IConversation>('Conversation', ConversationSchema);
