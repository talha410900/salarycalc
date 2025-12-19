import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArizonaTaxCalculator } from "@/components/calculators/arizona-tax-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Arizona State Tax Calculator | AZ Tax Calculator 2025-2026",
  description: "Calculate your Arizona state income tax withholding using the flat 2.5% rate for 2025-2026. Free Arizona tax calculator with federal and state tax estimates.",
  keywords: "arizona tax calculator, arizona state tax calculator, AZ tax calculator, arizona income tax calculator, arizona tax 2025-2026",
  openGraph: {
    title: "Arizona State Tax Calculator | AZ Tax Calculator 2025-2026",
    description: "Calculate your Arizona state income tax withholding using the flat 2.5% rate for 2025-2026.",
  },
}

export default function ArizonaTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Arizona State Tax Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your Arizona state income tax withholding using the flat tax rate.
            </p>
          </div>

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>arizona tax calculator</strong> helps you calculate Arizona state income tax for 2025-2026. 
              This <strong>arizona state tax calculator</strong> uses Arizona's flat 2.5% tax rate to estimate your state income tax withholding. 
              Use this <strong>AZ tax calculator</strong> to understand how much Arizona state tax will be deducted from your paycheck.
            </p>
          </div>

          <ArizonaTaxCalculator />

          {/* How Arizona Tax Calculator Works */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How the Arizona Tax Calculator Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The <strong>arizona tax calculator</strong> calculates Arizona state income tax using a flat 2.5% rate on all taxable income. 
                Unlike states with progressive tax brackets, Arizona applies the same rate regardless of income level. 
                The calculator multiplies your taxable income by 2.5% to determine your Arizona state tax liability for 2025-2026.
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
                <Link href="/calculators/tax-return" className="text-primary hover:underline">
                  Tax Return Calculator
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
