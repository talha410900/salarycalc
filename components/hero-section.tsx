"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { DollarSign, PieChart, TrendingUp, CheckCircle2, Search, ChevronRight, Calculator, MapPin, Package, Home, Briefcase, ShoppingCart, Receipt, Car } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { allCalculators, searchCalculators, type CalculatorItem } from "@/lib/all-calculators"
import { heroCalculators } from "@/lib/calculators"

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

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
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
      }
    }

    if (isSearchFocused) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSearchFocused])

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />
        <div className="absolute top-10 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl  font-bold text-foreground leading-[1.1] text-balance mb-4">
            Calculate Smarter, Not Harder <br /> <span className="text-primary">Salary and Tax Estimator USA</span> Made Simple at TaxSal
          </h2>

          <h3 className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 text-pretty leading-relaxed">
            Accurately calculate salary, income tax, and take-home pay for every U.S. state with our free online salary & tax estimator.
          </h3>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 text-pretty leading-relaxed">
            TaxSal is a free salary and tax estimator USA designed to help you calculate accurate take-home pay and income tax for all 50 states.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["100% Free", "No Sign-up", "2025-2026 Rates", "All 50 States"].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Advanced Calculator Search Box */}
          <div className="max-w-2xl mx-auto mb-8 relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search any calculator (e.g., payroll tax, california, mortgage, capital gains...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="pl-11 h-12 text-base bg-card border-border shadow-sm"
              />
            </div>

            {/* Search Results - Categorized */}
            {isSearchFocused && hasResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl z-50 max-h-[600px] overflow-y-auto">
                {Object.entries(searchResults).map(([category, calculators]) => {
                  const CategoryIcon = categoryIcons[category] || Calculator
                  return (
                    <div key={category} className="border-b border-border/50 last:border-0">
                      {/* Category Header */}
                      <div className="px-4 py-2.5 bg-secondary/30 border-b border-border/30">
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm text-foreground">{category}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {calculators.length} {calculators.length === 1 ? "result" : "results"}
                          </span>
                        </div>
                      </div>

                      {/* Calculator Results */}
                      <div className="py-1">
                        {calculators.map((calc, index) => (
                          <Link
                            key={`${category}-${calc.href}-${index}`}
                            href={calc.href}
                            onClick={() => {
                              setSearchQuery("")
                              setIsSearchFocused(false)
                            }}
                            className="flex items-center justify-between px-4 py-2.5 hover:bg-secondary/50 transition-colors group"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                                <calc.icon className="h-4 w-4" />
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
                            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* No Results Message */}
            {isSearchFocused && searchQuery.trim() && !hasResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  No calculators found for "{searchQuery}". Try searching for:
                </p>
                <div className="mt-3 flex flex-wrap gap-2 justify-center">
                  {["payroll", "tax", "salary", "california", "mortgage"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setSearchQuery(suggestion)}
                      className="text-xs px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
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
                <p className="text-xs text-muted-foreground">Federal and state taxes</p>
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
