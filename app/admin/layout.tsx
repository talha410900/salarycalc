'use client'

import Link from 'next/link'
import { FileText, Home, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthProvider, useAuth } from '@/components/admin/auth-provider'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated (except on login page)
    if (!loading && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [isAuthenticated, loading, pathname, router])

  // Don't render admin content if not authenticated
  if (!isAuthenticated && pathname !== '/admin/login') {
    return null
  }

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="text-2xl font-bold">
                Admin Panel
              </Link>
              <nav className="flex items-center gap-4">
                <Link href="/admin">
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Blogs
                  </Button>
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  )
}

