"use client"

import { useState, useMemo } from "react"
import { DollarSign, PieChart, TrendingUp, CheckCircle2, Search, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { ALL_STATES, getTopMarginalRate } from "@/lib/state-tax-data"
import { heroCalculators } from "@/lib/calculators"

export function HeroSection() {
  const [stateSearch, setStateSearch] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Filter states based on search
  const filteredStates = useMemo(() => {
    if (!stateSearch.trim()) return []
    const query = stateSearch.toLowerCase().trim()
    return ALL_STATES.filter(
      (state) => state.name.toLowerCase().includes(query) || state.code.toLowerCase().includes(query),
    ).slice(0, 6)
  }, [stateSearch])

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />
        <div className="absolute top-10 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] text-balance mb-4">
            Calculate Your <span className="text-primary">Salary</span> & Taxes
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 text-pretty leading-relaxed">
            Free, accurate salary & tax calculators for all 50 states. 2025 tax brackets included.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["100% Free", "No Sign-up", "2025 Rates", "All 50 States"].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* State Search Box */}
          <div className="max-w-md mx-auto mb-8 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search your state (e.g., CA, Texas, Florida)"
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="pl-11 h-12 text-base bg-card border-border shadow-sm"
              />
            </div>

            {/* Search Results */}
            {isSearchFocused && filteredStates.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-50">
                {filteredStates.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/calculators/state/${state.slug}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors border-b border-border/50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary font-bold text-xs">
                        {state.code}
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-foreground text-sm">{state.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {state.type === "None" ? "No Income Tax" : `Top Rate: ${getTopMarginalRate(state.slug)}`}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Calculator Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 max-w-4xl mx-auto mb-8">
            {heroCalculators.map((calc) => (
              <Link
                key={calc.name}
                href={calc.href}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <calc.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground text-center leading-tight">{calc.name}</span>
              </Link>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm text-foreground">Salary Conversion</div>
                <p className="text-xs text-muted-foreground">Hourly, monthly, yearly</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <PieChart className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm text-foreground">Tax Breakdown</div>
                <p className="text-xs text-muted-foreground">Federal & state taxes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm text-foreground">Take-Home Pay</div>
                <p className="text-xs text-muted-foreground">Your actual paycheck</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
