'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Blog } from '@/lib/supabase/types'

interface BlogSectionProps {
  blogs: Blog[]
}

const INITIAL_COUNT = 6
const LOAD_MORE_COUNT = 6

export function BlogSection({ blogs }: BlogSectionProps) {
  const router = useRouter()
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  if (blogs.length === 0) {
    return null
  }

  const visibleBlogs = blogs.slice(0, visibleCount)
  const hasMore = visibleCount < blogs.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, blogs.length))
  }

  return (
    <section id="blog" className="py-12 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
              Latest Articles
            </h2>
            <p className="text-sm text-muted-foreground">
              Expert insights on salary, taxes, and financial planning
            </p>
          </div>
          <Link href="/blog">
            <span className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleBlogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`}>
              <Card className="group h-full pt-0 overflow-hidden bg-card border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group-hover:-translate-y-1">
                {blog.featured_image && (
                  <div className="relative w-full h-[230px] overflow-hidden bg-muted">
                    <Image
                      src={blog.featured_image}
                      alt={blog.title}
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <CardContent className="p-4">
                  <div className="flex items-center justify-end gap-2 mb-2">
                    {blog.category && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/blog?category=${encodeURIComponent(blog.category!)}`)
                        }}
                        className="inline-flex"
                        aria-label={`View category ${blog.category!}`}
                      >
                        <Badge variant="secondary" className="text-xs">
                          {blog.category}
                        </Badge>
                      </button>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  {blog.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {blog.excerpt}
                    </p>
                  )}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/blog?tag=${encodeURIComponent(tag)}`)
                          }}
                          className="inline-flex"
                          aria-label={`View tag ${tag}`}
                        >
                          <Badge variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        </button>
                      ))}
                      {blog.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{blog.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    <span>Read more</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              Load More
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

