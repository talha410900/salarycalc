'use client'

import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BlogShareButtonsProps {
  title: string
  url: string
}

export function BlogShareButtons({ title, url }: BlogShareButtonsProps) {
  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    if (typeof window === 'undefined') return

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank'
        )
        break
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank'
        )
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
        break
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Share2 className="h-5 w-5 text-muted-foreground" />
      <span className="font-semibold">Share this article:</span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('twitter')}
        >
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('linkedin')}
        >
          LinkedIn
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('copy')}
        >
          Copy Link
        </Button>
      </div>
    </div>
  )
}

