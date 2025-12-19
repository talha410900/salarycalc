import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HourlyToSalaryCalculator } from "@/components/calculators/hourly-to-salary-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hourly to Salary Calculator | Convert Hourly Wage to Annual Salary",
  description: "Convert your hourly wage to annual salary. Calculate your yearly income based on hours worked per week. Free hourly to salary calculator for 2025-2026.",
  keywords: "hourly to salary calculator, hourly wage to salary, convert hourly to annual, hourly to yearly calculator, hourly rate calculator",
  openGraph: {
    title: "Hourly to Salary Calculator | Convert Hourly Wage to Annual Salary",
    description: "Convert your hourly wage to annual salary. Calculate your yearly income based on hours worked per week.",
  },
}

export default function HourlyToSalaryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hourly to Salary Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert your hourly wage into an annual salary based on your work schedule. Factor in overtime, benefits,
              and more.
            </p>
          </div>

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>hourly to salary calculator</strong> helps you convert your hourly wage to annual salary. 
              This <strong>hourly wage to salary</strong> calculator calculates your yearly income based on your hourly rate, hours worked per week, and weeks worked per year. 
              Use this <strong>hourly to annual salary calculator</strong> to understand your total annual compensation and compare hourly vs. salaried positions.
            </p>
          </div>

          <HourlyToSalaryCalculator />

          {/* How Hourly to Salary Calculator Works */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How the Hourly to Salary Calculator Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The <strong>hourly to salary calculator</strong> multiplies your hourly wage by the number of hours you work per week, 
                then multiplies that by the number of weeks you work per year (typically 52 weeks for full-time employees). 
                For example, if you earn $25 per hour and work 40 hours per week for 52 weeks, your annual salary would be $25 × 40 × 52 = $52,000. 
                The calculator also accounts for paid time off, allowing you to adjust the number of working weeks accordingly.
              </p>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Related Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/calculators/salary-to-hourly" className="text-primary hover:underline">
                  Salary to Hourly Calculator
                </Link>
                <Link href="/calculators/take-home-pay" className="text-primary hover:underline">
                  Take-Home Pay Calculator
                </Link>
                <Link href="/calculators/overtime-pay" className="text-primary hover:underline">
                  Overtime Pay Calculator
                </Link>
                <Link href="/calculators/federal-tax" className="text-primary hover:underline">
                  Federal Tax Calculator
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
