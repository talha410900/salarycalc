import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IllinoisPropertyTaxCalculator } from "@/components/calculators/illinois-property-tax-calculator"
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Property Tax in Illinois Calculator 2025-2026 | Illinois Property Tax Calculator",
  description: "Calculate property tax for Illinois real estate. Free property tax in Illinois calculator to estimate annual property tax based on assessed value.",
  keywords: "property tax in illinois calculator, illinois property tax calculator, il property tax calculator, illinois real estate tax",
  openGraph: {
    title: "Property Tax in Illinois Calculator 2025-2026",
    description: "Calculate property tax for Illinois real estate based on assessed value."}}

export default function IllinoisPropertyTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Property Tax in Illinois Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate property tax for Illinois real estate based on assessed value.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>property tax in illinois calculator</strong> helps you calculate property tax for Illinois real estate. 
              This <strong>illinois property tax calculator</strong> estimates the annual property tax you'll pay, 
              with rates varying significantly by county and municipality (typically ranging from less than 1% to over 4%).
            </p>
          </div>

          <IllinoisPropertyTaxCalculator />

          <Card className="mt-12">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                Illinois property tax rates vary significantly by county and municipality. The average effective rate is approximately 2.19%, 
                but rates can range from less than 1% to over 4% depending on location. The calculator uses the average rate to provide an estimate. 
                Check with your local assessor's office for the exact rate and assessed value in your area.
              </p>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/calculators/va-property-tax-car-calculator" className="text-primary hover:underline">
                  VA Property Tax Calculator
                </Link>
                <Link href="/calculators/mortgage-tax-calculator" className="text-primary hover:underline">
                  Mortgage Tax Calculator
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
        </div>
      </main>
      <Footer />
    </div>
  )
}

