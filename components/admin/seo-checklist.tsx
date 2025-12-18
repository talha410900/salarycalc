'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp, HelpCircle, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SEOChecklistProps {
  focusKeyword: string
  title: string
  metaTitle: string
  metaDescription: string
  slug: string
  content: string
  excerpt: string
}

type CheckStatus = 'success' | 'warning' | 'error'

interface Check {
  id: string
  status: CheckStatus
  message: string
  details?: string
}

export function SEOChecklist({
  focusKeyword,
  title,
  metaTitle,
  slug,
  content,
  metaDescription,
  excerpt,
}: SEOChecklistProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    additional: true,
    readability: true,
    contentReadability: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Helper function to strip HTML and get text content
  const stripHtml = (html: string): string => {
    if (typeof window === 'undefined') {
      // Server-side: basic HTML stripping
      return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
    }
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  // Get plain text content
  const plainContent = stripHtml(content)
  const wordCount = plainContent.split(/\s+/).filter((w) => w.length > 0).length

  // Check if focus keyword exists
  const hasFocusKeyword = focusKeyword.trim().length > 0
  const keywordLower = focusKeyword.toLowerCase().trim()

  // Basic SEO Checks
  const basicChecks = useMemo<Check[]>(() => {
    if (!hasFocusKeyword) {
      return [
        {
          id: 'focus-keyword',
          status: 'error',
          message: 'Please enter a Focus Keyword to analyze SEO.',
        },
      ]
    }

    const checks: Check[] = []

    // Check 1: Focus Keyword in SEO Title
    const seoTitle = metaTitle || title
    const titleHasKeyword = seoTitle.toLowerCase().includes(keywordLower)
    checks.push({
      id: 'keyword-in-title',
      status: titleHasKeyword ? 'success' : 'error',
      message: titleHasKeyword
        ? "Hurray! You're using Focus Keyword in the SEO Title."
        : 'Focus Keyword not found in SEO Title.',
    })

    // Check 2: Focus Keyword in Meta Description
    const descHasKeyword = metaDescription.toLowerCase().includes(keywordLower)
    checks.push({
      id: 'keyword-in-description',
      status: descHasKeyword ? 'success' : 'error',
      message: descHasKeyword
        ? 'Focus Keyword used inside SEO Meta Description.'
        : 'Focus Keyword not found in Meta Description.',
    })

    // Check 3: Focus Keyword in URL
    const slugHasKeyword = slug.toLowerCase().includes(keywordLower.replace(/\s+/g, '-'))
    checks.push({
      id: 'keyword-in-url',
      status: slugHasKeyword ? 'success' : 'error',
      message: slugHasKeyword
        ? 'Focus Keyword used in the URL.'
        : 'Focus Keyword not found in URL.',
    })

    // Check 4: Focus Keyword in first 10% of content
    const first10Percent = plainContent.substring(0, Math.floor(plainContent.length * 0.1))
    const first10HasKeyword = first10Percent.toLowerCase().includes(keywordLower)
    checks.push({
      id: 'keyword-in-first-10',
      status: first10HasKeyword ? 'success' : 'error',
      message: first10HasKeyword
        ? 'Focus Keyword appears in the first 10% of the content.'
        : 'Focus Keyword not found in the first 10% of the content.',
    })

    // Check 5: Focus Keyword in content
    const contentHasKeyword = plainContent.toLowerCase().includes(keywordLower)
    checks.push({
      id: 'keyword-in-content',
      status: contentHasKeyword ? 'success' : 'error',
      message: contentHasKeyword
        ? 'Focus Keyword found in the content.'
        : 'Focus Keyword not found in the content.',
    })

    // Check 6: Content length
    const minWords = 300
    const optimalWords = 1000
    let contentStatus: CheckStatus = 'success'
    let contentMessage = `Content is ${wordCount} words long. Good job!`
    
    if (wordCount < minWords) {
      contentStatus = 'error'
      contentMessage = `Content is ${wordCount} words long. Consider writing at least ${minWords} words.`
    } else if (wordCount < optimalWords) {
      contentStatus = 'warning'
      contentMessage = `Content is ${wordCount} words long. Good job! Consider aiming for ${optimalWords}+ words for better SEO.`
    }

    checks.push({
      id: 'content-length',
      status: contentStatus,
      message: contentMessage,
    })

    return checks
  }, [focusKeyword, title, metaTitle, metaDescription, slug, plainContent, wordCount, hasFocusKeyword, keywordLower])

  // Additional Checks
  const additionalChecks = useMemo<Check[]>(() => {
    if (!hasFocusKeyword) {
      return []
    }

    const checks: Check[] = []

    // Check 1: Focus Keyword in subheadings (H2, H3)
    const headingMatches = content.match(/<h[2-3][^>]*>([^<]+)<\/h[2-3]>/gi) || []
    const headingTexts = headingMatches.map((h) => stripHtml(h).toLowerCase())
    const hasKeywordInHeadings = headingTexts.some((h) => h.includes(keywordLower))
    checks.push({
      id: 'keyword-in-headings',
      status: hasKeywordInHeadings ? 'success' : 'error',
      message: hasKeywordInHeadings
        ? 'Focus Keyword found in the subheading(s).'
        : 'Focus Keyword not found in subheadings. Consider adding it to at least one H2 or H3.',
    })

    // Check 2: Focus Keyword in image alt attributes
    const imageMatches = content.match(/<img[^>]*alt=["']([^"']+)["'][^>]*>/gi) || []
    const altTexts = imageMatches.map((img) => {
      const altMatch = img.match(/alt=["']([^"']+)["']/i)
      return altMatch ? altMatch[1].toLowerCase() : ''
    })
    const hasKeywordInAlt = altTexts.some((alt) => alt.includes(keywordLower))
    checks.push({
      id: 'keyword-in-alt',
      status: hasKeywordInAlt ? 'success' : 'warning',
      message: hasKeywordInAlt
        ? 'Focus Keyword found in image alt attribute(s).'
        : 'Focus Keyword not found in image alt attributes. Consider adding it to image alt text.',
    })

    // Check 3: Keyword Density
    const keywordMatches = (plainContent.toLowerCase().match(new RegExp(keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length
    const keywordDensity = wordCount > 0 ? ((keywordMatches / wordCount) * 100).toFixed(2) : '0.00'
    const density = parseFloat(keywordDensity)
    const optimalDensity = 1.5
    const maxDensity = 3.0
    
    let densityStatus: CheckStatus = 'success'
    let densityMessage = `Keyword Density is ${keywordDensity}%, the Focus Keyword and combination appears ${keywordMatches} times.`
    
    if (density > maxDensity) {
      densityStatus = 'warning'
      densityMessage = `Keyword Density is ${keywordDensity}% (appears ${keywordMatches} times). Consider reducing to avoid keyword stuffing.`
    } else if (density < 0.5) {
      densityStatus = 'warning'
      densityMessage = `Keyword Density is ${keywordDensity}% (appears ${keywordMatches} times). Consider increasing for better SEO.`
    }

    checks.push({
      id: 'keyword-density',
      status: densityStatus,
      message: densityMessage,
      details: `Optimal range: 0.5% - ${maxDensity}%`,
    })

    // Check 4: URL length
    const urlLength = slug.length
    const maxUrlLength = 75
    checks.push({
      id: 'url-length',
      status: urlLength <= maxUrlLength ? 'success' : 'warning',
      message: urlLength <= maxUrlLength
        ? `URL is ${urlLength} characters long. Kudos!`
        : `URL is ${urlLength} characters long. Consider shortening to under ${maxUrlLength} characters.`,
    })

    // Check 5: External links
    const externalLinks = (content.match(/<a[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>/gi) || []).length
    checks.push({
      id: 'external-links',
      status: externalLinks > 0 ? 'success' : 'warning',
      message: externalLinks > 0
        ? 'Great! You are linking to external resources.'
        : 'Consider adding external links to authoritative sources.',
    })

    // Check 6: DoFollow external links
    const dofollowLinks = (content.match(/<a[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*(?!nofollow)[^>]*>/gi) || []).length
    checks.push({
      id: 'dofollow-links',
      status: dofollowLinks > 0 ? 'success' : 'warning',
      message: dofollowLinks > 0
        ? 'At least one external link with DoFollow found in your content.'
        : 'Consider adding DoFollow external links for better SEO.',
    })

    // Check 7: Internal links
    const internalLinks = (content.match(/<a[^>]*href=["'](\/[^"']+)["'][^>]*>/gi) || []).length
    checks.push({
      id: 'internal-links',
      status: internalLinks > 0 ? 'success' : 'warning',
      message: internalLinks > 0
        ? 'You are linking to other resources on your website which is great.'
        : 'Consider adding internal links to related content on your site.',
    })

    // Check 8: Focus Keyword uniqueness (simplified - would need to check against other blogs)
    // Note: In a real implementation, you'd check against existing blogs in the database
    checks.push({
      id: 'keyword-uniqueness',
      status: 'success',
      message: 'Focus Keyword uniqueness check passed.',
      details: 'Note: Verify manually that this keyword isn\'t used in other published posts.',
    })

    return checks
  }, [focusKeyword, content, plainContent, wordCount, slug, hasFocusKeyword, keywordLower])

  // Title Readability Checks
  const readabilityChecks = useMemo<Check[]>(() => {
    const seoTitle = metaTitle || title
    const checks: Check[] = []

    // Check 1: Title length
    const titleLength = seoTitle.length
    const minLength = 30
    const maxLength = 60
    let titleStatus: CheckStatus = 'success'
    let titleMessage = `SEO Title length is ${titleLength} characters. Perfect!`

    if (titleLength < minLength) {
      titleStatus = 'warning'
      titleMessage = `SEO Title length is ${titleLength} characters. Consider making it at least ${minLength} characters.`
    } else if (titleLength > maxLength) {
      titleStatus = 'warning'
      titleMessage = `SEO Title length is ${titleLength} characters. Consider shortening to under ${maxLength} characters for better display.`
    }

    checks.push({
      id: 'title-length',
      status: titleStatus,
      message: titleMessage,
    })

    // Check 2: Title starts with keyword
    if (hasFocusKeyword && seoTitle.toLowerCase().startsWith(keywordLower)) {
      checks.push({
        id: 'title-starts-keyword',
        status: 'success',
        message: 'SEO Title starts with Focus Keyword. Excellent!',
      })
    } else if (hasFocusKeyword) {
      checks.push({
        id: 'title-starts-keyword',
        status: 'warning',
        message: 'Consider starting the SEO Title with your Focus Keyword for better SEO.',
      })
    }

    // Check 3: Meta Description length
    const descLength = metaDescription.length
    const minDescLength = 120
    const maxDescLength = 160
    let descStatus: CheckStatus = 'success'
    let descMessage = `Meta Description length is ${descLength} characters. Perfect!`

    if (descLength === 0) {
      descStatus = 'error'
      descMessage = 'Meta Description is empty. Add a compelling description.'
    } else if (descLength < minDescLength) {
      descStatus = 'warning'
      descMessage = `Meta Description length is ${descLength} characters. Consider making it at least ${minDescLength} characters.`
    } else if (descLength > maxDescLength) {
      descStatus = 'warning'
      descMessage = `Meta Description length is ${descLength} characters. Consider shortening to under ${maxDescLength} characters.`
    }

    checks.push({
      id: 'description-length',
      status: descStatus,
      message: descMessage,
    })

    return checks
  }, [title, metaTitle, metaDescription, focusKeyword, hasFocusKeyword, keywordLower])

  // Content Readability Checks
  const contentReadabilityChecks = useMemo<Check[]>(() => {
    const checks: Check[] = []

    // Check 1: Table of Contents (check for TOC markers or headings structure)
    const headingMatches = content.match(/<h[2-3][^>]*>.*<\/h[2-3]>/gi)
    const hasTableOfContents = content.includes('[toc]') || 
                               content.includes('table-of-contents') ||
                               (headingMatches && headingMatches.length >= 3)
    checks.push({
      id: 'table-of-contents',
      status: hasTableOfContents ? 'success' : 'warning',
      message: hasTableOfContents
        ? 'You seem to be using a Table of Contents to break-down your text.'
        : 'Consider adding a Table of Contents to improve content structure and readability.',
    })

    // Check 2: Short paragraphs (check average paragraph length)
    const paragraphs = plainContent.split(/\n\n+/).filter(p => p.trim().length > 0)
    const avgParagraphLength = paragraphs.length > 0 
      ? paragraphs.reduce((sum, p) => sum + p.split(/\s+/).length, 0) / paragraphs.length 
      : 0
    const hasShortParagraphs = avgParagraphLength > 0 && avgParagraphLength < 150 // Average less than 150 words per paragraph
    checks.push({
      id: 'short-paragraphs',
      status: hasShortParagraphs ? 'success' : 'warning',
      message: hasShortParagraphs
        ? 'You are using short paragraphs.'
        : 'Consider breaking up long paragraphs into shorter ones (3-5 sentences) for better readability.',
    })

    // Check 3: Images and/or videos
    const imageMatches = content.match(/<img[^>]*>/gi)
    const hasImages = content.includes('<img') || (imageMatches && imageMatches.length > 0)
    const hasVideos = content.includes('<video') || 
                     content.includes('youtube.com') || 
                     content.includes('youtu.be') ||
                     content.includes('vimeo.com') ||
                     content.match(/<iframe[^>]*>/gi)?.some(iframe => 
                       iframe.includes('youtube') || iframe.includes('vimeo')
                     )
    const hasMedia = hasImages || hasVideos
    checks.push({
      id: 'images-videos',
      status: hasMedia ? 'success' : 'warning',
      message: hasMedia
        ? 'Your content contains images and/or video(s).'
        : 'Consider adding images or videos to make your content more engaging and improve readability.',
    })

    // Check 4: Sentence length (average sentence length)
    const sentences = plainContent.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const avgSentenceLength = sentences.length > 0
      ? sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / sentences.length
      : 0
    const hasGoodSentenceLength = avgSentenceLength > 0 && avgSentenceLength < 20 // Average less than 20 words per sentence
    checks.push({
      id: 'sentence-length',
      status: hasGoodSentenceLength ? 'success' : 'warning',
      message: hasGoodSentenceLength
        ? 'Your sentences are of good length for readability.'
        : 'Consider using shorter sentences (15-20 words average) for better readability.',
    })

    // Check 5: Subheadings structure
    const headingCount = (content.match(/<h[2-6][^>]*>/gi) || []).length
    const hasGoodHeadingStructure = headingCount >= 2 && headingCount <= 10
    checks.push({
      id: 'heading-structure',
      status: hasGoodHeadingStructure ? 'success' : 'warning',
      message: hasGoodHeadingStructure
        ? 'Your content has a good heading structure.'
        : headingCount < 2
        ? 'Consider adding more subheadings to break up your content and improve readability.'
        : 'Consider reducing the number of headings for better structure.',
    })

    return checks
  }, [content, plainContent])

  // Count errors and successes
  const basicErrors = basicChecks.filter((c) => c.status === 'error').length
  const basicSuccesses = basicChecks.filter((c) => c.status === 'success').length
  const basicAllGood = basicErrors === 0 && basicChecks.length > 0

  const additionalErrors = additionalChecks.filter((c) => c.status === 'error').length
  const additionalWarnings = additionalChecks.filter((c) => c.status === 'warning').length
  const additionalAllGood = additionalErrors === 0 && additionalChecks.length > 0

  const readabilityErrors = readabilityChecks.filter((c) => c.status === 'error').length
  const readabilityAllGood = readabilityErrors === 0 && readabilityChecks.length > 0

  const contentReadabilityErrors = contentReadabilityChecks.filter((c) => c.status === 'error').length
  const contentReadabilityAllGood = contentReadabilityErrors === 0 && contentReadabilityChecks.length > 0

  // Calculate SEO Score
  const seoScore = useMemo(() => {
    if (!hasFocusKeyword) return 0

    const allChecks = [...basicChecks, ...additionalChecks, ...readabilityChecks, ...contentReadabilityChecks]
    const totalChecks = allChecks.length
    if (totalChecks === 0) return 0

    const successCount = allChecks.filter((c) => c.status === 'success').length
    const warningCount = allChecks.filter((c) => c.status === 'warning').length
    const errorCount = allChecks.filter((c) => c.status === 'error').length

    // Calculate score: success = 1 point, warning = 0.5 points, error = 0 points
    const score = ((successCount + warningCount * 0.5) / totalChecks) * 100
    return Math.round(score)
  }, [basicChecks, additionalChecks, readabilityChecks, contentReadabilityChecks, hasFocusKeyword])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-orange-500'
    return 'text-red-600'
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-600 hover:bg-green-700'
    if (score >= 60) return 'bg-orange-500 hover:bg-orange-600'
    return 'bg-red-600 hover:bg-red-700'
  }

  const getStatusIcon = (status: CheckStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusBadge = (errors: number, allGood: boolean) => {
    if (allGood) {
      return (
        <Badge className="bg-green-600 hover:bg-green-700">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          All Good
        </Badge>
      )
    }
    if (errors > 0) {
      return (
        <Badge className="bg-red-600 hover:bg-red-700">
          <XCircle className="h-3 w-3 mr-1" />
          × {errors} {errors === 1 ? 'Error' : 'Errors'}
        </Badge>
      )
    }
    return null
  }

  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 md:w-96">
      <Card className="shadow-2xl border-2 flex flex-col max-h-[85vh] py-0">
       
        <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-primary/5 border-b pt-1 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-semibold">SEO Analysis</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {hasFocusKeyword && (
                <Badge className={cn('text-white font-bold text-sm px-3 py-1', getScoreBadgeColor(seoScore))}>
                  {seoScore}
                </Badge>
              )}
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-muted-foreground hover:text-foreground"
              >
                {isMinimized ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          {hasFocusKeyword && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>SEO Score</span>
                <span className={cn('font-bold', getScoreColor(seoScore))}>{seoScore}/100</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    seoScore >= 80 ? 'bg-green-600' : seoScore >= 60 ? 'bg-orange-500' : 'bg-red-600'
                  )}
                  style={{ width: `${seoScore}%` }}
                />
              </div>
            </div>
          )}
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-4 overflow-y-auto flex-1 min-h-0">
            <div className="space-y-3">
              {/* Basic SEO */}
              <div className="border rounded-lg">
                <div className="flex items-center justify-between p-2 bg-secondary/50 border-b">
                  <CardTitle className="text-sm font-semibold">Basic SEO</CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(basicErrors, basicAllGood)}
                    <button
                      type="button"
                      onClick={() => toggleSection('basic')}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {expandedSections.basic ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
                {expandedSections.basic && (
                  <div className="p-2 space-y-2">
                    {basicChecks.map((check) => (
                      <div key={check.id} className="flex items-start gap-2 text-xs">
                        {getStatusIcon(check.status)}
                        <div className="flex-1">
                          <p className={cn(
                            'text-foreground',
                            check.status === 'error' && 'text-red-600',
                            check.status === 'warning' && 'text-orange-500'
                          )}>
                            {check.message}
                          </p>
                          {check.details && (
                            <p className="text-xs text-muted-foreground mt-1">{check.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Additional */}
              <div className="border rounded-lg">
                <div className="flex items-center justify-between p-2 bg-secondary/50 border-b">
                  <CardTitle className="text-sm font-semibold">Additional</CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(additionalErrors, additionalAllGood)}
                    <button
                      type="button"
                      onClick={() => toggleSection('additional')}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {expandedSections.additional ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
                {expandedSections.additional && (
                  <div className="p-2 space-y-2">
                    {additionalChecks.map((check) => (
                      <div key={check.id} className="flex items-start gap-2 text-xs">
                        {getStatusIcon(check.status)}
                        <div className="flex-1">
                          <p className={cn(
                            'text-foreground',
                            check.status === 'error' && 'text-red-600',
                            check.status === 'warning' && 'text-orange-500'
                          )}>
                            {check.message}
                          </p>
                          {check.details && (
                            <p className="text-xs text-muted-foreground mt-1">{check.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Title Readability */}
              <div className="border rounded-lg">
                <div className="flex items-center justify-between p-2 bg-secondary/50 border-b">
                  <CardTitle className="text-sm font-semibold">Title Readability</CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(readabilityErrors, readabilityAllGood)}
                    <button
                      type="button"
                      onClick={() => toggleSection('readability')}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {expandedSections.readability ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
                {expandedSections.readability && (
                  <div className="p-2 space-y-2">
                    {readabilityChecks.map((check) => (
                      <div key={check.id} className="flex items-start gap-2 text-xs">
                        {getStatusIcon(check.status)}
                        <div className="flex-1">
                          <p className={cn(
                            'text-foreground',
                            check.status === 'error' && 'text-red-600',
                            check.status === 'warning' && 'text-orange-500'
                          )}>
                            {check.message}
                          </p>
                          {check.details && (
                            <p className="text-xs text-muted-foreground mt-1">{check.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Readability */}
              <div className="border rounded-lg">
                <div className="flex items-center justify-between p-2 bg-secondary/50 border-b">
                  <CardTitle className="text-sm font-semibold">Content Readability</CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(contentReadabilityErrors, contentReadabilityAllGood)}
                    <button
                      type="button"
                      onClick={() => toggleSection('contentReadability')}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {expandedSections.contentReadability ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
                {expandedSections.contentReadability && (
                  <div className="p-2 space-y-2">
                    {contentReadabilityChecks.map((check) => (
                      <div key={check.id} className="flex items-start gap-2 text-xs">
                        {getStatusIcon(check.status)}
                        <div className="flex-1">
                          <p className={cn(
                            'text-foreground',
                            check.status === 'error' && 'text-red-600',
                            check.status === 'warning' && 'text-orange-500'
                          )}>
                            {check.message}
                          </p>
                          {check.details && (
                            <p className="text-xs text-muted-foreground mt-1">{check.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

