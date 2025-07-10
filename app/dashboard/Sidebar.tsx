// "use client"

// import Button from "@/components/Button"
// import Image from "next/image"
// import Link from "next/link"
// import { signOut } from 'next-auth/react'
// import { HiOutlineMenuAlt3 } from "react-icons/hi"
// import { MdClose } from "react-icons/md"
// import { useState } from "react"


// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false)

//   function handleOpen() {
//     setIsOpen(true)
//   }

//   function handleClose() {
//     setIsOpen(false)
//   }

//   return (
//     <>
//       {/* Topbar for mobile */}
//       <div className="lg:hidden bg-[#181A1A] fixed top-0 left-0 w-full h-[80px] px-4 flex justify-between items-center text-white z-40">
//         <div className="flex items-center gap-2">
//           <Image src="/logo.png" alt="logo" width={40} height={40} />
//           <span className="text-lg font-semibold">StudySpark</span>
//         </div>
//         <HiOutlineMenuAlt3
//           size={28}
//           className="cursor-pointer"
//           onClick={handleOpen}
//         />
//       </div>

//       {/* Desktop sidebar */}
//       <div className="hidden lg:flex lg:flex-col lg:fixed top-0 left-0 h-screen w-[300px] bg-[#181A1A] text-white z-30 items-center pt-10">
//         <div className="flex items-center gap-2 mb-8">
//           <Image src="/logo.png" alt="logo" width={50} height={50} />
//           <span className="text-xl font-semibold">StudySpark</span>
//         </div>

//         <div className="flex flex-col items-center gap-4">
//           <Link href="/dashboard">Dashboard</Link>
//           <Link href="/">Back to Home</Link>
//           <Link href="/dashboard/chat">Chat</Link>
//           <Link href="/dashboard/recommend">Recommendations</Link>
//           <Link href="/profile">Profile</Link>
//         </div>

//         <div className="mt-auto mb-10">
//           <Button><span onClick={() => signOut({ callbackUrl: "/" })}>Logout</span></Button>
//         </div>
//       </div>

//       {/* Mobile sliding sidebar */}
//       <div className={`fixed top-0 left-0 h-full w-[250px] bg-[#202222] flex flex-col z-50 transform transition-transform duration-300 ease-in-out
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}>
//         <div className="flex items-center justify-between px-4 py-4">
//           <div className="flex items-center gap-2">
//             <Image src="/logo.png" alt="logo" width={40} height={40} />
//             <span className="text-lg font-semibold text-white">StudySpark</span>
//           </div>
//           <MdClose
//             size={26}
//             className="text-white cursor-pointer"
//             onClick={handleClose}
//           />
//         </div>

//         <div className="flex flex-col items-center gap-4 mt-6 text-white">
//           <Link href="/dashboard" onClick={handleClose}>Dashboard</Link>
//           <Link href="/" onClick={handleClose}>Back to Home</Link>
//           <Link href="/dashboard/chat" onClick={handleClose}>Chat</Link>
//           <Link href="/dashboard/recommend" onClick={handleClose}>Recommendations</Link>
//           <Link href="/profile" onClick={handleClose}>Profile</Link>
//         </div>

//         <div className="mt-10 mx-auto mb-10 px-4">
//           <Button><span onClick={() => signOut({ callbackUrl: "/" })}>Logout</span></Button>
//         </div>
//       </div>

//       {/* Backdrop */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={handleClose}
//         />
//       )}
//     </>
//   )
// }

"use client"

import Button from "@/components/Button"
import Image from "next/image"
import Link from "next/link"
import { signOut } from 'next-auth/react'
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { MdClose } from "react-icons/md"
import { useState, useEffect} from "react"

// type Chat = {
//   _id: string;
//   userId: string;
//   title: string;
//   createdAt: string; // or Date
// };

// function ChatHistorySidebar() {
//   const [chats, setChats] = useState<Chat[]>([])

//   useEffect(() => {
//     const fetchChats = async () => {
//       const res = await fetch('/api/chat/history')
//       const data = await res.json()
//       setChats(data)
//     }

//     fetchChats()
//   }, [])

//   if (!chats.length) return null

//   return (
//     <div className="w-full px-6 mt-8">
//       <h3 className="text-sm font-semibold text-gray-400 mb-2">Chat History</h3>
//       <ul className="space-y-2 max-h-[200px] overflow-y-auto text-sm">
//         {chats.map(chat => (
//           <li key={chat._id}>
//             <Link
//               href={`/dashboard/chat/${chat._id}`}
//               className="block text-gray-300 hover:text-white truncate"
//             >
//               {chat.title || new Date(chat.createdAt).toLocaleString()}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

type Chat = {
  _id: string;
  userId: string;
  title: string;
  createdAt: string; // or Date
};

type Props = {
  limit?: number;
};

function ChatHistorySidebar({ limit }: Props) {
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch('/api/chat/history')
      const data = await res.json()
      setChats(data)
    }

    fetchChats()
  }, [])

  if (!chats.length) return null

  const displayedChats = limit ? chats.slice(0, limit) : chats

  return (
    <div className="w-full px-6 mt-4 flex flex-col justify-center items-center">
      <h3 className="text-md font-semibold text-gray-400 mb-2">Recent Chats</h3>
      <ul className="space-y-2 max-h-[200px] overflow-y-auto text-sm">
        {displayedChats.map(chat => (
          <li key={chat._id}>
            <Link
              href={`/dashboard/chat/${chat._id}`}
              className="block text-gray-300 text-center hover:text-white truncate"
            >
              {chat.title || new Date(chat.createdAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

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
          <Link href="/dashboard/history">Chat History</Link>
          <Link href="/dashboard/recommend">Recommendations</Link>
          <Link href="/dashboard/profile">Profile</Link>
        
          <ChatHistorySidebar limit={3} />
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
          <Link href="/dashboard/history">Chat History</Link>
          <Link href="/dashboard/recommend" onClick={handleClose}>Recommendations</Link>
          <Link href="/dashboard/profile" onClick={handleClose}>Profile</Link>
          
          <ChatHistorySidebar limit={3} />
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
