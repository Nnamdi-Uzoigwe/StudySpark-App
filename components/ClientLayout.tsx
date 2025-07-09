// 'use client';

// import { usePathname } from 'next/navigation';
// import { SessionProvider } from 'next-auth/react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import ProtectedRoute from '@/components/ProtectedRoute';

// export default function ClientLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
  
//   const hiddenPaths = ['/auth/login', '/auth/register', '/dashboard', '/dashboard/chat', '/dashboard/recommend', '/dashboard/history', '/dashboard/chat/:id'];
//   const shouldHideLayout = hiddenPaths.includes(pathname);

//   const protectedPaths = ['/dashboard', '/profile', '/settings'];
//   const needsAuth = protectedPaths.some(path => pathname.startsWith(path));

//   return (
//     <SessionProvider>
//       {!shouldHideLayout && <Navbar />}
      
//       {needsAuth ? (
//         <ProtectedRoute>
//           {children}
//         </ProtectedRoute>
//       ) : (
//         children
//       )}
      
//       {!shouldHideLayout && <Footer />}
//     </SessionProvider>
//   );
// }


'use client'

import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Routes where layout (Navbar/Footer) should be hidden
  const hiddenLayoutPaths = [
    '/auth/login',
    '/auth/register',
    '/dashboard',
    '/dashboard/chat',
    '/dashboard/recommend',
    '/dashboard/history'
  ]

  // Dynamically check if current path matches any base route or starts with it
  const shouldHideLayout = hiddenLayoutPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )

  // Routes that require authentication
  const protectedPaths = ['/dashboard', '/profile', '/settings']
  const needsAuth = protectedPaths.some((path) => pathname.startsWith(path))

  return (
    <SessionProvider>
      {!shouldHideLayout && <Navbar />}

      {needsAuth ? (
        <ProtectedRoute>{children}</ProtectedRoute>
      ) : (
        children
      )}

      {!shouldHideLayout && <Footer />}
    </SessionProvider>
  )
}
