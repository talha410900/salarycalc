import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Clock, Landmark, Wallet, Timer, CalendarDays, Calculator, Package, MapPin, TrendingUp, Home, Briefcase, ShoppingCart } from "lucide-react"
import Link from "next/link"

const calculators = [
  {
    icon: Calculator,
    title: "Payroll Tax Calculator",
    description: "Calculate net pay after all taxes (2025-2026)",
    href: "/calculators/payroll-tax",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-500/10",
    featured: true,
  },
  {
    icon: Package,
    title: "Customs and Import Duty",
    description: "Estimate US import duties and fees",
    href: "/calculators/customs-import-duty",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-500/10",
    featured: true,
  },
  {
    icon: MapPin,
    title: "Texas Paycheck",
    description: "No state tax calculator for Texas",
    href: "/calculators/texas-paycheck",
    iconColor: "text-red-600",
    iconBg: "bg-red-500/10",
    featured: true,
  },
  {
    icon: Calculator,
    title: "AMT Calculator",
    description: "Alternative Minimum Tax for 2025-2026",
    href: "/calculators/amt",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-500/10",
    featured: true,
  },
  {
    icon: TrendingUp,
    title: "CA Capital Gains",
    description: "California capital gains tax calculator",
    href: "/calculators/ca-capital-gains",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-500/10",
    featured: true,
  },
  {
    icon: Home,
    title: "Real Estate Gains",
    description: "Home sale capital gains calculator",
    href: "/calculators/real-estate-capital-gains",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-500/10",
    featured: true,
  },
  {
    icon: Briefcase,
    title: "Self-Employed Tax",
    description: "SE tax calculator for freelancers",
    href: "/calculators/self-employed-tax",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-500/10",
    featured: true,
  },
  {
    icon: ShoppingCart,
    title: "MN Sales Tax",
    description: "Minnesota sales tax calculator",
    href: "/calculators/mn-sales-tax",
    iconColor: "text-teal-600",
    iconBg: "bg-teal-500/10",
  },
  {
    icon: ShoppingCart,
    title: "LA Sales Tax",
    description: "Louisiana sales tax calculator 2025-2026",
    href: "/calculators/la-sales-tax",
    iconColor: "text-pink-600",
    iconBg: "bg-pink-500/10",
  },
  {
    icon: Package,
    title: "US Import Tax",
    description: "General US import duty calculator",
    href: "/calculators/us-import-tax",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-500/10",
  },
  {
    icon: Clock,
    title: "Hourly to Salary",
    description: "Convert hourly wage to annual salary",
    href: "/calculators/hourly-to-salary",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: DollarSign,
    title: "Salary to Hourly",
    description: "Find your equivalent hourly rate",
    href: "/calculators/salary-to-hourly",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-500/10",
  },
  {
    icon: CalendarDays,
    title: "Monthly to Yearly",
    description: "Convert monthly to annual salary",
    href: "/calculators/monthly-to-yearly",
    iconColor: "text-teal-600",
    iconBg: "bg-teal-500/10",
  },
  {
    icon: Calculator,
    title: "Bi-Weekly to Annual",
    description: "Convert bi-weekly paycheck",
    href: "/calculators/biweekly-to-annual",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-500/10",
  },
  {
    icon: Timer,
    title: "Overtime Pay",
    description: "Calculate overtime earnings",
    href: "/calculators/overtime-pay",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-500/10",
  },
  {
    icon: Landmark,
    title: "Federal Tax",
    description: "Federal income tax calculator",
    href: "/calculators/federal-tax",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-500/10",
  },
  {
    icon: Wallet,
    title: "Take-Home Pay",
    description: "Net pay after deductions",
    href: "/calculators/take-home-pay",
    iconColor: "text-green-600",
    iconBg: "bg-green-500/10",
  },
]

export function CalculatorGrid() {
  return (
    <section id="calculators" className="py-10 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">Tax and Salary Calculators</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">Professional tools for accurate tax, salary, and income calculations</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {calculators.map((calc) => (
            <Link key={calc.title} href={calc.href} className="group">
              <Card className={`relative h-full overflow-hidden bg-card border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group-hover:-translate-y-1 !py-0 ${
                calc.featured ? "border-primary/30 hover:border-primary/50" : "border-border/50 hover:border-border"
              }`}>
                {/* Subtle background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Decorative icon - top right corner, increased opacity */}
                <div className="absolute -right-6 -bottom-6 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none">
                  <calc.icon className={`h-24 w-24 ${calc.iconColor}`} />
                </div>

                <CardContent className="p-4 relative z-10">
                  {calc.featured && (
                    <span className="inline-block text-xs font-semibold text-primary-foreground mb-1.5 px-2 py-0.5 bg-primary rounded">
                      Popular
                    </span>
                  )}
                  <div className="space-y-0.5">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {calc.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-snug">
                      {calc.description}
                    </p>
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
