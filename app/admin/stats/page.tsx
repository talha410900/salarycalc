'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, MessageSquare, Calculator, Loader2, Lock } from 'lucide-react'

// Simple client-side admin dashboard
// In a real app, you'd protect this with middleware and auth
export default function AdminStatsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Stats
  const [newsletterCount, setNewsletterCount] = useState(0)
  const [messageCount, setMessageCount] = useState(0)
  const [usageCount, setUsageCount] = useState(0)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Hardcoded simple admin password for demo purposes
    // Change this to something secure in production environment variables
    if (password === 'admin123' || password === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setIsAuthenticated(true)
      // fetchStats() - omitted for client-side safety in this demo
      setNewsletterCount(12) 
      setMessageCount(5)
      setUsageCount(142)
      setLoading(false)
    } else {
      setError('Invalid password')
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Stats Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Growth Stats</h1>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subscribers</p>
                  <h3 className="text-3xl font-bold mt-2">{newsletterCount}</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Messages</p>
                  <h3 className="text-3xl font-bold mt-2">{messageCount}</h3>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Calculations</p>
                  <h3 className="text-3xl font-bold mt-2">{usageCount}</h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Calculator className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
