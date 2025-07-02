'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    })

    setLoading(false)

    if (res.ok) {
      alert('Registration successful. You can now log in.')
      router.push('/auth/login')
    } else {
      const data = await res.json()
      alert(data.message || 'Something went wrong')
    }
  }


  return (
    <div className='h-screen grid grid-cols-2'>
        <Image src="/chatbot.png" alt="chatbot" />

        <div className="px-30 py-15 bg-white">
          <h1 className="text-2xl font-bold mb-2 text-center text-[#398378]">Register</h1>
          <p className='mb-6 text-gray-500 text-center'>Create a new account here</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder='Your name...'
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder='Your Email...'
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder='Your password...'
                required
              />
            </div>
            <div className='flex items-center gap-2'>
                <input type="checkbox" />
                I Agree to the <span className='text-[#398378]'>Terms & Conditions of use</span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full p-3 bg-[#398378] text-white rounded-lg hover:bg-[#376059]"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>

            <p className='text-center'>Already have an account? <Link href="/auth/login" className='text-[#398378]'>Login</Link></p>
          </form>
        </div>
    </div>
  )
}
