import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AMTCalculator } from "@/components/calculators/amt-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSchema } from "@/components/faq-schema"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alternative Minimum Tax (AMT) Calculator 2025-2026 | Calculate AMT Owed",
  description: "Determine if you owe Alternative Minimum Tax based on 2025-2026 exemption amounts and rates. Free AMT calculator.",
  keywords: "AMT calculator, alternative minimum tax, AMT 2025-2026, minimum tax calculator, tax preference items",
  openGraph: {
    title: "Alternative Minimum Tax (AMT) Calculator 2025-2026 | Calculate AMT Owed",
    description: "Determine if you owe Alternative Minimum Tax based on 2025-2026 exemption amounts and rates.",
  },
}

export default function AMTPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Alternative Minimum Tax (AMT) Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Determines if you owe AMT based on 2025-2026 exemption amounts and rates.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Use our free <strong>alternative minimum tax calculator</strong> to determine if you owe AMT for 2025-2026. 
              This <strong>AMT calculator</strong> calculates AMTI, applies 2025-2026 exemptions ($88,100 single, $137,000 married), and computes tentative minimum tax. Enter taxable income and filing status for results.
            </p>
          </div>

          <AMTCalculator />

          {/* How It Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The calculator first calculates your Alternative Minimum Taxable Income (AMTI) by adding tax preference items to your regular taxable income. It then applies the 2025-2026 AMT exemption ($88,100 single, $137,000 married) with phaseout reductions for high earners. The AMT base is calculated by subtracting the exemption from AMTI. Finally, it computes the tentative minimum tax using AMT rates: 26% on the first $239,100 and 28% on amounts above that threshold. You only pay AMT if this tentative minimum tax exceeds your regular tax liability.
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
                <p><strong>AMTI:</strong> AMTI = Regular Taxable Income + Tax Preference Items</p>
                <p><strong>Exemption Phaseout:</strong> Excess = max(0, AMTI - Phaseout Threshold). Reduction = Excess × 0.25. Exemption = Base Exemption - Reduction (minimum $0)</p>
                <p><strong>AMT Base:</strong> AMT Base = AMTI - Exemption</p>
                <p><strong>Tentative AMT:</strong> Tentative AMT = (min(AMT Base, $239,100) × 0.26) + (max(0, AMT Base - $239,100) × 0.28)</p>
                <p><strong>AMT Owed:</strong> AMT = max(0, Tentative AMT - Regular Tax)</p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <FAQSchema faqs={[
                {
                  question: 'What are tax preference items?',
                  answer: 'Tax preference items are certain deductions and income items that must be added back to calculate AMTI. Common examples include: incentive stock option (ISO) exercise spread (difference between exercise price and fair market value), tax-exempt interest from private activity bonds, accelerated depreciation deductions, certain itemized deductions, and other AMT adjustments. These items reduce regular tax but are added back for AMT calculations.',
                },
                {
                  question: 'Who typically pays AMT?',
                  answer: 'AMT typically affects high-income taxpayers with significant deductions, tax preference items, or large capital gains. Taxpayers with income over $200,000-$500,000 are more likely to be subject to AMT, especially those with large state and local tax deductions, incentive stock options, or tax-exempt interest. The exemption phaseout begins at $626,350 (single) and $1,252,700 (married) for 2025-2026.',
                },
              ]} />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="preference-items">
                  <AccordionTrigger className="text-left font-semibold">What are tax preference items?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Tax preference items are certain deductions and income items that must be added back to calculate AMTI. Common examples include: incentive stock option (ISO) exercise spread (difference between exercise price and fair market value), tax-exempt interest from private activity bonds, accelerated depreciation deductions, certain itemized deductions, and other AMT adjustments. These items reduce regular tax but are added back for AMT calculations.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="who-pays">
                  <AccordionTrigger className="text-left font-semibold">Who typically pays AMT?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    AMT typically affects high-income taxpayers with significant deductions, tax preference items, or large capital gains. Taxpayers with income over $200,000-$500,000 are more likely to be subject to AMT, especially those with large state and local tax deductions, incentive stock options, or tax-exempt interest. The exemption phaseout begins at $626,350 (single) and $1,252,700 (married) for 2025-2026.
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

