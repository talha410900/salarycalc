import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewYorkTaxCalculator } from "@/components/calculators/new-york-tax-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New York State Tax Calculator | NY Tax Calculator 2025-2026",
  description: "Calculate your New York state income tax using progressive tax brackets for 2025-2026. Free New York tax calculator with federal and state tax estimates.",
  keywords: "new york tax calculator, new york state tax calculator, NY tax calculator, new york income tax calculator, ny tax 2025-2026",
  openGraph: {
    title: "New York State Tax Calculator | NY Tax Calculator 2025-2026",
    description: "Calculate your New York state income tax using progressive tax brackets for 2025-2026.",
  },
}

export default function NewYorkTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">New York State Tax Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your NY state income tax using 2025-2026 progressive tax brackets.
            </p>
          </div>

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>new york tax calculator</strong> helps you calculate New York state income tax for 2025-2026. 
              This <strong>new york state tax calculator</strong> uses New York's progressive tax brackets to estimate your state income tax withholding. 
              Use this <strong>NY tax calculator</strong> to understand how much New York state tax will be deducted from your paycheck.
            </p>
          </div>

          <NewYorkTaxCalculator />

          {/* How New York Tax Calculator Works */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How the New York Tax Calculator Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The <strong>new york tax calculator</strong> calculates New York state income tax using progressive tax brackets for 2025-2026. 
                New York's tax rates range from 4% to 10.9% depending on your income level and filing status. 
                The calculator applies the appropriate bracket rates to your taxable income to determine your New York state tax liability.
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
                <Link href="/calculators/take-home-pay" className="text-primary hover:underline">
                  Take-Home Pay Calculator
                </Link>
                <Link href="/calculators/payroll-tax" className="text-primary hover:underline">
                  Payroll Tax Calculator
                </Link>
                <Link href="/calculators/ny-mortgage-tax" className="text-primary hover:underline">
                  NY Mortgage Tax Calculator
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
