import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { USImportTaxCalculator } from "@/components/calculators/us-import-tax-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "US Import Tax Calculator | Calculate Import Duties & Customs Tax",
  description: "Estimate US import duties based on product category and value. Free import tax calculator for clothing, electronics, auto parts, and more.",
  keywords: "US import tax calculator, import duty calculator, customs tax, import duties, US customs calculator",
  openGraph: {
    title: "US Import Tax Calculator | Calculate Import Duties & Customs Tax",
    description: "Estimate US import duties based on product category and value.",
  },
}

export default function USImportTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">US Import Tax Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Similar to Customs Calculator, focused on general import duties.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Use our free <strong>US import tax calculator</strong> to estimate import duties and customs taxes. 
              This <strong>import duty calculator</strong> provides estimates by category: Clothing (16%), Electronics (0%), Auto Parts (2.5%), Other (5%). Enter product value and category for instant estimates.
            </p>
          </div>

          <USImportTaxCalculator />

          {/* How It Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The calculator uses general duty rate categories to estimate import taxes. You select a product category (Clothing, Electronics, Auto Parts, or Other), and the calculator applies the typical duty rate for that category to your product value. Clothing typically has a 16% rate, Electronics often 0%, Auto Parts usually 2.5%, and Other products commonly 5%. The estimated duty is calculated by multiplying the product value by the category's duty rate percentage.
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
                <p><strong>Duty Rate by Category:</strong> Clothing = 16%, Electronics = 0%, Auto Parts = 2.5%, Other = 5%</p>
                <p><strong>Estimated Duty:</strong> Estimated Duty = Product Value × Duty Rate</p>
                <p className="text-sm italic mt-4">Note: Actual rates vary significantly based on the specific Harmonized Tariff Schedule (HTS) code, country of origin, trade agreements, and current tariff policies. This calculator provides general estimates only.</p>
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
                <AccordionItem value="hts-code">
                  <AccordionTrigger className="text-left font-semibold">What is an HTS code and why does it matter?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    The Harmonized Tariff Schedule (HTS) code is a 10-digit classification number that identifies the specific product being imported. Each product has a unique HTS code that determines its exact duty rate, which can vary significantly even within the same general category. For example, different types of clothing or electronics may have different HTS codes with different duty rates. The HTS code, combined with the country of origin, determines the precise import duty, not just the general category. This calculator uses category averages for estimates.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="accuracy">
                  <AccordionTrigger className="text-left font-semibold">How accurate are these estimates?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    These are general estimates based on typical duty rates for product categories. Actual import duties can vary significantly based on: the specific HTS code, country of origin, trade agreements (like USMCA, NAFTA), current tariff policies, product classification, and special programs. For accurate calculations, you should: identify the correct HTS code for your product, determine the country of origin, check current trade agreements, and consult with a licensed customs broker or use the official HTS database for precise duty rates.
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

