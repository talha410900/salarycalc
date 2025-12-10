'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAuthenticated, setAuthenticated, logout as authLogout } from '@/lib/auth'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticatedState] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check authentication status on mount
    const authStatus = isAuthenticated()
    setAuthenticatedState(authStatus)
    setLoading(false)

    // Redirect to login if not authenticated and trying to access admin routes
    if (!authStatus && pathname?.startsWith('/admin') && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [pathname, router])

  const login = (username: string, password: string): boolean => {
    // Import here to avoid SSR issues
    const { verifyCredentials, setAuthenticated: setAuth } = require('@/lib/auth')
    if (verifyCredentials(username, password)) {
      setAuth(true)
      setAuthenticatedState(true)
      return true
    }
    return false
  }

  const logout = () => {
    authLogout()
    setAuthenticatedState(false)
    router.push('/admin/login')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

