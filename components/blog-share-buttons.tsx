'use client'

import { useState } from 'react'
import { Share2, Twitter, Facebook, Copy, Check, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface BlogShareButtonsProps {
  title: string
  url: string
}

export function BlogShareButtons({ title, url }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)
  const fullText = `${title}\n\nRead more → ${url}`

  const handleShare = (platform: string) => {
    if (typeof window === 'undefined') return

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(fullText)}`,
      reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    }

    const shareUrl = shareUrls[platform]
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy link')
    }
  }

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        // User cancelled
      }
    }
  }

  const platforms = [
    { key: 'twitter', label: 'X', icon: Twitter, hoverColor: 'hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200' },
    { key: 'facebook', label: 'Facebook', icon: Facebook, hoverColor: 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200' },
    { key: 'linkedin', label: 'LinkedIn', icon: Share2, hoverColor: 'hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200' },
    { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, hoverColor: 'hover:bg-green-50 hover:text-green-600 hover:border-green-200' },
    { key: 'reddit', label: 'Reddit', icon: Share2, hoverColor: 'hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200' },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground mr-1">
        <Share2 className="h-4 w-4" />
        Share:
      </span>

      {platforms.map(({ key, label, icon: Icon, hoverColor }) => (
        <Button
          key={key}
          variant="outline"
          size="sm"
          onClick={() => handleShare(key)}
          className={`gap-1.5 text-xs ${hoverColor}`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="gap-1.5 text-xs hover:bg-gray-50"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? 'Copied!' : 'Copy'}
      </Button>

      {/* Native share on supported devices */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <Button
          variant="secondary"
          size="sm"
          onClick={handleNativeShare}
          className="gap-1.5 text-xs md:hidden"
        >
          <Share2 className="h-3.5 w-3.5" />
          More
        </Button>
      )}
    </div>
  )
}
