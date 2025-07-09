// // app/api/chat/history/route.ts
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/mongodb";
// import Chat from "@/models/Chat";

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || !session.user?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await dbConnect();

//     const chats = await Chat.find({ userEmail: session.user.email })
//       .sort({ createdAt: -1 })
//       .limit(20)
//       .lean();

//     return NextResponse.json(chats);
//   } catch (error) {
//     console.error("Error fetching chat history:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// app/api/chat/history/route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Conversation from "@/models/Conversation"; // ✅ use correct model

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const conversations = await Conversation.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
