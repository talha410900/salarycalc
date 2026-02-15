'use client'

import { useState } from 'react'
import { Share2, Twitter, Facebook, Copy, Check, MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

interface ShareResultsProps {
  /** A headline for the share text, e.g. "My Take-Home Pay in California" */
  title: string
  /** The shareable summary, e.g. "$85,000 → $62,340 take-home after taxes" */
  resultSummary: string
  /** The full URL to the calculator page */
  url?: string
}

export function ShareResults({ title, resultSummary, url }: ShareResultsProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://taxsal.com')
  const fullText = `${title}\n${resultSummary}\n\nCalculate yours free → ${pageUrl}`
  const encodedText = encodeURIComponent(`${title} — ${resultSummary}`)
  const encodedUrl = encodeURIComponent(pageUrl)

  const shareOptions = [
    {
      name: 'Twitter / X',
      icon: Twitter,
      color: 'hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200',
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
          '_blank',
          'width=600,height=400'
        )
      },
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200',
      onClick: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
          '_blank',
          'width=600,height=400'
        )
      },
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'hover:bg-green-50 hover:text-green-600 hover:border-green-200',
      onClick: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(fullText)}`,
          '_blank'
        )
      },
    },
    {
      name: 'Reddit',
      icon: Share2,
      color: 'hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200',
      onClick: () => {
        window.open(
          `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
          '_blank',
          'width=600,height=400'
        )
      },
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      toast.success('Results copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy — try again')
    }
  }

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: resultSummary,
          url: pageUrl,
        })
      } catch {
        // User cancelled or share failed — open dialog fallback
        setOpen(true)
      }
    } else {
      setOpen(true)
    }
  }

  return (
    <div className="mt-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            variant="outline"
            size="default"
            onClick={handleNativeShare}
            className="gap-2 w-full sm:w-auto border-primary/30 text-primary hover:bg-primary/5"
          >
            <Share2 className="h-4 w-4" />
            Share Your Results
          </Button>
          <Button
            variant="ghost"
            size="default"
            onClick={handleCopy}
            className="gap-2 w-full sm:w-auto text-muted-foreground"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? 'Copied!' : 'Copy Results'}
          </Button>
        </div>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Results</DialogTitle>
            <DialogDescription>
              Let others know what you calculated — share to any platform.
            </DialogDescription>
          </DialogHeader>

          {/* Preview */}
          <div className="rounded-lg border bg-muted/50 p-4 text-sm">
            <p className="font-semibold text-foreground mb-1">{title}</p>
            <p className="text-muted-foreground">{resultSummary}</p>
            <p className="text-xs text-primary mt-2">Calculate yours free → taxsal.com</p>
          </div>

          {/* Share Buttons Grid */}
          <div className="grid grid-cols-2 gap-2">
            {shareOptions.map((option) => {
              const Icon = option.icon
              return (
                <Button
                  key={option.name}
                  variant="outline"
                  className={`justify-start gap-2 ${option.color}`}
                  onClick={() => {
                    option.onClick()
                    setOpen(false)
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {option.name}
                </Button>
              )
            })}
          </div>

          {/* Copy Link */}
          <Button
            variant="secondary"
            onClick={handleCopy}
            className="w-full gap-2"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? 'Copied to clipboard!' : 'Copy results as text'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
