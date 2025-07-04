'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const hiddenPaths = ['/auth/login', '/auth/register', '/dashboard', '/dashboard/chat', '/dashboard/recommend'];
  const shouldHideLayout = hiddenPaths.includes(pathname);

  const protectedPaths = ['/dashboard', '/profile', '/settings'];
  const needsAuth = protectedPaths.some(path => pathname.startsWith(path));

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      
      {needsAuth ? (
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      ) : (
        children
      )}
      
      {!shouldHideLayout && <Footer />}
    </>
  );
}