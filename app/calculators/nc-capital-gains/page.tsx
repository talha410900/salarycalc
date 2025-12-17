import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NCCapitalGainsCalculator } from "@/components/calculators/nc-capital-gains-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "North Carolina Capital Gains Tax Calculator 2025-2026 | NC Capital Gains Tax",
  description: "Calculate North Carolina and federal capital gains tax on your investment gains. Free north carolina capital gains tax calculator.",
  keywords: "north carolina capital gains tax calculator, nc capital gains calculator, north carolina capital gains tax, nc investment tax calculator",
  openGraph: {
    title: "North Carolina Capital Gains Tax Calculator 2025-2026",
    description: "Calculate North Carolina and federal capital gains tax on your investment gains.",
  },
}

export default function NCCapitalGainsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">North Carolina Capital Gains Tax Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate North Carolina and federal capital gains tax on your investment gains.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>north carolina capital gains tax calculator</strong> helps you calculate NC and federal capital gains tax. 
              This <strong>nc capital gains calculator</strong> estimates North Carolina's flat 4.5% tax on capital gains (taxed as ordinary income), 
              federal capital gains tax at preferential rates (0%, 15%, or 20%), and the 3.8% NIIT for high-income taxpayers.
            </p>
          </div>

          <NCCapitalGainsCalculator />

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                North Carolina taxes capital gains at a flat 4.5% rate (capital gains are taxed as ordinary income in NC). 
                Federal capital gains are taxed at preferential rates (0%, 15%, or 20% for long-term gains). 
                High-income taxpayers may also owe the 3.8% Net Investment Income Tax (NIIT). 
                This calculator provides estimates for 2025-2026 tax rates.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

