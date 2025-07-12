// app/api/chat/history/route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Chat from "@/models/Chat";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const chats = await Chat.find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .limit(20)
      .select("_id messages createdAt")

    const formatted = chats.map(chat => ({
      _id: chat._id,
      title: chat.messages[0]?.content.length > 30 ? chat.messages[0].content.slice(0, 30) + '...' : chat.messages[0]?.content || "Untitled Chat",
      createdAt: chat.createdAt
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
