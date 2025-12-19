import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MNSalesTaxCalculator } from "@/components/calculators/mn-sales-tax-calculator"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSchema } from "@/components/faq-schema"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Minnesota Sales Tax Calculator 2025-2026 | MN State Sales Tax",
  description: "Calculate total sales tax for Minnesota including state and local rates. Free Minnesota sales tax calculator for 2025-2026.",
  keywords: "minnesota sales tax calculator, MN sales tax, minneapolis sales tax, st paul sales tax, minnesota tax calculator",
  openGraph: {
    title: "Minnesota Sales Tax Calculator 2025-2026 | MN State Sales Tax",
    description: "Calculate total sales tax for Minnesota including state and local rates.",
  },
}

export default function MNSalesTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Minnesota Sales Tax Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculates total sales tax for Minnesota (State + Local).
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Use our free <strong>Minnesota state sales tax calculator</strong> to calculate total sales tax including state (6.875%) and local rates for 2025-2026. 
              This <strong>Minnesota sales tax calculator</strong> calculates combined taxes (Minneapolis +2.155%, St. Paul +2.0%). Enter purchase amount and location for instant results.
            </p>
          </div>

          <MNSalesTaxCalculator />

          {/* How It Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The calculator multiplies your purchase amount by Minnesota's state sales tax rate (6.875% for 2025-2026) to get the state tax. It then adds any applicable local sales tax based on your location (Minneapolis adds 2.155%, St. Paul adds 2.0%, other areas may have different rates). The total sales tax is the sum of state and local taxes, and your final price is the purchase amount plus total tax.
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
                <p><strong>State Tax:</strong> State Tax = Purchase Amount × 0.06875 (6.875%)</p>
                <p><strong>Local Tax:</strong> Local Tax = Purchase Amount × Local Rate (0% general, 0.02155 Minneapolis, 0.02 St. Paul)</p>
                <p><strong>Total Tax:</strong> Total Tax = State Tax + Local Tax</p>
                <p><strong>Total Price:</strong> Total Price = Purchase Amount + Total Tax</p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/calculators/la-sales-tax-calculator" className="text-primary hover:underline">
                  Louisiana Sales Tax Calculator
                </Link>
                <Link href="/calculators/federal-tax-calculator" className="text-primary hover:underline">
                  Federal Tax Calculator
                </Link>
                <Link href="/calculators/tax-return-calculator" className="text-primary hover:underline">
                  Tax Return Calculator
                </Link>
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
                  question: 'Why do local rates vary?',
                  answer: 'Minnesota allows cities, counties, and special taxing districts to add local sales tax on top of the state rate. These local taxes fund local projects, infrastructure, and services. Minneapolis has a 2.155% local rate, St. Paul has 2.0%, and other cities and counties may have different rates ranging from 0% to over 2%. The total combined rate can vary significantly by location within Minnesota.',
                },
                {
                  question: 'What items are exempt from sales tax in Minnesota?',
                  answer: 'Common exemptions include: most food items (groceries), prescription drugs, clothing (though some items may be taxable), medical devices, and certain services. However, prepared food, restaurant meals, and some clothing items may be subject to sales tax. The calculator assumes all items are taxable; for exempt items, the tax would be $0.',
                },
              ]} />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="local-rates">
                  <AccordionTrigger className="text-left font-semibold">Why do local rates vary?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Minnesota allows cities, counties, and special taxing districts to add local sales tax on top of the state rate. These local taxes fund local projects, infrastructure, and services. Minneapolis has a 2.155% local rate, St. Paul has 2.0%, and other cities and counties may have different rates ranging from 0% to over 2%. The total combined rate can vary significantly by location within Minnesota.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="exemptions">
                  <AccordionTrigger className="text-left font-semibold">What items are exempt from sales tax in Minnesota?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Common exemptions include: most food items (groceries), prescription drugs, clothing (though some items may be taxable), medical devices, and certain services. However, prepared food, restaurant meals, and some clothing items may be subject to sales tax. The calculator assumes all items are taxable; for exempt items, the tax would be $0.
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

