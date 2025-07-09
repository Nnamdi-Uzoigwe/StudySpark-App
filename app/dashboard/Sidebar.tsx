// "use client"
// import Button from "@/components/Button";
// import Image from "next/image";
// import Link from "next/link";
// import { signOut } from 'next-auth/react'
// import { HiMenuAlt3, HiOutlineMenuAlt3 } from "react-icons/hi";
// import { useState } from "react";
// import { MdClose } from "react-icons/md";

// export default function Sidebar() {
//     const [isOpen, setIsOpen] = useState(false)

//     function handleOpen() {
//         setIsOpen(true)
//     }

//     function handleClose() {
//         setIsOpen(false)
//     }

//     return (
//         <div className="bg-[#181A1A] relative lg:fixed h-[80px] lg:h-screen top-0 left-0 w-full lg:w-[300px] text-gray-100 flex flex-col  items-center">
//             <div className="flex justify-between w-full lg:justify-center items-center mt-0 mb-10 px-4">
//                 <div className="flex items-center">
//                     <Image src="/logo.png" alt="logo" width={70} height={70} />
//                     <span className="text-white text-xl">StudySpark</span>
//                 </div>

//                 <div className="block lg:hidden" onClick={handleOpen}>
//                     <HiOutlineMenuAlt3 size={26} className="cursor-pointer"  />
//                 </div>
//             </div>

//             <div className="hidden lg:flex flex-col items-center gap-3">
//                 <Link href="/dashboard">Dashboard</Link>
//                 <Link href="/">Back to Home</Link>
//                 <Link href="/dashboard/chat">Chat</Link>
//                 <Link href="/dashboard/recommend">Recommendations</Link>
//                 <Link href="/profile">Profile</Link>
//             </div>
//             <div className="hidden lg:flex absolute bottom-20" onClick={() => signOut({ callbackUrl: "/" })}>
//                 <Link href="/"><Button>Logout</Button></Link>
//             </div>

//             {isOpen && (
//                 <div className="w-[250px] h-screen fixed z-30 left-0 top-0 bg-[#202222] flex flex-col transform transition-transform duration-300">
//                         <div className="flex items-center justify-between px-2">
//                                 <div className="flex items-center">
//                                     <Image src="/logo.png" alt="logo" width={70} height={70} />
//                                     <span className="text-white text-lg">StudySpark</span>
//                                 </div>
//                                 <div className="cursor-pointer" onClick={handleClose}>
//                                     <MdClose size={26} className="font-semibold" />
//                                 </div>
//                         </div>

//                         <div className="">
//                               <div className="flex flex-col items-center gap-3">
//                                 <Link href="/dashboard">Dashboard</Link>
//                                 <Link href="/">Back to Home</Link>
//                                 <Link href="/dashboard/chat">Chat</Link>
//                                 <Link href="/dashboard/recommend">Recommendations</Link>
//                                 <Link href="/profile">Profile</Link>
//                               </div>
//                         </div>
//                 </div>
//             )}
//         </div>
//     )
// }


"use client"

import Button from "@/components/Button"
import Image from "next/image"
import Link from "next/link"
import { signOut } from 'next-auth/react'
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { MdClose } from "react-icons/md"
import { useState } from "react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpen() {
    setIsOpen(true)
  }

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <>
      {/* Topbar for mobile */}
      <div className="lg:hidden bg-[#181A1A] fixed top-0 left-0 w-full h-[80px] px-4 flex justify-between items-center text-white z-40">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <span className="text-lg font-semibold">StudySpark</span>
        </div>
        <HiOutlineMenuAlt3
          size={28}
          className="cursor-pointer"
          onClick={handleOpen}
        />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:fixed top-0 left-0 h-screen w-[300px] bg-[#181A1A] text-white z-30 items-center pt-10">
        <div className="flex items-center gap-2 mb-8">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <span className="text-xl font-semibold">StudySpark</span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/">Back to Home</Link>
          <Link href="/dashboard/chat">Chat</Link>
          <Link href="/dashboard/recommend">Recommendations</Link>
          <Link href="/profile">Profile</Link>
        </div>

        <div className="mt-auto mb-10">
          <Button><span onClick={() => signOut({ callbackUrl: "/" })}>Logout</span></Button>
        </div>
      </div>

      {/* Mobile sliding sidebar */}
      <div className={`fixed top-0 left-0 h-full w-[250px] bg-[#202222] flex flex-col z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}>
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <span className="text-lg font-semibold text-white">StudySpark</span>
          </div>
          <MdClose
            size={26}
            className="text-white cursor-pointer"
            onClick={handleClose}
          />
        </div>

        <div className="flex flex-col items-center gap-4 mt-6 text-white">
          <Link href="/dashboard" onClick={handleClose}>Dashboard</Link>
          <Link href="/" onClick={handleClose}>Back to Home</Link>
          <Link href="/dashboard/chat" onClick={handleClose}>Chat</Link>
          <Link href="/dashboard/recommend" onClick={handleClose}>Recommendations</Link>
          <Link href="/profile" onClick={handleClose}>Profile</Link>
        </div>

        <div className="mt-10 mx-auto mb-10 px-4">
          <Button><span onClick={() => signOut({ callbackUrl: "/" })}>Logout</span></Button>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleClose}
        />
      )}
    </>
  )
}
