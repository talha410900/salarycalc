"use client"

import Link from "next/link"
import { useState, useMemo, useRef } from "react"
import {
  Menu,
  X,
  Calculator,
  ChevronDown,
  Clock,
  DollarSign,
  CalendarDays,
  Timer,
  Landmark,
  Wallet,
  Search,
  MapPin,
  Package,
  TrendingUp,
  Home,
  Briefcase,
  ShoppingCart,
  Star,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { ALL_STATES, getTopMarginalRate } from "@/lib/state-tax-data"

const salaryCalculators = [
  { icon: Clock, name: "Hourly to Salary", href: "/calculators/hourly-to-salary" },
  { icon: DollarSign, name: "Salary to Hourly", href: "/calculators/salary-to-hourly" },
  { icon: CalendarDays, name: "Monthly to Yearly", href: "/calculators/monthly-to-yearly" },
  { icon: Calculator, name: "Bi-Weekly to Annual", href: "/calculators/biweekly-to-annual" },
  { icon: Timer, name: "Overtime Pay", href: "/calculators/overtime-pay" },
]

const taxCalculators = [
  { icon: Landmark, name: "Federal Tax", href: "/calculators/federal-tax" },
  { icon: Wallet, name: "Take-Home Pay", href: "/calculators/take-home-pay" },
]

const popularCalculators = [
  { icon: Calculator, name: "Payroll Tax Calculator", href: "/calculators/payroll-tax" },
  { icon: Package, name: "Customs & Import Duty", href: "/calculators/customs-import-duty" },
  { icon: MapPin, name: "Texas Paycheck", href: "/calculators/texas-paycheck" },
  { icon: Calculator, name: "AMT Calculator", href: "/calculators/amt" },
  { icon: TrendingUp, name: "CA Capital Gains", href: "/calculators/ca-capital-gains" },
  { icon: Home, name: "Real Estate Gains", href: "/calculators/real-estate-capital-gains" },
  { icon: Briefcase, name: "Self-Employed Tax", href: "/calculators/self-employed-tax" },
  { icon: ShoppingCart, name: "MN Sales Tax", href: "/calculators/mn-sales-tax" },
  { icon: ShoppingCart, name: "LA Sales Tax", href: "/calculators/la-sales-tax" },
  { icon: Package, name: "US Import Tax", href: "/calculators/us-import-tax" },
]

const popularStates = ["california", "texas", "florida", "new-york", "illinois", "pennsylvania"]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [salaryMenuOpen, setSalaryMenuOpen] = useState(false)
  const [popularMenuOpen, setPopularMenuOpen] = useState(false)
  const [stateMenuOpen, setStateMenuOpen] = useState(false)
  const [stateSearch, setStateSearch] = useState("")
  const stateMenuRef = useRef<HTMLDivElement>(null)

  // Filter states based on search
  const filteredStates = useMemo(() => {
    if (!stateSearch.trim()) {
      return popularStates.map((slug) => ALL_STATES.find((s) => s.slug === slug)!).filter(Boolean)
    }
    const query = stateSearch.toLowerCase().trim()
    return ALL_STATES.filter(
      (state) => state.name.toLowerCase().includes(query) || state.code.toLowerCase().includes(query),
    ).slice(0, 8)
  }, [stateSearch])

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-md">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">SalaryCalc</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Salary Calculators Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSalaryMenuOpen(true)}
              onMouseLeave={() => setSalaryMenuOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors">
                Calculators
                <ChevronDown className={`h-4 w-4 transition-transform ${salaryMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {salaryMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-[400px] p-4 bg-card rounded-xl border border-border shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="mb-3">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Salary Converters
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {salaryCalculators.map((calc) => (
                        <Link
                          key={calc.name}
                          href={calc.href}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors group"
                        >
                          <calc.icon className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">{calc.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Tax Calculators
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {taxCalculators.map((calc) => (
                        <Link
                          key={calc.name}
                          href={calc.href}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors group"
                        >
                          <calc.icon className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">{calc.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Popular Calculators Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPopularMenuOpen(true)}
              onMouseLeave={() => setPopularMenuOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors">
                <Star className="h-4 w-4" />
                Popular
                <ChevronDown className={`h-4 w-4 transition-transform ${popularMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {popularMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-[400px] p-4 bg-card rounded-xl border border-border shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Most Searched Calculators
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {popularCalculators.map((calc) => (
                      <Link
                        key={calc.name}
                        href={calc.href}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors group"
                      >
                        <calc.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">{calc.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* State Taxes Dropdown with Search */}
            <div
              ref={stateMenuRef}
              className="relative"
              onMouseEnter={() => setStateMenuOpen(true)}
              onMouseLeave={() => {
                setStateMenuOpen(false)
                setStateSearch("")
              }}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors">
                <MapPin className="h-4 w-4" />
                State Taxes
                <ChevronDown className={`h-4 w-4 transition-transform ${stateMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {stateMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-[350px] bg-card rounded-xl border border-border shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Search Input */}
                  <div className="p-3 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search state (e.g., CA, Texas)"
                        value={stateSearch}
                        onChange={(e) => setStateSearch(e.target.value)}
                        className="pl-8 h-9 text-sm"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* State Results */}
                  <div className="p-2 max-h-[300px] overflow-y-auto">
                    {!stateSearch.trim() && (
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1 mb-1">
                        Popular States
                      </div>
                    )}
                    {filteredStates.map((state) => (
                      <Link
                        key={state.slug}
                        href={`/calculators/state/${state.slug}`}
                        className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-primary w-6">{state.code}</span>
                          <span className="text-sm text-foreground">{state.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {state.type === "None" ? "No Tax" : getTopMarginalRate(state.slug)}
                        </span>
                      </Link>
                    ))}
                    {stateSearch.trim() && filteredStates.length === 0 && (
                      <div className="text-center text-sm text-muted-foreground py-4">No states found</div>
                    )}
                  </div>

                  {/* View All Link */}
                  <div className="p-2 border-t border-border">
                    <Link
                      href="/#states"
                      className="flex items-center justify-center gap-1 text-sm font-medium text-primary hover:underline py-1"
                    >
                      View All 50 States + D.C.
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/tax-brackets"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
            >
              Tax Brackets
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Star className="h-3 w-3" />
                Popular Calculators
              </div>
              {popularCalculators.map((calc) => (
                <Link
                  key={calc.name}
                  href={calc.href}
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <calc.icon className="h-4 w-4 text-primary" />
                  {calc.name}
                </Link>
              ))}

              <div className="h-px bg-border my-2" />

              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Salary Calculators
              </div>
              {salaryCalculators.map((calc) => (
                <Link
                  key={calc.name}
                  href={calc.href}
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <calc.icon className="h-4 w-4 text-primary" />
                  {calc.name}
                </Link>
              ))}

              <div className="h-px bg-border my-2" />

              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Tax Calculators
              </div>
              {taxCalculators.map((calc) => (
                <Link
                  key={calc.name}
                  href={calc.href}
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <calc.icon className="h-4 w-4 text-primary" />
                  {calc.name}
                </Link>
              ))}

              <div className="h-px bg-border my-2" />

              <Link
                href="#states"
                className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MapPin className="h-4 w-4 text-primary" />
                All 50 State Tax Calculators
              </Link>

              <Link
                href="/tax-brackets"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tax Brackets
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
