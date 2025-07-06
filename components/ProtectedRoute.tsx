
'use client';

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
  redirectTo?: string
  requiredRole?: string
  loadingComponent?: ReactNode
}

const ProtectedRoute = ({
  children,
  fallback,
  redirectTo = '/auth/login',
  requiredRole,
  loadingComponent
}: ProtectedRouteProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return 

    if (status === 'unauthenticated') {
      if (!fallback) {
        router.push(redirectTo)
      }
      return
    }

    // Check role-based access if required
    if (requiredRole && session?.user?.role !== requiredRole) {
      router.push('/unauthorized')
      return
    }

  }, [status, session, router, redirectTo, requiredRole, fallback])

  // Show loading state
  if (status === 'loading') {
    if (loadingComponent) {
      return <>{loadingComponent}</>
    }
    
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#398378]"></div>
      </div>
    )
  }

  // Show fallback if not authenticated
  if (status === 'unauthenticated') {
    if (fallback) {
      return <>{fallback}</>
    }
    return null // Will redirect via useEffect
  }

  // Render protected content
  return <>{children}</>
}

export default ProtectedRoute