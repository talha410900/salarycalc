import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OvertimePayCalculator } from "@/components/calculators/overtime-pay-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Overtime Pay Calculator | Calculate Overtime Earnings 2025-2026",
  description: "Calculate your overtime earnings. See your total weekly pay with regular and overtime hours. Free overtime pay calculator for 2025-2026.",
  keywords: "overtime pay calculator, overtime calculator, overtime earnings calculator, calculate overtime pay, overtime rate calculator",
  openGraph: {
    title: "Overtime Pay Calculator | Calculate Overtime Earnings 2025-2026",
    description: "Calculate your overtime earnings. See your total weekly pay with regular and overtime hours.",
  },
}

export default function OvertimePayPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Overtime Pay Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your overtime earnings based on your hourly rate, overtime hours, and multiplier.
            </p>
          </div>

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>overtime pay calculator</strong> helps you calculate your overtime earnings for 2025-2026. 
              This <strong>overtime calculator</strong> calculates your total weekly pay including regular hours and overtime hours at 1.5x your regular rate (or custom multiplier). 
              Use this <strong>overtime earnings calculator</strong> to understand how much you'll earn with overtime and plan your work schedule accordingly.
            </p>
          </div>

          <OvertimePayCalculator />

          {/* How Overtime Pay Calculator Works */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How the Overtime Pay Calculator Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The <strong>overtime pay calculator</strong> calculates your overtime earnings by multiplying your hourly rate by the overtime multiplier (typically 1.5x for time-and-a-half) and the number of overtime hours worked. 
                For example, if you earn $20 per hour and work 5 hours of overtime at 1.5x, your overtime pay would be $20 × 1.5 × 5 = $150. 
                The calculator also shows your regular pay and total weekly pay including overtime.
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
                <Link href="/calculators/federal-tax" className="text-primary hover:underline">
                  Federal Tax Calculator
                </Link>
                <Link href="/calculators/payroll-tax" className="text-primary hover:underline">
                  Payroll Tax Calculator
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
