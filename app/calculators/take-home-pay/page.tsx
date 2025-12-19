import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TakeHomePayCalculator } from "@/components/calculators/take-home-pay-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Take-Home Pay Calculator | Net Pay Calculator 2025-2026 | TaxSal",
  description: "Calculate your net take-home pay after all tax deductions including federal, state, Social Security, and Medicare for 2025-2026. Free take-home pay calculator.",
  keywords: "take home pay calculator, net pay calculator, paycheck calculator, after tax salary calculator, take home pay 2025-2026",
  openGraph: {
    title: "Take-Home Pay Calculator | Net Pay Calculator 2025-2026",
    description: "Calculate your net take-home pay after all tax deductions including federal, state, Social Security, and Medicare for 2025-2026.",
  },
}

export default function TakeHomePayPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Take-Home Pay Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your actual paycheck amount after all taxes and deductions.
            </p>
          </div>

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>take-home pay calculator</strong> helps you calculate your net pay after all tax deductions for 2025-2026. 
              This <strong>net pay calculator</strong> estimates your actual paycheck amount by deducting federal tax, state tax, Social Security, and Medicare from your gross salary. 
              Use this <strong>take home pay calculator</strong> to understand how much money you'll actually receive in your bank account after taxes.
            </p>
          </div>

          <TakeHomePayCalculator />

          {/* How Take-Home Pay Calculator Works */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How the Take-Home Pay Calculator Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The <strong>take-home pay calculator</strong> calculates your net pay by subtracting all applicable taxes and deductions from your gross salary. 
                It includes federal income tax (based on 2025-2026 tax brackets), state income tax (if applicable), Social Security tax (6.2% on wages up to $176,100), 
                and Medicare tax (1.45% on all wages, plus 0.9% for high earners). The calculator also accounts for optional deductions like 401(k) contributions, 
                health insurance, and other pre-tax benefits to give you an accurate estimate of your <strong>take home pay</strong>.
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
                <Link href="/calculators/federal-tax" className="text-primary hover:underline">
                  Federal Tax Calculator
                </Link>
                <Link href="/calculators/payroll-tax" className="text-primary hover:underline">
                  Payroll Tax Calculator
                </Link>
                <Link href="/calculators/tax-return" className="text-primary hover:underline">
                  Tax Return Calculator
                </Link>
                <Link href="/calculators/hourly-to-salary" className="text-primary hover:underline">
                  Hourly to Salary Calculator
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
