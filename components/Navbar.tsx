"use client"
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { useState } from "react";
import { useSession } from 'next-auth/react'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession()

      function handleOpen() {
        setIsOpen(true);
      }
    
      function handleClose() {
        setIsOpen(false);
      }
    return (
        <div className="bg-[#202222] h-[80px] lg:h-[100px] px-6 lg:px-50 flex items-center justify-between">
            <div className="flex items-center">
                <Image src="/logo.png" alt="logo" width={70} height={70} />
                <span className="text-white text-xl">StudySpark</span>
            </div>

            <div className="hidden lg:flex gap-6 text-white">
                <Link href="/">Home</Link>
                <Link href="#features">Features</Link>
                <Link href="#faq">FAQs</Link>
                <Link href="/auth/login">Login</Link>
            </div>

            <div className="hidden lg:flex justify-center">
                <Button><Link href="/dashboard">{session ? "Dashboard" : "Get Started"}</Link></Button>
            </div>
             <div className="block lg:hidden">
                      <HiOutlineMenuAlt3
                        onClick={handleOpen}
                        className="cursor-pointer text-[30px] text-gray-200"
                      />
            </div>

            {isOpen && (
                <div className="fixed top-[11px] right-3 w-[50%] bg-[#464d4d] p-3 rounded-lg flex justify-between text-white">
                    <div className="flex flex-col gap-2 mt-4">
                        <div className="flex flex-col gap-2 mt-6 text-lg">
                            <Link href="/" onClick={handleClose}>Home</Link>
                            <Link href="#features" onClick={handleClose}>Features</Link>
                            <Link href="#faq" onClick={handleClose}>FAQs</Link>
                            <Link href="/auth/login" onClick={handleClose}>Login</Link>
                        </div>
                        <Button><Link href="/dashboard">{session ? 'Dashboard' : 'Get Started'}</Link></Button>
                    </div>
                    <div onClick={handleClose}>
                        <MdClose size={30} />
                    </div>
                </div>
            )}
        </div>
    )
}