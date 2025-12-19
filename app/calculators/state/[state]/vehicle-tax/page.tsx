import { notFound } from "next/navigation"
import { STATE_TAX_DATA, ALL_STATES } from "@/lib/state-tax-data"
import { hasCalculatorType, STATE_VEHICLE_TAX_KEYWORDS } from "@/lib/state-calculator-types"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StateVehicleTaxCalculator } from "@/components/calculators/state-vehicle-tax-calculator"
import { StateCalculatorNav } from "@/components/state-calculator-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  return ALL_STATES.filter((state) => 
    hasCalculatorType(state.slug, "vehicle-tax")
  ).map((state) => ({
    state: state.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params
  const stateData = STATE_TAX_DATA[stateSlug]

  if (!stateData || !hasCalculatorType(stateSlug, "vehicle-tax")) {
    return { title: "State Not Found" }
  }

  const exactKeyword = STATE_VEHICLE_TAX_KEYWORDS[stateSlug] || "vehicle tax calculator"
  const stateKeyword = `${stateData.name.toLowerCase()} ${exactKeyword}`
  const stateCodeKeyword = `${stateData.code.toLowerCase()} ${exactKeyword}`

  return {
    title: `${stateData.name} Vehicle Tax Calculator 2025-2026 | Free ${stateData.name} Tax Calculator`,
    description: `Calculate ${stateData.name} ${exactKeyword.replace(" calculator", "")} for 2025-2026. Free ${stateKeyword} to estimate vehicle tax on purchases and registrations.`,
    keywords: `${stateKeyword}, ${stateCodeKeyword}, ${stateData.name.toLowerCase()} tax calculator, ${stateData.code.toLowerCase()} tax calculator`,
    openGraph: {
      title: `${stateData.name} Vehicle Tax Calculator 2025-2026`,
      description: `Calculate ${stateData.name} vehicle tax for purchases and registrations.`,
    },
  }
}

export default async function StateVehicleTaxPage({ params }: PageProps) {
  const { state: stateSlug } = await params
  const stateData = STATE_TAX_DATA[stateSlug]

  if (!stateData || !hasCalculatorType(stateSlug, "vehicle-tax")) {
    notFound()
  }

  const exactKeyword = STATE_VEHICLE_TAX_KEYWORDS[stateSlug] || "vehicle tax calculator"

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {stateData.name} Vehicle Tax Calculator 2025-2026
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate vehicle tax for {stateData.name} vehicle purchases and registrations.
            </p>
          </div>

          <StateCalculatorNav stateSlug={stateSlug} stateName={stateData.name} currentType="vehicle-tax" />

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              {(() => {
                const stateKeyword = `${stateData.name.toLowerCase()} ${exactKeyword}`
                const stateCodeKeyword = `${stateData.code.toLowerCase()} ${exactKeyword}`
                return (
                  <>
                    Our free <strong>{stateKeyword}</strong> helps you calculate vehicle tax for purchases and registrations in {stateData.name}. 
                    This <strong>{stateCodeKeyword}</strong> estimates the vehicle tax and total price based on the vehicle value and {stateData.name} state vehicle tax rate.
                  </>
                )
              })()}
            </p>
          </div>

          <StateVehicleTaxCalculator stateSlug={stateSlug} stateData={stateData} />

          {/* How It Works, Formulas, FAQ sections */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The calculator multiplies the vehicle value by the {stateData.name} state vehicle tax rate to determine the vehicle tax amount. 
                The total price is calculated by adding the vehicle tax to the original vehicle value. 
                Vehicle tax rates and calculations may vary based on vehicle type, age, and local regulations.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Formulas Used</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <div className="space-y-3">
                <p><strong>Vehicle Tax:</strong> Vehicle Tax = Vehicle Value × State Vehicle Tax Rate</p>
                <p><strong>Total Price:</strong> Total Price = Vehicle Value + Vehicle Tax</p>
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
                <Link href={`/calculators/state/${stateSlug}/withholding`} className="text-primary hover:underline">
                  {stateData.name} Withholding Tax Calculator
                </Link>
                <Link href={`/calculators/state/${stateSlug}/sales-tax`} className="text-primary hover:underline">
                  {stateData.name} Sales Tax Calculator
                </Link>
                <Link href={`/calculators/state/${stateSlug}`} className="text-primary hover:underline">
                  {stateData.name} Tax Calculator
                </Link>
                <Link href="/calculators/federal-tax" className="text-primary hover:underline">
                  Federal Tax Calculator
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

