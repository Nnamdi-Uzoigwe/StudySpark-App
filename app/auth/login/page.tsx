'use client'

import { signIn, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react'
import type { ClientSafeProvider } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
        alert('Invalid credentials')
      } else if (result?.ok) {
        // Redirect to dashboard on successful login
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = async (providerId: string) => {
    try {
      await signIn(providerId, {
        callbackUrl: '/dashboard' // This will redirect to dashboard after social login
      })
    } catch (error) {
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
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full p-3 bg-[#398378] text-white rounded-lg hover:bg-[#376059] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </button>

            <p className='text-center'>Don&apos;t have an account? <Link href="/auth/register" className='text-[#398378]'>Register here</Link></p>
          </form>
          
        </div>
    </div>
  )
}