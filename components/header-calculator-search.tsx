"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Search, ChevronRight, Calculator, X, DollarSign, TrendingUp, Home, ShoppingCart, Receipt, Package, MapPin } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchCalculators, type CalculatorItem } from "@/lib/all-calculators"

const categoryIcons: Record<string, typeof Calculator> = {
  "Tax Calculators": Calculator,
  "Salary Calculators": DollarSign,
  "Capital Gains / Investment": TrendingUp,
  "Property / Mortgage": Home,
  "Sales / Vehicle / Excise (Golden)": ShoppingCart,
  "Payroll / Paycheck / Withholding": Receipt,
  "Import and Customs": Package,
  "State Tax Calculators": MapPin,
}

export function HeaderCalculatorSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Search all calculators
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return {}
    return searchCalculators(searchQuery)
  }, [searchQuery])

  const hasResults = Object.keys(searchResults).length > 0

  // Close search on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
        setIsOpen(false)
      }
    }

    if (isSearchFocused || isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSearchFocused, isOpen])

  // Open dropdown when focused or has query
  useEffect(() => {
    setIsOpen(isSearchFocused && (hasResults || searchQuery.trim().length > 0))
  }, [isSearchFocused, hasResults, searchQuery])

  const handleFocus = () => {
    setIsSearchFocused(true)
  }

  const handleClear = () => {
    setSearchQuery("")
    setIsSearchFocused(false)
    setIsOpen(false)
  }

  const handleResultClick = () => {
    setSearchQuery("")
    setIsSearchFocused(false)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full lg:w-auto" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search calculators..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleFocus}
          className="pl-9 pr-9 h-9 w-full lg:w-[200px] xl:w-[280px] text-sm bg-card border-border shadow-sm"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl z-[100] max-h-[400px] lg:max-h-[500px] overflow-y-auto">
          {hasResults ? (
            <>
              {Object.entries(searchResults).map(([category, calculators]) => {
                const CategoryIcon = categoryIcons[category] || Calculator
                return (
                  <div key={category} className="border-b border-border/50 last:border-0">
                    {/* Category Header */}
                    <div className="px-3 py-2 bg-secondary/30 border-b border-border/30">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="h-3.5 w-3.5 text-primary" />
                        <span className="font-semibold text-xs text-foreground">{category}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {calculators.length}
                        </span>
                      </div>
                    </div>

                    {/* Calculator Results */}
                    <div className="py-1">
                      {calculators.slice(0, 5).map((calc, index) => (
                        <Link
                          key={`${category}-${calc.href}-${index}`}
                          href={calc.href}
                          onClick={handleResultClick}
                          className="flex items-center justify-between px-3 py-2 hover:bg-secondary/50 transition-colors group"
                        >
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                              <calc.icon className="h-3.5 w-3.5" />
                            </div>
                            <div className="text-left flex-1 min-w-0">
                              <div className="font-medium text-foreground text-sm group-hover:text-primary transition-colors truncate">
                                {calc.name}
                              </div>
                              {calc.description && (
                                <div className="text-xs text-muted-foreground truncate">
                                  {calc.description}
                                </div>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                      {calculators.length > 5 && (
                        <div className="px-3 py-1.5 text-xs text-muted-foreground text-center">
                          +{calculators.length - 5} more
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                No calculators found for "{searchQuery}"
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {["payroll", "tax", "salary", "california"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="text-xs px-2.5 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

