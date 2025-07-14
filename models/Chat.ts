// models/Chat.ts
import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IChat extends Document {
  userEmail: string;
  messages: {
    sender: "user" | "ai";
    content: string;
    timestamp: Date;
  }[];
  createdAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    userEmail: { type: String, required: true },
    messages: [
      {
        sender: { type: String, enum: ["user", "ai"], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default models.Chat || model<IChat>("Chat", ChatSchema);
