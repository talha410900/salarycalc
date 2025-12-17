import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NYMortgageTaxCalculator } from "@/components/calculators/ny-mortgage-tax-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NY Mortgage Tax Calculator 2025-2026 | New York Mortgage Recording Tax",
  description: "Calculate New York mortgage recording tax by county. Free NY mortgage tax calculator for NYC, Nassau, Suffolk, Westchester, and other NY counties.",
  keywords: "ny mortgage tax calculator, new york mortgage tax calculator, nyc mortgage tax calculator, new york mortgage recording tax",
  openGraph: {
    title: "NY Mortgage Tax Calculator 2025-2026",
    description: "Calculate New York mortgage recording tax by county.",
  },
}

export default function NYMortgageTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">NY Mortgage Tax Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate New York mortgage recording tax on your home loan by county.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>ny mortgage tax calculator</strong> helps you calculate New York mortgage recording tax by county. 
              This <strong>new york mortgage tax calculator</strong> estimates the mortgage tax you'll pay when recording your mortgage in New York, 
              with rates ranging from 0.5% (other counties) to 1.8% (New York City).
            </p>
          </div>

          <NYMortgageTaxCalculator />

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                New York mortgage recording tax rates vary by county. New York City has the highest rate at 1.8%, 
                while Nassau, Suffolk, and Westchester counties charge 1.05%. Other New York counties typically charge 0.5%. 
                The calculator multiplies your loan amount by the appropriate county rate to determine the mortgage tax.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

