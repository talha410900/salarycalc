'use client'

import { useState, type FormEvent } from 'react'
import { Mail, Check, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

interface NewsletterSignupProps {
  /** Compact mode for sidebar placement */
  variant?: 'default' | 'compact' | 'inline'
  className?: string
}

export function NewsletterSignup({ variant = 'default', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    setStatus('loading')

    try {
      // Store in Supabase via API route (you can create this endpoint)
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Failed to subscribe')
      }

      setStatus('success')
      setEmail('')
      toast.success('You\'re subscribed! We\'ll keep you updated.')
    } catch (err) {
      setStatus('error')
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      // Reset to allow retry
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20 ${className}`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">You&apos;re subscribed!</p>
          <p className="text-xs text-muted-foreground">
            We&apos;ll send you tax updates and new calculator alerts.
          </p>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 h-10"
          disabled={status === 'loading'}
        />
        <Button type="submit" size="default" disabled={status === 'loading'} className="shrink-0">
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Subscribe
              <ArrowRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`rounded-lg border bg-card p-5 ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground text-sm">Tax Season Updates</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Get notified about tax law changes and new calculators.
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-9 text-sm"
            disabled={status === 'loading'}
          />
          <Button
            type="submit"
            size="sm"
            disabled={status === 'loading'}
            className="w-full"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Subscribe Free'
            )}
          </Button>
        </form>
        <p className="text-[10px] text-muted-foreground mt-2">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    )
  }

  // Default full variant
  return (
    <section className={`py-10 bg-primary/5 ${className}`}>
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 tracking-tight">
          Stay Ahead of Tax Season
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          Get free updates on tax law changes, new calculators, and expert tips — delivered straight
          to your inbox before filing season.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-11"
            disabled={status === 'loading'}
          />
          <Button
            type="submit"
            size="default"
            disabled={status === 'loading'}
            className="h-11 px-6 shrink-0"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-3">
          Free forever. No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
