import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VAPropertyTaxCarCalculator } from "@/components/calculators/va-property-tax-car-calculator"
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VA Property Tax Car Calculator 2025-2026 | Virginia Vehicle Property Tax",
  description: "Calculate Virginia property tax on your vehicle. Free VA property tax car calculator to estimate annual vehicle property tax based on assessed value.",
  keywords: "va property tax car calculator, virginia property tax car calculator, va vehicle tax calculator, virginia car property tax",
  openGraph: {
    title: "VA Property Tax Car Calculator 2025-2026",
    description: "Calculate Virginia property tax on your vehicle based on assessed value."}}

export default function VAPropertyTaxCarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">VA Property Tax Car Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate Virginia property tax on your vehicle based on assessed value.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>va property tax car calculator</strong> helps you calculate Virginia property tax on your vehicle. 
              This <strong>virginia property tax car calculator</strong> estimates the annual property tax you'll pay on your car, 
              typically ranging from 3.5% to 5.5% of the vehicle's assessed value depending on your county or city.
            </p>
          </div>

          <VAPropertyTaxCarCalculator />

          <Card className="mt-12">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                Virginia charges property tax on vehicles annually. The rate varies by county and city, typically ranging from 3.5% to 5.5% 
                of the vehicle's assessed value. The calculator uses an average rate of 4% to provide an estimate. 
                Check with your local commissioner of revenue or treasurer's office for the exact rate in your locality.
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
                <Link href="/calculators/illinois-property-tax-calculator" className="text-primary hover:underline">
                  Illinois Property Tax Calculator
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

