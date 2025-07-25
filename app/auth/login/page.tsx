'use client'

import { signIn, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react'
import type { ClientSafeProvider } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'react-toastify'

export default function Login() {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [])

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

  const handleSocialSignIn = async (providerId: string) => {
    try {
      await signIn(providerId, {
        callbackUrl: '/dashboard'
      })
    } catch (error) {
      toast.error("Social login error", {
        position: "top-center",
        autoClose: 2000
      })
      console.error('Social login error:', error)
    }
  }

  if (!providers) return <div>Loading...</div>

  const providerLogos: Record<string, string> = {
    google: '/google.png',
    facebook: '/facebook.png',
  }

  return (
    <div className='h-screen grid grid-cols-1 lg:grid-cols-2'>
      <div className='hidden lg:block'>
        <Image src="/chatbot.png" alt="chatbot" width={700} height={700} />
      </div>


        <div className="px-6 lg:px-30 py-15 bg-white">

          <h1 className="text-2xl font-bold mb-6 text-center text-[#389378]">Login</h1>

          {/* Social Providers */}
          <div className="space-y-3">
            {Object.values(providers).map((provider) => {
              if (provider.id === 'credentials') return null

              const logo = providerLogos[provider.id] || null
              
              return (
                <button
                  key={provider.name}
                  onClick={() => handleSocialSignIn(provider.id)}
                  className="w-full p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  {logo && (
                    <Image src={logo} alt={`${provider.name} logo`} height={20} width={20} />
                  )}
                  Continue with {provider.name}
                </button>
              )
            })}
          </div>

          <div className="my-6 text-center text-gray-500">or</div>

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
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder='Your Password...'
                required
                disabled={isLoading}
              />
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