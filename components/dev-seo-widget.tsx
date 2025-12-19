'use client'

import { useState, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { SEOChecklist } from '@/components/admin/seo-checklist'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function DevSEOWidget() {
  const pathname = usePathname()
  const [focusKeyword, setFocusKeyword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [pageData, setPageData] = useState<{
    title: string
    metaTitle: string
    metaDescription: string
    slug: string
    content: string
    excerpt: string
  }>({
    title: '',
    metaTitle: '',
    metaDescription: '',
    slug: '',
    content: '',
    excerpt: '',
  })

  // Extract page data from DOM
  useEffect(() => {
    if (typeof window === 'undefined') return

    const extractPageData = () => {
      // Get title from document
      const titleElement = document.querySelector('h1')
      const title = titleElement?.textContent?.trim() || document.title || ''

      // Get meta tags
      const metaTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                       document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
                       document.title ||
                       ''

      const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ||
                             document.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                             document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ||
                             ''

      // Get slug from pathname
      const slug = pathname.split('/').pop() || pathname.replace(/^\//, '').replace(/\//g, '-') || 'page'

      // Extract content from main content area (exclude navigation, footer, etc.)
      const mainContent = document.querySelector('main') || 
                        document.querySelector('article') || 
                        document.querySelector('[role="main"]') ||
                        document.body
      
      // Clone to avoid modifying the original
      const contentClone = mainContent.cloneNode(true) as HTMLElement
      
      // Remove common non-content elements
      const elementsToRemove = contentClone.querySelectorAll('nav, header, footer, aside, script, style, noscript, [class*="nav"], [class*="header"], [class*="footer"]')
      elementsToRemove.forEach(el => el.remove())
      
      // Get all text content from paragraphs, headings, and list items
      const textElements = contentClone.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td, th, div[class*="content"], div[class*="text"]')
      let content = Array.from(textElements)
        .map(el => {
          const text = el.textContent?.trim() || ''
          // Filter out very short text that's likely UI elements
          return text.length > 10 ? text : ''
        })
        .filter(text => text && text.length > 0)
        .join(' ')
      
      // Fallback: get all text if no structured content found
      if (content.length < 100) {
        content = contentClone.textContent?.trim() || ''
      }

      // Get excerpt from first paragraph or meta description
      const firstParagraph = mainContent.querySelector('p')
      const excerpt = firstParagraph?.textContent?.trim() || metaDescription || ''

      setPageData({
        title,
        metaTitle,
        metaDescription,
        slug,
        content,
        excerpt,
      })
    }

    // Extract data after DOM is ready
    const extract = () => {
      if (document.readyState === 'complete') {
        extractPageData()
      } else {
        window.addEventListener('load', extractPageData, { once: true })
      }
    }

    extract()
    
    // Re-extract on route changes (with a small delay for client-side navigation)
    const timer = setTimeout(extractPageData, 300)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', extractPageData)
    }
  }, [pathname])

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-[60]">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
          size="sm"
        >
          SEO Check
        </Button>
      </div>
    )
  }

  // Calculate bottom position for SEO checklist based on input card height
  const inputCardHeight = focusKeyword ? 200 : 150 // Approximate height

  return (
    <>
      {/* SEO Checklist - positioned above input card */}
      {focusKeyword && (
        <div 
          className="fixed right-4 z-[60] w-80 md:w-96"
          style={{ bottom: `${16 + inputCardHeight}px` }}
        >
          <SEOChecklist
            focusKeyword={focusKeyword}
            title={pageData.title}
            metaTitle={pageData.metaTitle}
            metaDescription={pageData.metaDescription}
            slug={pageData.slug}
            content={pageData.content}
            excerpt={pageData.excerpt}
          />
        </div>
      )}

      {/* Input Card - always at bottom */}
      <div className="fixed bottom-4 right-4 z-[60] w-80 md:w-96">
        <Card className="shadow-2xl border-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Label htmlFor="dev-focus-keyword" className="text-sm font-semibold">
                Focus Keyword (Dev Mode)
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Input
              id="dev-focus-keyword"
              value={focusKeyword}
              onChange={(e) => setFocusKeyword(e.target.value)}
              placeholder="Enter focus keyword..."
              className="mb-2"
            />
            <p className="text-xs text-muted-foreground mb-2">
              Page: {pathname}
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Title:</strong> {pageData.title || 'Not found'}</p>
              <p><strong>Meta Title:</strong> {pageData.metaTitle || 'Not found'}</p>
              <p><strong>Meta Desc:</strong> {pageData.metaDescription ? `${pageData.metaDescription.substring(0, 50)}...` : 'Not found'}</p>
              <p><strong>Content Length:</strong> {pageData.content.length} chars</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

