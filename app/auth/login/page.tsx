'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
// import type { ClientSafeProvider } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  // const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [ isClosed, setIsClosed ] = useState(false)

  console.log("password", password)

  function changeStatus() {
    setIsClosed(!isClosed)
  }

  // useEffect(() => {
  //   const fetchProviders = async () => {
  //     const res = await getProviders()
  //     // setProviders(res)
  //   }
  //   fetchProviders()
  // }, [])

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Invalid credentials', {
          position: "top-center",
          autoClose: 2000
        })
      } else if (result?.ok) {
        toast.success("Login Successful", {
          position: "top-center",
          autoClose: 3000
        })

        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('An error occurred during login', {
        position: "top-center",
        autoClose: 2000
      })
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className='h-screen grid grid-cols-1 lg:grid-cols-2'>
      <div className='hidden lg:block'>
        <Image src="/chatbot.png" alt="chatbot" width={700} height={700} />
      </div>


        <div className="px-6 lg:px-30 py-15 bg-white">

          <h1 className="text-2xl font-bold mb-6 text-center text-[#389378]">Login</h1>

          <div className="my-6 text-center text-gray-500">Log in to your account</div>

          {/* Credentials Form */}
          <form onSubmit={handleCredentialsSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder='Your Email...'
                required
                disabled={isLoading}
              />
            </div>
            <div className='relative'>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={isClosed ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder='Your Password...'
                required
                disabled={isLoading}
              />
              <span onClick={changeStatus} className='cursor-pointer absolute right-4 top-9'>
                {isClosed ? <Eye size={20} /> : <EyeOff size={20} />}
              </span>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full p-3 bg-[#398378] text-white rounded-lg hover:bg-[#376059] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <p className='text-center'>Don&apos;t have an account? <Link href="/auth/register" className='text-[#398378]'>Register here</Link></p>
          </form>
          
        </div>
    </div>
  )
}