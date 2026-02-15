'use client'

import { useEffect, useRef } from 'react'

type AdFormat = 'auto' | 'rectangle' | 'horizontal' | 'vertical'

interface AdUnitProps {
  /** Your AdSense ad slot ID (from the AdSense dashboard) */
  slot: string
  /** Ad format - determines how the ad sizes itself */
  format?: AdFormat
  /** Whether the ad should be full-width responsive */
  fullWidthResponsive?: boolean
  /** Additional CSS classes for the wrapper */
  className?: string
  /** Layout key for in-feed ads (from AdSense) */
  layoutKey?: string
  /** Ad layout type (e.g., 'in-article') */
  layout?: string
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>
  }
}

export function AdUnit({
  slot,
  format = 'auto',
  fullWidthResponsive = true,
  className = '',
  layoutKey,
  layout,
}: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const isLoaded = useRef(false)

  useEffect(() => {
    // Only push once per component instance
    if (isLoaded.current) return
    isLoaded.current = true

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      // AdSense not loaded or ad blocker active — fail silently
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <div
      ref={adRef}
      className={`ad-unit-wrapper overflow-hidden text-center ${className}`}
      aria-hidden="true"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6279801914353696"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
      />
    </div>
  )
}

/**
 * Pre-configured ad variants for common placements.
 * Replace the `slot` values with your actual AdSense ad slot IDs
 * from the AdSense dashboard once your account is approved.
 *
 * Usage:
 *   <BannerAd />                — Full-width banner (below hero, between sections)
 *   <InArticleAd />             — Fits naturally inside content (calculator pages, blog)
 *   <SidebarAd />               — Vertical ad for blog sidebar
 *   <InFeedAd />                — Between cards in a grid/feed list
 */

/** Full-width horizontal banner — great between homepage sections */
export function BannerAd({ className = '' }: { className?: string }) {
  return (
    <AdUnit
      slot="REPLACE_WITH_BANNER_SLOT_ID"
      format="horizontal"
      className={`my-6 ${className}`}
    />
  )
}

/** Inline ad that blends into article/calculator content */
export function InArticleAd({ className = '' }: { className?: string }) {
  return (
    <AdUnit
      slot="REPLACE_WITH_IN_ARTICLE_SLOT_ID"
      format="auto"
      layout="in-article"
      className={`my-8 ${className}`}
    />
  )
}

/** Vertical/rectangle ad for sidebars */
export function SidebarAd({ className = '' }: { className?: string }) {
  return (
    <AdUnit
      slot="REPLACE_WITH_SIDEBAR_SLOT_ID"
      format="rectangle"
      className={`my-4 ${className}`}
    />
  )
}

/** In-feed ad for blog listing grids */
export function InFeedAd({ className = '' }: { className?: string }) {
  return (
    <AdUnit
      slot="REPLACE_WITH_IN_FEED_SLOT_ID"
      format="auto"
      className={`my-2 ${className}`}
    />
  )
}
