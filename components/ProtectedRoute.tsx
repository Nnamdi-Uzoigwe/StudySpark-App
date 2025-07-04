// components/ProtectedRoute.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
  redirectTo?: string
  requiredRole?: string
  loadingComponent?: ReactNode
}

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user?: {
    id: string
    email: string
    name: string
    role?: string
  }
}

const ProtectedRoute = ({
  children,
  fallback,
  redirectTo = '/auth/login',
  requiredRole,
  loadingComponent
}: ProtectedRouteProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true
  })
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Method 1: Check localStorage token
        const token = localStorage.getItem('auth-token')
        
        if (!token) {
          console.warn('No auth token found');
        }

        // Method 2: Verify token with your backend
        const response = await fetch('/api/verify-token', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Token verification failed')
        }

        const userData = await response.json()
        
        // Check role-based access if required
        if (requiredRole && userData.role !== requiredRole) {
          router.push('/unauthorized')
          return
        }

        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: userData
        })

      } catch (error) {
        console.error('Authentication check failed:', error)
        
        // Clear invalid token
        localStorage.removeItem('auth-token')
        
        // Redirect to login
        if (fallback) {
          setAuthState({
            isAuthenticated: false,
            isLoading: false
          })
        } else {
          router.push(redirectTo)
        }
      }
    }

    checkAuth()
  }, [router, redirectTo, requiredRole, fallback])

  // Show loading state
  if (authState.isLoading) {
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
  if (!authState.isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>
    }
    return null // Will redirect via useEffect
  }

  // Render protected content
  return <>{children}</>
}

export default ProtectedRoute