import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RealEstateCapitalGainsCalculator } from "@/components/calculators/real-estate-capital-gains-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Real Estate Capital Gains Calculator | Home Sale Tax Calculator",
  description: "Estimate tax on home sale considering the primary residence exclusion. Calculate capital gains tax on real estate. Free calculator.",
  keywords: "real estate capital gains tax, home sale tax calculator, primary residence exclusion, capital gains on home sale",
  openGraph: {
    title: "Real Estate Capital Gains Calculator | Home Sale Tax Calculator",
    description: "Estimate tax on home sale considering the primary residence exclusion. Calculate capital gains tax on real estate.",
  },
}

export default function RealEstateCapitalGainsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Real Estate Capital Gains Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estimates tax on home sale considering the primary residence exclusion.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Use our <strong>real estate capital gains tax calculator</strong> to estimate federal tax on home sales with primary residence exclusion ($250k single, $500k married). 
              This <strong>home sale tax calculator</strong> calculates total gain, applies exclusion, and determines taxable gain at long-term capital gains rates (0%, 15%, 20%) plus 3.8% NIIT. Enter sale price, purchase price, and filing status.
            </p>
          </div>

          <RealEstateCapitalGainsCalculator />

          {/* How It Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The calculator first determines your total gain by subtracting your purchase price and cost of improvements from the sale price. If the property qualifies as your primary residence (lived in 2 of the last 5 years), it applies the exclusion ($250,000 single, $500,000 married). The taxable gain is then subject to long-term capital gains rates (0%, 15%, or 20% based on your total income). For high-income taxpayers (MAGI over $200,000 single or $250,000 married), it also adds the 3.8% Net Investment Income Tax (NIIT) on the taxable gain.
              </p>
            </CardContent>
          </Card>

          {/* Formulas Used Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Formulas Used</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <div className="space-y-3">
                <p><strong>Total Gain:</strong> Total Gain = Sale Price - (Purchase Price + Cost of Improvements)</p>
                <p><strong>Primary Residence Exclusion:</strong> Exclusion = $250,000 (single) or $500,000 (married) if lived in home 2 of last 5 years, otherwise $0</p>
                <p><strong>Taxable Gain:</strong> Taxable Gain = max(0, Total Gain - Exclusion)</p>
                <p><strong>Capital Gains Tax:</strong> Tax = Taxable Gain × Rate (0% if income ≤ $44,725 single/$89,450 married, 15% if ≤ $492,300 single/$553,850 married, 20% if above)</p>
                <p><strong>NIIT:</strong> NIIT = Taxable Gain × 0.038 if MAGI &gt; $200,000 (single) or $250,000 (married)</p>
                <p><strong>Total Tax:</strong> Total Tax = Capital Gains Tax + NIIT</p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="primary-residence">
                  <AccordionTrigger className="text-left font-semibold">What qualifies as a primary residence?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    To qualify for the primary residence exclusion, you must have owned and used the home as your main residence for at least 2 years out of the 5 years ending on the date of sale. The 2 years don't need to be consecutive, but you must meet both the ownership and use tests. You can only claim this exclusion once every 2 years. If you don't meet these requirements, the full gain is taxable.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="improvements">
                  <AccordionTrigger className="text-left font-semibold">What counts as improvements?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Improvements are permanent additions or changes that increase your home's value, prolong its useful life, or adapt it to new uses. Examples include: room additions, kitchen or bathroom renovations, new roof, new HVAC system, landscaping, new flooring, built-in appliances, and major repairs. Regular maintenance and repairs (like painting, fixing leaks, or replacing broken items) don't count as improvements and cannot be added to your basis.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

