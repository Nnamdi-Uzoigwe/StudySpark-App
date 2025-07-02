import Button from "@/components/Button";
import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="bg-[#181A1A] fixed h-screen top-0 left-0 w-[300px] text-gray-100 flex flex-col  items-center">
            <div className="flex items-center mt-0 mb-10">
                <img src="/logo.png" alt="logo" />
                <span className="text-white text-xl">StudySpark</span>
            </div>

            <div className="flex flex-col items-center gap-3">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/">Back to Home</Link>
                <Link href="/dashboard/chat">Chat</Link>
                <Link href="/dashboard/recommend">Recommendations</Link>
                <Link href="/profile">Profile</Link>
            </div>
            <div className="absolute bottom-20">
                <Link href="/logout"><Button>Logout</Button></Link>
            </div>
        </div>
    )
}