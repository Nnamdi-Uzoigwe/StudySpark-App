"use client"
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { signOut } from 'next-auth/react'
import { HiMenuAlt3, HiOutlineMenuAlt3 } from "react-icons/hi";

export default function Sidebar() {
    return (
        <div className="bg-[#181A1A] relative lg:fixed h-[80px] lg:h-screen top-0 left-0 w-full lg:w-[300px] text-gray-100 flex flex-col  items-center">
            <div className="flex justify-between w-full lg:justify-center items-center mt-0 mb-10 px-4">
                <div className="flex items-center">
                    <Image src="/logo.png" alt="logo" width={70} height={70} />
                    <span className="text-white text-xl">StudySpark</span>
                </div>

                <div className="block lg:hidden">
                    <HiOutlineMenuAlt3 size={26} className="cursor-pointer"  />
                </div>
            </div>

            <div className="hidden lg:flex flex-col items-center gap-3">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/">Back to Home</Link>
                <Link href="/dashboard/chat">Chat</Link>
                <Link href="/dashboard/recommend">Recommendations</Link>
                <Link href="/profile">Profile</Link>
            </div>
            <div className="hidden lg:absolute bottom-20" onClick={() => signOut({ callbackUrl: "/" })}>
                <Link href="/"><Button>Logout</Button></Link>
            </div>

        </div>
    )
}

// 'use client'

// import { useState } from 'react'
// import Button from '@/components/Button'
// import Image from 'next/image'
// import Link from 'next/link'
// import { signOut } from 'next-auth/react'
// import { HiOutlineMenuAlt3 } from 'react-icons/hi'
// import { MdClose } from 'react-icons/md'

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <>
//       {/* Top bar for mobile */}
//       <div className="lg:hidden bg-[#181A1A] h-[80px] w-full px-4 flex justify-between items-center text-white fixed z-30">
//         <div className="flex items-center gap-2">
//           <Image src="/logo.png" alt="logo" width={40} height={40} />
//           <span className="text-lg font-semibold">StudySpark</span>
//         </div>
//         <HiOutlineMenuAlt3
//           onClick={() => setIsOpen(true)}
//           className="text-3xl cursor-pointer"
//         />
//       </div>

//       {/* Sidebar */}
//       <div className={`bg-[#181A1A] z-40 text-white fixed top-0 left-0 h-full w-[250px] transform transition-transform duration-300
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:h-screen lg:w-[300px] lg:flex lg:flex-col items-center`}>
//         {/* Close icon for mobile */}
//         <div className="lg:hidden absolute top-5 right-5">
//           <MdClose
//             size={24}
//             className="cursor-pointer"
//             onClick={() => setIsOpen(false)}
//           />
//         </div>

//         {/* Logo */}
//         <div className="flex items-center gap-2 mt-6 lg:mt-10 mb-10 justify-center">
//           <Image src="/logo.png" alt="logo" width={50} height={50} />
//           <span className="text-xl font-semibold">StudySpark</span>
//         </div>

//         {/* Navigation Links */}
//         <div className="flex flex-col items-center gap-4 mt-4">
//           <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
//           <Link href="/" onClick={() => setIsOpen(false)}>Back to Home</Link>
//           <Link href="/dashboard/chat" onClick={() => setIsOpen(false)}>Chat</Link>
//           <Link href="/dashboard/recommend" onClick={() => setIsOpen(false)}>Recommendations</Link>
//           <Link href="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
//         </div>

//         {/* Logout button */}
//         <div className="mt-auto mb-10">
//           <Button><Link href="/" onClick={() => signOut({ callbackUrl: "/" })}>Logout</Link></Button>
//         </div>
//       </div>
//     </>
//   )
// }
