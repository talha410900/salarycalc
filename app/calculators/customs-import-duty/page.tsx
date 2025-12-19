import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CustomsImportDutyCalculator } from "@/components/calculators/customs-import-duty-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSchema } from "@/components/faq-schema"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customs and Import Duty Calculator | US Import Tax Calculator 2025-2026",
  description: "Estimate US import duties based on product value and duty rate. Calculate total landed cost including MPF fees. Free customs tax calculator.",
  keywords: "customs tax calculator, import duty calculator, US import tax, customs duty, MPF fee, landed cost calculator",
  openGraph: {
    title: "Customs and Import Duty Calculator | US Import Tax Calculator 2025-2026",
    description: "Estimate US import duties based on product value and duty rate. Calculate total landed cost including MPF fees.",
  },
}

export default function CustomsImportDutyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Customs and Import Duty Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estimates US import duties based on product value and duty rate. Note: 2025-2026 tariffs may apply.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Use our free <strong>customs tax calculator</strong> to estimate US import duties and calculate total landed cost. 
              This <strong>import duty calculator</strong> calculates customs duties based on product value, duty rate, and MPF fees. Enter product value and duty rate for instant estimates.
            </p>
          </div>

          <CustomsImportDutyCalculator />

          {/* How It Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The calculator multiplies your product value by the duty rate percentage to calculate the base import duty. For formal entries (products valued over $2,500), it adds the Merchandise Processing Fee (MPF) calculated at 0.3464% of the product value, with a minimum of $31.67 and maximum of $614.35. For informal entries (under $2,500), a simplified $5 fee is applied. Shipping and insurance costs are added to get the total landed cost.
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
                <p><strong>Import Duty:</strong> Duty = Product Value × (Duty Rate / 100)</p>
                <p><strong>MPF (Formal Entries ≥$2,500):</strong> MPF = max($31.67, min(Product Value × 0.003464, $614.35))</p>
                <p><strong>MPF (Informal Entries &lt;$2,500):</strong> MPF = $5</p>
                <p><strong>Total Duty and Fees:</strong> Total = Duty + MPF</p>
                <p><strong>Total Landed Cost:</strong> Landed Cost = Product Value + Total Duty + Shipping and Insurance</p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Related Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/calculators/us-import-tax" className="text-primary hover:underline">
                  US Import Tax Calculator
                </Link>
                <Link href="/calculators/federal-tax" className="text-primary hover:underline">
                  Federal Tax Calculator
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* External Resources */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                For official import duty information, visit <a href="https://www.cbp.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">U.S. Customs and Border Protection (CBP)</a> and the <a href="https://hts.usitc.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Harmonized Tariff Schedule (HTS)</a> database. 
                The IRS provides information about <a href="https://www.irs.gov/businesses/small-businesses-self-employed/import-taxes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">import taxes</a>.
              </p>
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
                  question: 'How do I find the correct duty rate?',
                  answer: 'Duty rates vary by product classification (HTS code), country of origin, and trade agreements. Common rates: Electronics often 0%, General merchandise 2.5%, Clothing typically 16%, and specific tariff lists may have rates of 10-25% or higher. Use the Harmonized Tariff Schedule (HTS) database or consult a customs broker for the exact rate for your specific product.',
                },
                {
                  question: 'Are these calculations exact?',
                  answer: 'These are estimates based on general duty rates. Actual import duties depend on the specific HTS code, country of origin, trade agreements (like USMCA), current tariffs, and customs classification. For precise calculations, consult with a licensed customs broker or use the official HTS database.',
                },
              ]} />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="duty-rates">
                  <AccordionTrigger className="text-left font-semibold">How do I find the correct duty rate?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Duty rates vary by product classification (HTS code), country of origin, and trade agreements. Common rates: Electronics often 0%, General merchandise 2.5%, Clothing typically 16%, and specific tariff lists may have rates of 10-25% or higher. Use the Harmonized Tariff Schedule (HTS) database or consult a customs broker for the exact rate for your specific product.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="accuracy">
                  <AccordionTrigger className="text-left font-semibold">Are these calculations exact?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    These are estimates based on general duty rates. Actual import duties depend on the specific HTS code, country of origin, trade agreements (like USMCA), current tariffs, and customs classification. For precise calculations, consult with a licensed customs broker or use the official HTS database.
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

