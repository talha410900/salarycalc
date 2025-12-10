import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Clock, Landmark, Wallet, Timer, CalendarDays, Calculator, ArrowRight } from "lucide-react"
import Link from "next/link"

const calculators = [
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
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">Salary & Wage Calculators</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">Professional tools for accurate income calculations and conversions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {calculators.map((calc) => (
            <Link key={calc.title} href={calc.href} className="group">
              <Card className="relative h-full overflow-hidden bg-card border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group-hover:-translate-y-1 !py-0">
                {/* Subtle background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Decorative icon - top right corner, increased opacity */}
                <div className="absolute -right-6 -bottom-6 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none">
                  <calc.icon className={`h-24 w-24 ${calc.iconColor}`} />
                </div>

                <CardContent className="p-4 relative z-10">
             
                  
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
