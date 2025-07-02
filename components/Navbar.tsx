import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="bg-[#202222] h-auto lg:h-[100px] px-6 lg:px-50 pt-4 lg:pt-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between">
            <div className="flex items-center">
                <Image src="/logo.png" alt="logo" />
                <span className="text-white text-xl">StudySpark</span>
            </div>

            <div className="flex gap-6 text-white">
                <Link href="/">Home</Link>
                <Link href="#features">Features</Link>
                <Link href="#faq">FAQs</Link>
                <Link href="/auth/login">Login</Link>
            </div>

            <div className="flex justify-center lg:justify-start mt-3 lg:mt-0">
                <Button>Get Started</Button>
            </div>
        </div>
    )
}