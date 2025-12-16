import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LASalesTaxCalculator } from "@/components/calculators/la-sales-tax-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Louisiana Sales Tax Calculator 2025 | LA State Sales Tax",
  description: "Calculate sales tax for Louisiana with new 2025 rate. Includes state and parish/local rates. Free Louisiana sales tax calculator.",
  keywords: "louisiana sales tax calculator, LA sales tax, louisiana tax calculator, parish tax calculator",
  openGraph: {
    title: "Louisiana Sales Tax Calculator 2025 | LA State Sales Tax",
    description: "Calculate sales tax for Louisiana with new 2025 rate. Includes state and parish/local rates.",
  },
}

export default function LASalesTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Louisiana Sales Tax Calculator 2025</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculates sales tax for Louisiana (New 2025 Rate).
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>Louisiana sales tax calculator</strong> calculates sales tax using the 2025 state rate (5%) plus parish/local rates. 
              This <strong>Louisiana tax calculator</strong> combines state and local taxes (often exceeding 10% total). Enter purchase amount and parish rate for instant calculations.
            </p>
          </div>

          <LASalesTaxCalculator />

          {/* How It Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The calculator multiplies your purchase amount by Louisiana's state sales tax rate (5% for 2025) to calculate state tax. It then adds the parish (county) and local tax rates you specify, which typically range from 4% to 5% or more. The total sales tax is the sum of state and local taxes, and your final price includes the purchase amount plus all taxes. Louisiana has one of the highest combined sales tax rates in the nation.
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
                <p><strong>State Tax:</strong> State Tax = Purchase Amount × 0.05 (5%)</p>
                <p><strong>Local Tax:</strong> Local Tax = Purchase Amount × (Parish Rate / 100)</p>
                <p><strong>Total Tax:</strong> Total Tax = State Tax + Local Tax</p>
                <p><strong>Total Price:</strong> Total Price = Purchase Amount + Total Tax</p>
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
                <AccordionItem value="parish-rates">
                  <AccordionTrigger className="text-left font-semibold">How do I find my parish tax rate?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Parish (county) and local sales tax rates in Louisiana vary by location and can change. Common rates range from 4% to 5% or more. You can find your specific rate by checking the Louisiana Department of Revenue website, contacting your local tax authority, or checking receipts from local businesses. Some parishes have multiple local tax districts with different rates, so the exact rate may depend on the specific location within the parish.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="high-rates">
                  <AccordionTrigger className="text-left font-semibold">Why are Louisiana sales tax rates so high?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Louisiana has a relatively low state rate (5%), but parishes and local jurisdictions add significant additional rates, often 4-5% or more. This results in combined rates frequently exceeding 10%, making Louisiana one of the highest sales tax states in the nation. These local taxes fund parish and municipal services, infrastructure, and special projects. The state's reliance on sales tax (rather than income tax) contributes to these higher rates.
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

