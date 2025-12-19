import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SalaryToHourlyCalculator } from "@/components/calculators/salary-to-hourly-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Salary to Hourly Calculator | Convert Annual Salary to Hourly Rate",
  description: "Convert your annual salary to hourly rate. Find out your equivalent hourly wage based on your work schedule. Free salary to hourly calculator for 2025-2026.",
  keywords: "salary to hourly calculator, annual salary to hourly, convert salary to hourly, salary hourly converter, hourly rate calculator",
  openGraph: {
    title: "Salary to Hourly Calculator | Convert Annual Salary to Hourly Rate",
    description: "Convert your annual salary to hourly rate. Find out your equivalent hourly wage based on your work schedule.",
  },
}

export default function SalaryToHourlyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Salary to Hourly Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert your annual salary into an equivalent hourly rate based on your work schedule.
            </p>
          </div>

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>salary to hourly calculator</strong> helps you convert your annual salary to hourly rate. 
              This <strong>annual salary to hourly</strong> calculator calculates your equivalent hourly wage based on your annual salary, hours worked per week, and weeks worked per year. 
              Use this <strong>salary hourly converter</strong> to understand your hourly rate and compare salaried vs. hourly positions.
            </p>
          </div>

          <SalaryToHourlyCalculator />

          {/* How Salary to Hourly Calculator Works */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How the Salary to Hourly Calculator Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The <strong>salary to hourly calculator</strong> divides your annual salary by the total number of hours you work per year. 
                For example, if you earn $52,000 per year and work 40 hours per week for 52 weeks, your hourly rate would be $52,000 ÷ (40 × 52) = $25 per hour. 
                The calculator accounts for paid time off and allows you to adjust the number of working weeks accordingly.
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
                <Link href="/calculators/hourly-to-salary" className="text-primary hover:underline">
                  Hourly to Salary Calculator
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
