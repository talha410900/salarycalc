import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NorthCarolinaTaxCalculator } from "@/components/calculators/north-carolina-tax-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "North Carolina Tax Calculator | NC Tax Calculator 2025-2026",
  description: "Calculate your North Carolina state income tax using the 4.5% flat rate for 2025-2026. Free North Carolina tax calculator with federal and state tax estimates.",
  keywords: "north carolina tax calculator, north carolina state tax calculator, NC tax calculator, north carolina income tax calculator, nc tax 2025-2026",
  openGraph: {
    title: "North Carolina Tax Calculator | NC Tax Calculator 2025-2026",
    description: "Calculate your North Carolina state income tax using the 4.5% flat rate for 2025-2026.",
  },
}

export default function NorthCarolinaTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">North Carolina Tax Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your NC state income tax using the flat 4.5% rate.
            </p>
          </div>

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>north carolina tax calculator</strong> helps you calculate North Carolina state income tax for 2025-2026. 
              This <strong>north carolina state tax calculator</strong> uses North Carolina's flat 4.5% tax rate to estimate your state income tax withholding. 
              Use this <strong>NC tax calculator</strong> to understand how much North Carolina state tax will be deducted from your paycheck.
            </p>
          </div>

          <NorthCarolinaTaxCalculator />

          {/* How North Carolina Tax Calculator Works */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How the North Carolina Tax Calculator Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The <strong>north carolina tax calculator</strong> calculates North Carolina state income tax using a flat 4.5% rate on all taxable income. 
                Unlike states with progressive tax brackets, North Carolina applies the same rate regardless of income level. 
                The calculator multiplies your taxable income by 4.5% to determine your North Carolina state tax liability for 2025-2026.
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
                <Link href="/calculators/nc-capital-gains" className="text-primary hover:underline">
                  NC Capital Gains Calculator
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
