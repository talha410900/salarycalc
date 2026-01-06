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
  const searchQuery = searchParams.get("search")

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
              href={(() => {
                const params = new URLSearchParams()
                if (selectedTag) params.set("tag", selectedTag)
                if (searchQuery) params.set("search", searchQuery)
                return params.toString() ? `/blog?${params.toString()}` : "/blog"
              })()}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {selectedCategory}
              <X className="h-3 w-3" />
            </Link>
          )}
          {selectedTag && (
            <Link
              href={(() => {
                const params = new URLSearchParams()
                if (selectedCategory) params.set("category", selectedCategory)
                if (searchQuery) params.set("search", searchQuery)
                return params.toString() ? `/blog?${params.toString()}` : "/blog"
              })()}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {selectedTag}
              <X className="h-3 w-3" />
            </Link>
          )}
          {(selectedCategory || selectedTag) && (
            <Link
              href={searchQuery ? `/blog?search=${encodeURIComponent(searchQuery)}` : "/blog"}
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
              const params = new URLSearchParams()
              if (!isActive) params.set("category", category)
              if (selectedTag) params.set("tag", selectedTag)
              if (searchQuery) params.set("search", searchQuery)
              const href = params.toString() ? `/blog?${params.toString()}` : "/blog"
              
              return (
                <Link
                  key={category}
                  href={isActive ? (searchQuery ? `/blog?search=${encodeURIComponent(searchQuery)}` : "/blog") : href}
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
              const params = new URLSearchParams()
              if (selectedCategory) params.set("category", selectedCategory)
              if (!isActive) params.set("tag", tag)
              if (searchQuery) params.set("search", searchQuery)
              const href = params.toString() ? `/blog?${params.toString()}` : "/blog"
              
              const clearParams = new URLSearchParams()
              if (selectedCategory) clearParams.set("category", selectedCategory)
              if (searchQuery) clearParams.set("search", searchQuery)
              const clearHref = clearParams.toString() ? `/blog?${clearParams.toString()}` : "/blog"
              
              return (
                <Link
                  key={tag}
                  href={isActive ? clearHref : href}
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

