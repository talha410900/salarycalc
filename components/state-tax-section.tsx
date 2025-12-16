"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, ArrowRight, MapPin, ChevronRight } from "lucide-react"
import { ALL_STATES, getTopMarginalRate } from "@/lib/state-tax-data"

const REGIONS: Record<string, string[]> = {
  "No Income Tax": [
    "alaska",
    "florida",
    "nevada",
    "new-hampshire",
    "south-dakota",
    "tennessee",
    "texas",
    "washington",
    "wyoming",
  ],
  Northeast: [
    "connecticut",
    "delaware",
    "district-of-columbia",
    "maine",
    "maryland",
    "massachusetts",
    "new-hampshire",
    "new-jersey",
    "new-york",
    "pennsylvania",
    "rhode-island",
    "vermont",
  ],
  Southeast: [
    "alabama",
    "arkansas",
    "florida",
    "georgia",
    "kentucky",
    "louisiana",
    "mississippi",
    "north-carolina",
    "south-carolina",
    "tennessee",
    "virginia",
    "west-virginia",
  ],
  Midwest: [
    "illinois",
    "indiana",
    "iowa",
    "kansas",
    "michigan",
    "minnesota",
    "missouri",
    "nebraska",
    "north-dakota",
    "ohio",
    "south-dakota",
    "wisconsin",
  ],
  Southwest: ["arizona", "new-mexico", "oklahoma", "texas"],
  West: [
    "alaska",
    "california",
    "colorado",
    "hawaii",
    "idaho",
    "montana",
    "nevada",
    "oregon",
    "utah",
    "washington",
    "wyoming",
  ],
}

const POPULAR_STATES = ["california", "texas", "florida", "new-york", "illinois", "pennsylvania", "ohio", "georgia"]

export function StateTaxSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filter states based on search query (name or code)
  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase().trim()
    return ALL_STATES.filter(
      (state) =>
        state.name.toLowerCase().includes(query) ||
        state.code.toLowerCase().includes(query) ||
        state.slug.includes(query),
    ).slice(0, 10)
  }, [searchQuery])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const popularStatesData = POPULAR_STATES.map((slug) => ALL_STATES.find((s) => s.slug === slug)!).filter(Boolean)

  return (
    <section id="states" className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
            State Tax Calculators
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Calculate your state income tax for all 50 US states with 2025 tax brackets
          </p>
        </div>

        {/* Popular States */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <h3 className="text-base font-bold text-foreground mb-1">Popular States</h3>
            <p className="text-xs text-muted-foreground">Quick access to the most searched state tax calculators</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 max-w-5xl mx-auto">
            {popularStatesData.map((state) => {
              const taxRate = getTopMarginalRate(state.slug)
              const isNoTax = REGIONS["No Income Tax"].includes(state.slug)
              
              return (
                <Link key={state.slug} href={`/calculators/state/${state.slug}`}>
                  <Card className="group relative overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 bg-card border border-border hover:border-primary/50 h-full !py-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-3 flex flex-col gap-2 relative">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 font-bold text-primary text-xs transition-colors flex-shrink-0">
                          {state.code}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate leading-tight">
                            {state.name}
                          </h4>
                          {taxRate !== null && !isNoTax && (
                            <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                              Up to {taxRate}%
                            </p>
                          )}
                          {isNoTax && (
                            <p className="text-xs text-emerald-700 dark:text-emerald-600 font-medium mt-0.5 leading-tight">
                              No tax
                            </p>
                          )}
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-200 -translate-x-1 group-hover:translate-x-0 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* All States Grid */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">
            All States A-Z
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-w-6xl mx-auto">
            {ALL_STATES.sort((a, b) => a.name.localeCompare(b.name)).map((state) => (
              <Link
                key={state.slug}
                href={`/calculators/state/${state.slug}`}
                className="group flex items-center gap-2 p-2 rounded-lg hover:bg-card hover:shadow-sm transition-all border border-transparent hover:border-border"
              >
                <span className="text-xs font-bold text-primary w-6">{state.code}</span>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors truncate">
                  {state.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* No Income Tax States Highlight */}
        <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-4 w-4 text-emerald-700" />
            <h3 className="font-semibold text-sm text-emerald-800 dark:text-emerald-600">States with No Income Tax</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {REGIONS["No Income Tax"].map((slug) => {
              const state = ALL_STATES.find((s) => s.slug === slug)
              if (!state) return null
              return (
                <Link
                  key={slug}
                  href={`/calculators/state/${slug}`}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-medium hover:bg-emerald-700 transition-colors"
                >
                  {state.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
