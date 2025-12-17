import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RentalPropertyCapitalGainsCalculator } from "@/components/calculators/rental-property-capital-gains-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Capital Gains Tax Calculator on Rental Property 2025-2026 | Rental Property Sale Tax",
  description: "Calculate capital gains tax on the sale of rental property, including depreciation recapture. Free rental property capital gains tax calculator.",
  keywords: "capital gains tax calculator on rental property, rental property capital gains calculator, rental property sale tax calculator, depreciation recapture calculator",
  openGraph: {
    title: "Capital Gains Tax Calculator on Rental Property 2025-2026",
    description: "Calculate capital gains tax on the sale of rental property, including depreciation recapture.",
  },
}

export default function RentalPropertyCapitalGainsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Capital Gains Tax Calculator on Rental Property 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate capital gains tax on the sale of rental property, including depreciation recapture.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>capital gains tax calculator on rental property</strong> helps you calculate taxes on the sale of rental property. 
              This <strong>rental property capital gains calculator</strong> estimates capital gains tax, depreciation recapture (taxed at 25%), 
              and the 3.8% Net Investment Income Tax (NIIT) for high-income taxpayers.
            </p>
          </div>

          <RentalPropertyCapitalGainsCalculator />

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                Rental property sales are subject to capital gains tax and depreciation recapture. Depreciation taken over the years 
                must be "recaptured" and taxed at 25% (unrecaptured section 1250 gain). The remaining gain is taxed at long-term 
                capital gains rates (0%, 15%, or 20%). High-income taxpayers may also owe the 3.8% Net Investment Income Tax (NIIT). 
                Consider a 1031 exchange to defer taxes.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

