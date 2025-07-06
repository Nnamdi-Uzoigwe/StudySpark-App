"use client"
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { signOut } from 'next-auth/react'

export default function Sidebar() {
    return (
        <div className="bg-[#181A1A] relative lg:fixed h-[80px] lg:h-screen top-0 left-0 w-[300px] text-gray-100 flex flex-col  items-center">
            <div className="hidden lg:flex items-center mt-0 mb-10">
                <Image src="/logo.png" alt="logo" width={70} height={70} />
                <span className="text-white text-xl">StudySpark</span>
            </div>

            <div className="hidden lg:flex flex-col items-center gap-3">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/">Back to Home</Link>
                <Link href="/dashboard/chat">Chat</Link>
                <Link href="/dashboard/recommend">Recommendations</Link>
                <Link href="/profile">Profile</Link>
            </div>
            <div className="absolute bottom-20" onClick={() => signOut({ callbackUrl: "/" })}>
                <Link href="/"><Button>Logout</Button></Link>
            </div>

        </div>
    )
}