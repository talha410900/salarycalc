import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TexasPaycheckCalculator } from "@/components/calculators/texas-paycheck-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSchema } from "@/components/faq-schema"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Texas Paycheck Calculator (No State Tax) | Calculate Take-Home Pay",
  description: "Calculate take-home pay for Texas residents. Federal taxes only, no state income tax. Free Texas paycheck calculator for 2025-2026.",
  keywords: "texas paycheck calculator, texas tax calculator, texas no state tax, texas take home pay, texas salary calculator",
  openGraph: {
    title: "Texas Paycheck Calculator (No State Tax) | Calculate Take-Home Pay",
    description: "Calculate take-home pay for Texas residents. Federal taxes only, no state income tax.",
  },
}

export default function TexasPaycheckPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Texas Paycheck Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate take-home pay for Texas residents (Federal taxes only, no state income tax).
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our <strong>Texas paycheck tax calculator</strong> calculates net pay for Texas residents with no state income tax. 
              This free <strong>Texas paycheck calculator</strong> deducts only federal taxes using 2025-2026 brackets. Enter your gross pay and filing status for instant results.
            </p>
          </div>

          <TexasPaycheckCalculator />

          {/* How It Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                Since Texas has no state income tax, the calculator only deducts federal taxes from your gross pay. It calculates federal income tax using 2025-2026 brackets and standard deductions, Social Security tax at 6.2% on wages up to $176,100, and Medicare tax at 1.45% on all wages (plus 0.9% additional Medicare for high earners). Your net pay is your gross pay minus these federal taxes only.
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
                <p><strong>Federal Tax:</strong> Taxable Income = Gross Income - Standard Deduction ($15,750 single, $31,500 married). Tax calculated using progressive brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%).</p>
                <p><strong>Social Security:</strong> Tax = min(Annual Income, $176,100) × 6.2%</p>
                <p><strong>Medicare:</strong> Base = Annual Income × 1.45%. Additional = max(0, Annual Income - $200,000 single or $250,000 married) × 0.9%</p>
                <p><strong>State Tax:</strong> $0.00 (Texas has no state income tax)</p>
                <p><strong>Net Pay:</strong> Net Pay = Gross Pay - Federal Tax - Social Security - Medicare</p>
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
                <AccordionItem value="no-state-tax">
                  <AccordionTrigger className="text-left font-semibold">Why is there no state tax in Texas?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Texas is one of nine states with no state income tax. The state generates revenue through other means like sales tax, property tax, and business taxes. This means Texas residents only pay federal taxes (federal income tax, Social Security, and Medicare), resulting in higher take-home pay compared to states with income tax.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="other-taxes">
                  <AccordionTrigger className="text-left font-semibold">Are there other taxes I should know about?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    While Texas has no state income tax, residents still pay federal taxes, and the state has a 6.25% sales tax (plus local rates that can bring totals to 8.25% or higher). Property taxes in Texas are also relatively high compared to other states. This calculator focuses on income tax only.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* FAQ Schema */}
          <FAQSchema faqs={[
            {
              question: 'Why is there no state tax in Texas?',
              answer: 'Texas is one of nine states with no state income tax. The state generates revenue through other means like sales tax, property tax, and business taxes. This means Texas residents only pay federal taxes (federal income tax, Social Security, and Medicare), resulting in higher take-home pay compared to states with income tax.',
            },
            {
              question: 'Are there other taxes I should know about?',
              answer: 'While Texas has no state income tax, residents still pay federal taxes, and the state has a 6.25% sales tax (plus local rates that can bring totals to 8.25% or higher). Property taxes in Texas are also relatively high compared to other states. This calculator focuses on income tax only.',
            },
          ]} />

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

