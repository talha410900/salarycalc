'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { Blog } from '@/lib/supabase/types'

interface BlogSectionProps {
  blogs: Blog[]
}

export function BlogSection({ blogs }: BlogSectionProps) {
  if (blogs.length === 0) {
    return null
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
          {blogs.slice(0, 3).map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`}>
              <Card className="group h-full overflow-hidden bg-card border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group-hover:-translate-y-1">
                {blog.featured_image && (
                  <div className="relative w-full h-48 overflow-hidden bg-muted">
                    <Image
                      src={blog.featured_image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                )}
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {blog.published_at && (
                        <time dateTime={blog.published_at}>
                          {format(new Date(blog.published_at), 'MMM d, yyyy')}
                        </time>
                      )}
                    </div>
                    {blog.category && (
                      <Link href={`/blog?category=${encodeURIComponent(blog.category)}`} onClick={(e) => e.stopPropagation()}>
                        <Badge variant="secondary" className="text-xs">
                          {blog.category}
                        </Badge>
                      </Link>
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
                        <Link 
                          key={tag} 
                          href={`/blog?tag=${encodeURIComponent(tag)}`} 
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Badge variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        </Link>
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
      </div>
    </section>
  )
}

