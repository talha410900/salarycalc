import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MortgageTaxCalculator } from "@/components/calculators/mortgage-tax-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tax Mortgage Calculator 2025-2026 | Free Mortgage Recording Tax Calculator",
  description: "Calculate mortgage tax (mortgage recording tax) on your home loan. Free tax mortgage calculator to estimate mortgage recording tax costs.",
  keywords: "tax mortgage calculator, mortgage tax calculator, mortgage recording tax calculator, mortgage tax rate calculator",
  openGraph: {
    title: "Tax Mortgage Calculator 2025-2026",
    description: "Calculate mortgage tax (mortgage recording tax) on your home loan.",
  },
}

export default function MortgageTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tax Mortgage Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate mortgage tax (mortgage recording tax) on your home loan.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>tax mortgage calculator</strong> helps you calculate mortgage recording tax on your home loan. 
              This <strong>mortgage tax calculator</strong> estimates the one-time mortgage tax you'll pay when recording your mortgage, 
              typically ranging from 0.5% to 2.05% of the loan amount depending on your state and county.
            </p>
          </div>

          <MortgageTaxCalculator />

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                Mortgage tax (also called mortgage recording tax) is a one-time tax charged when you record a mortgage with the local government. 
                The calculator multiplies your loan amount by the mortgage tax rate to determine the tax amount. 
                Rates vary significantly by state and county, so check with your local recorder's office for the exact rate in your area.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Formulas Used</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <div className="space-y-3">
                <p><strong>Mortgage Tax:</strong> Mortgage Tax = Loan Amount × Mortgage Tax Rate</p>
                <p><strong>Total Cost:</strong> Total Cost = Loan Amount + Mortgage Tax</p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Related Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/calculators/ny-mortgage-tax" className="text-primary hover:underline">
                  NY Mortgage Tax Calculator
                </Link>
                <Link href="/calculators/va-property-tax-car" className="text-primary hover:underline">
                  VA Property Tax Calculator
                </Link>
                <Link href="/calculators/illinois-property-tax" className="text-primary hover:underline">
                  Illinois Property Tax Calculator
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

