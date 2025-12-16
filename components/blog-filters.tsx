"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tag, X } from "lucide-react"
import { Blog } from "@/lib/supabase/types"

interface BlogFiltersProps {
  blogs: Blog[]
}

export function BlogFilters({ blogs }: BlogFiltersProps) {
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category")
  const selectedTag = searchParams.get("tag")

  // Extract unique categories and tags
  const categories = Array.from(new Set(blogs.map((b) => b.category).filter(Boolean))) as string[]
  const allTags = blogs.flatMap((b) => b.tags || [])
  const uniqueTags = Array.from(new Set(allTags))

  return (
    <div className="mb-8">
      {/* Active Filters */}
      {(selectedCategory || selectedTag) && (
        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategory && (
            <Link
              href={selectedTag ? `/blog?tag=${encodeURIComponent(selectedTag)}` : "/blog"}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {selectedCategory}
              <X className="h-3 w-3" />
            </Link>
          )}
          {selectedTag && (
            <Link
              href={selectedCategory ? `/blog?category=${encodeURIComponent(selectedCategory)}` : "/blog"}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {selectedTag}
              <X className="h-3 w-3" />
            </Link>
          )}
          {(selectedCategory || selectedTag) && (
            <Link
              href="/blog"
              className="text-xs text-primary hover:underline"
            >
              Clear all
            </Link>
          )}
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category
              const href = selectedTag
                ? `/blog?category=${encodeURIComponent(category)}&tag=${encodeURIComponent(selectedTag)}`
                : `/blog?category=${encodeURIComponent(category)}`
              
              return (
                <Link
                  key={category}
                  href={isActive ? "/blog" : href}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Tags */}
      {uniqueTags.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
            Popular Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.slice(0, 15).map((tag) => {
              const isActive = selectedTag === tag
              const href = selectedCategory
                ? `/blog?category=${encodeURIComponent(selectedCategory)}&tag=${encodeURIComponent(tag)}`
                : `/blog?tag=${encodeURIComponent(tag)}`
              
              return (
                <Link
                  key={tag}
                  href={isActive ? (selectedCategory ? `/blog?category=${encodeURIComponent(selectedCategory)}` : "/blog") : href}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

