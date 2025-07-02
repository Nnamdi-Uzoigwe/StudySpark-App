'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function AuthButtons() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }

  return (
    <div>
      <p>Not signed in</p>
      <button onClick={() => signIn('facebook')}>
        Sign in with Facebook
        <img src="/google.png" alt="" />
      </button>
      <button onClick={() => signIn('google')}>
        Sign in with Google
        <Image src="/google.png" alt='Google image' />
      </button>
    </div>
  )
}