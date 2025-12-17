import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MaineExciseTaxCalculator } from "@/components/calculators/maine-excise-tax-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "State of Maine Excise Tax Calculator 2025-2026 | Free Maine Vehicle Tax Calculator",
  description: "Calculate Maine excise tax for vehicle registrations. Free state of Maine excise tax calculator based on MSRP and vehicle age.",
  keywords: "state of maine excise tax calculator, maine excise tax calculator, maine vehicle tax calculator, me excise tax calculator",
  openGraph: {
    title: "State of Maine Excise Tax Calculator 2025-2026",
    description: "Calculate Maine excise tax for vehicle registrations based on MSRP and vehicle age.",
  },
}

export default function MaineExciseTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              State of Maine Excise Tax Calculator 2025-2026
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate excise tax for vehicle registrations in Maine based on MSRP and vehicle age.
            </p>
          </div>

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>state of maine excise tax calculator</strong> helps you calculate excise tax for vehicle registrations in Maine. 
              This <strong>maine excise tax calculator</strong> estimates excise tax based on the vehicle's MSRP (manufacturer's suggested retail price) and age, 
              with rates decreasing as the vehicle gets older.
            </p>
          </div>

          <MaineExciseTaxCalculator />

          {/* How It Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                Maine excise tax is calculated based on the vehicle's MSRP and age. The tax rate decreases each year: 
                First year vehicles are taxed at 2.4% of MSRP, second year at 1.75%, third year at 1.3%, 
                fourth year at 1.0%, fifth year at 0.65%, and vehicles six years or older at 0.4%. 
                The calculator multiplies the MSRP by the appropriate rate based on the vehicle's age to determine the excise tax amount.
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
                <p><strong>Excise Tax:</strong> Excise Tax = MSRP × Rate (based on vehicle age)</p>
                <p><strong>Rates by Age:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>First Year: 2.4%</li>
                  <li>Second Year: 1.75%</li>
                  <li>Third Year: 1.3%</li>
                  <li>Fourth Year: 1.0%</li>
                  <li>Fifth Year: 0.65%</li>
                  <li>Sixth Year+: 0.4%</li>
                </ul>
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
                <AccordionItem value="what-is-excise-tax">
                  <AccordionTrigger className="text-left font-semibold">What is excise tax?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Excise tax is a tax on specific goods, in this case, vehicles. In Maine, excise tax is assessed annually 
                    on vehicle registrations and is based on the vehicle's MSRP and age. The tax rate decreases as the vehicle gets older, 
                    making it more affordable to register older vehicles.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="when-due">
                  <AccordionTrigger className="text-left font-semibold">When is excise tax due?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Excise tax in Maine is typically due annually when you register or renew your vehicle registration. 
                    The tax is assessed by your local municipality and must be paid before you can complete your vehicle registration. 
                    Contact your local tax assessor's office for specific due dates and payment methods.
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

