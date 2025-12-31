'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Clock, Tag, FolderOpen, TrendingUp } from 'lucide-react'
import { Blog } from '@/lib/supabase/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface BlogSidebarProps {
  relatedBlogs: Blog[]
  recentBlogs: Blog[]
  categories: string[]
  tags: string[]
  currentCategory?: string | null
  currentTags?: string[]
}

export function BlogSidebar({
  relatedBlogs,
  recentBlogs,
  categories,
  tags,
  currentCategory,
  currentTags,
}: BlogSidebarProps) {

  return (
    <aside className="space-y-6">
      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Related Posts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {relatedBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group block"
              >
                <div className="flex gap-3">
                  {blog.featured_image && (
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={blog.featured_image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Posts */}
      {recentBlogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Posts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentBlogs.slice(0, 5).map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="block group"
              >
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h4>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog?category=${encodeURIComponent(category)}`}
                >
                  <Badge
                    variant={currentCategory === category ? 'default' : 'secondary'}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tags Cloud */}
      {tags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Popular Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 20).map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                >
                  <Badge
                    variant={
                      currentTags?.includes(tag) ? 'default' : 'outline'
                    }
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </aside>
  )
}

