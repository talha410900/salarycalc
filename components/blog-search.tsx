"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useTransition, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const DEBOUNCE_DELAY = 300 // milliseconds

export function BlogSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialMount = useRef(true)

  // Update local state when URL param changes (e.g., when filters are cleared)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || ""
    // Only update if URL search differs from local state (external change)
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch)
    }
  }, [searchParams])

  // Debounced search function - only triggers on user input
  useEffect(() => {
    // Skip debounce on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString())
        
        if (searchQuery.trim()) {
          params.set("search", searchQuery.trim())
          params.delete("page") // Reset to first page when searching
        } else {
          params.delete("search")
        }
        
        router.push(`/blog?${params.toString()}`)
      })
    }, DEBOUNCE_DELAY)

    // Cleanup on unmount or when searchQuery changes
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]) // Only depend on searchQuery for debouncing - router and searchParams are stable

  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  const clearSearch = () => {
    // Clear the debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    
    setSearchQuery("")
    
    // Immediately update URL when clearing
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete("search")
      params.delete("page")
      router.push(`/blog?${params.toString()}`)
    })
  }

  return (
    <div className="mb-8">
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search blog posts by title, content, or tags..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-11 pr-10 h-12 text-base bg-card border-border shadow-sm"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

