import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CACapitalGainsCalculator } from "@/components/calculators/ca-capital-gains-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "California Capital Gains Tax Calculator 2025 | CA Capital Gains Tax",
  description: "Calculate California state tax on capital gains. CA taxes capital gains as ordinary income with no special lower rate. Free calculator.",
  keywords: "california capital gains tax, CA capital gains calculator, california tax on gains, capital gains tax california 2025",
  openGraph: {
    title: "California Capital Gains Tax Calculator 2025 | CA Capital Gains Tax",
    description: "Calculate California state tax on capital gains. CA taxes capital gains as ordinary income.",
  },
}

export default function CACapitalGainsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">California Capital Gains Tax Calculator 2025</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculates CA state tax on capital gains (taxed as ordinary income).
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our <strong>California capital gains tax calculator</strong> calculates CA state tax on capital gains for 2025. 
              California taxes all capital gains as ordinary income (1% to 12.3% brackets). Enter total taxable income, capital gain amount, and filing status for instant CA tax calculations.
            </p>
          </div>

          <CACapitalGainsCalculator />

          {/* How It Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                Unlike the federal government, California taxes all capital gains as ordinary income using the state's progressive tax brackets. The calculator takes your total taxable income (including capital gains), applies California's 2025 tax brackets (ranging from 1% to 12.3%), and calculates your total California tax. If your taxable income exceeds $1,000,000, it also adds the 1% Mental Health Services Tax surcharge. The effective rate shows what percentage of your total income goes to California taxes.
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
                <p><strong>California Tax Calculation:</strong> Uses progressive brackets: 1% ($0-$10,756 single), 2% ($10,757-$25,499), 4% ($25,500-$40,245), 6% ($40,246-$55,866), 8% ($55,867-$70,606), 9.3% ($70,607-$360,659), 10.3% ($360,660-$432,787), 11.3% ($432,788-$721,314), 12.3% (above $721,314).</p>
                <p><strong>Mental Health Services Tax:</strong> If Taxable Income &gt; $1,000,000, add Taxable Income × 0.01</p>
                <p><strong>Effective CA Rate:</strong> Effective Rate = Total CA Tax / Total Taxable Income</p>
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
                <AccordionItem value="no-preferential-rate">
                  <AccordionTrigger className="text-left font-semibold">Why doesn't California have a lower capital gains rate?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    California is one of the few states that taxes capital gains at the same rate as ordinary income, with no preferential treatment for long-term capital gains. This means California residents pay state tax on capital gains at their regular income tax rate, which can be as high as 13.3% (12.3% top bracket + 1% Mental Health Services Tax) for the highest earners, significantly higher than the federal long-term capital gains rates of 0%, 15%, or 20%.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="federal-vs-state">
                  <AccordionTrigger className="text-left font-semibold">How does California capital gains tax compare to federal?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Federal taxes offer preferential long-term capital gains rates (0%, 15%, or 20% depending on income), while California taxes all capital gains as ordinary income at rates from 1% to 12.3% (plus 1% surcharge for income over $1M). This means California residents often pay significantly more state tax on capital gains than federal tax, especially for high-income taxpayers. You'll pay both federal and California taxes on your capital gains.
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

