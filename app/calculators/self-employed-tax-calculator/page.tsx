import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SelfEmployedTaxCalculator } from "@/components/calculators/self-employed-tax-calculator"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSchema } from "@/components/faq-schema"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Self-Employed Tax Calculator 2025-2026 | Calculate SE Tax for Freelancers",
  description: "Calculate the 15.3% self-employment tax (Social Security + Medicare) for freelancers and self-employed individuals. Free SE tax calculator.",
  keywords: "self employed tax calculator, SE tax calculator, freelancer tax, self employment tax 2025-2026, 1099 tax calculator",
  openGraph: {
    title: "Self-Employed Tax Calculator 2025-2026 | Calculate SE Tax for Freelancers",
    description: "Calculate the 15.3% self-employment tax (Social Security + Medicare) for freelancers and self-employed individuals.",
  },
}

export default function SelfEmployedTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Self-Employed Tax Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculates the 15.3% SE tax (Social Security + Medicare) for freelancers and self-employed individuals.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>tax calculator self employed</strong> helps freelancers and self-employed individuals calculate SE tax for 2025-2026. 
              This <strong>self employed tax calculator</strong> calculates 15.3% SE tax (12.4% Social Security, 2.9% Medicare) on 92.35% of net profit. Enter net business profit for instant SE tax calculations.
            </p>
          </div>

          <SelfEmployedTaxCalculator />

          {/* How It Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The calculator first applies the 92.35% multiplier to your net business profit to get taxable earnings (this accounts for the employer portion of FICA taxes that self-employed individuals must pay). It then calculates Social Security tax at 12.4% on the first $176,100 of taxable earnings, and Medicare tax at 2.9% on all taxable earnings. The total self-employment tax is the sum of these two. You can deduct 50% of your SE tax from your adjusted gross income when calculating federal income tax.
              </p>
            </CardContent>
          </Card>

          {/* Formulas Used Section */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Formulas Used</h2>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <div className="space-y-3">
                <p><strong>Taxable Earnings:</strong> Taxable Earnings = Net Profit × 0.9235</p>
                <p><strong>Social Security Tax:</strong> Social Security = min(Taxable Earnings, $176,100) × 0.124</p>
                <p><strong>Medicare Tax:</strong> Medicare = Taxable Earnings × 0.029</p>
                <p><strong>Total SE Tax:</strong> Total SE Tax = Social Security + Medicare</p>
                <p><strong>Deduction Amount:</strong> Deduction = Total SE Tax × 0.50</p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            </CardHeader>
            <CardContent>
              <FAQSchema faqs={[
                {
                  question: 'Why is only 92.35% of net profit taxed?',
                  answer: 'The 92.35% multiplier accounts for the fact that employees only pay half of FICA taxes (7.65%), while employers pay the other half. Since self-employed individuals must pay both halves (15.3% total), the IRS allows them to calculate SE tax on 92.35% of net profit, which effectively reduces the tax base to account for the employer portion. This prevents double taxation and makes the self-employment tax equivalent to what employees and employers pay combined.',
                },
                {
                  question: 'Do I need to make quarterly tax payments?',
                  answer: 'Yes, if you expect to owe $1,000 or more in taxes for the year (including SE tax and income tax), you generally need to make quarterly estimated tax payments. These payments are due on April 15, June 15, September 15, and January 15 of the following year. Failure to make estimated payments or underpayment can result in penalties. Use this calculator to estimate your SE tax, then divide by 4 to determine your quarterly payment amount.',
                },
              ]} />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="why-92-35">
                  <AccordionTrigger className="text-left font-semibold">Why is only 92.35% of net profit taxed?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    The 92.35% multiplier accounts for the fact that employees only pay half of FICA taxes (7.65%), while employers pay the other half. Since self-employed individuals must pay both halves (15.3% total), the IRS allows them to calculate SE tax on 92.35% of net profit, which effectively reduces the tax base to account for the employer portion. This prevents double taxation and makes the self-employment tax equivalent to what employees and employers pay combined.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="quarterly-payments">
                  <AccordionTrigger className="text-left font-semibold">Do I need to make quarterly tax payments?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Yes, if you expect to owe $1,000 or more in taxes for the year (including SE tax and income tax), you generally need to make quarterly estimated tax payments. These payments are due on April 15, June 15, September 15, and January 15 of the following year. Failure to make estimated payments or underpayment can result in penalties. Use this calculator to estimate your SE tax, then divide by 4 to determine your quarterly payment amount.
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

