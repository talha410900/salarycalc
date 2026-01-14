import { redirect } from "next/navigation"
import { STATE_TAX_DATA, ALL_STATES } from "@/lib/state-tax-data"
import { hasCalculatorType, STATE_SALES_TAX_KEYWORDS } from "@/lib/state-calculator-types"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StateSalesTaxCalculator } from "@/components/calculators/state-sales-tax-calculator"
import { StateCalculatorNav } from "@/components/state-calculator-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSchema } from "@/components/faq-schema"
import Link from "next/link"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  return ALL_STATES.filter((state) => 
    hasCalculatorType(state.slug, "sales-tax")
  ).map((state) => ({
    state: state.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params
  const stateData = STATE_TAX_DATA[stateSlug]

  if (!stateData || !hasCalculatorType(stateSlug, "sales-tax")) {
    return { title: "State Not Found" }
  }

  // Get exact keyword from mapping
  const exactKeyword = STATE_SALES_TAX_KEYWORDS[stateSlug] || "sales tax calculator"
  
  // Build exact keyword phrases for SEO
  let stateKeyword = `${stateData.name.toLowerCase()} ${exactKeyword}`
  let stateCodeKeyword = `${stateData.code.toLowerCase()} ${exactKeyword}`
  
  // Special cases for exact naming format
  if (stateSlug === "tennessee" && exactKeyword === "car sales tax calculator") {
    stateKeyword = "tn car sales tax calculator"
    stateCodeKeyword = "tn sales tax calculator auto" // Also support "tn sales tax calculator auto"
  } else if (stateSlug === "nebraska" && exactKeyword === "car sales tax calculator") {
    stateKeyword = "nebraska car sales tax calculator"
    stateCodeKeyword = "ne car sales tax calculator"
  } else if (stateSlug === "texas" && exactKeyword === "auto sales tax calculator") {
    stateKeyword = "tx auto sales tax calculator"
    stateCodeKeyword = "tx auto sales tax calculator"
  } else if (stateSlug === "maryland" && exactKeyword === "sales tax calculator") {
    stateKeyword = "md sales tax calculator"
    stateCodeKeyword = "md sales tax calculator"
  }

  // Build title using exact keyword format from user's list
  let titleKeyword = ""
  if (exactKeyword === "car sales tax calculator") {
    // Tennessee: "tn car sales tax calculator" or "tn sales tax calculator auto"
    if (stateSlug === "tennessee") {
      titleKeyword = "TN Car Sales Tax Calculator"
    }
    // Nebraska: "nebraska car sales tax calculator"
    else if (stateSlug === "nebraska") {
      titleKeyword = "Nebraska Car Sales Tax Calculator"
    } else {
      titleKeyword = `${stateData.name} Car Sales Tax Calculator`
    }
  } else if (exactKeyword === "auto sales tax calculator") {
    // Texas: "tx auto sales tax calculator"
    if (stateSlug === "texas") {
      titleKeyword = "TX Auto Sales Tax Calculator"
    } else {
      titleKeyword = `${stateData.name} Auto Sales Tax Calculator`
    }
  } else {
    // Maryland: "md sales tax calculator"
    if (stateSlug === "maryland") {
      titleKeyword = "MD Sales Tax Calculator"
    } else {
      titleKeyword = `${stateData.name} Sales Tax Calculator`
    }
  }

  // Add additional keywords for Tennessee
  let keywords = `${stateKeyword}, ${stateCodeKeyword}, ${stateData.name.toLowerCase()} tax calculator, ${stateData.code.toLowerCase()} tax calculator`
  if (stateSlug === "tennessee" && exactKeyword === "car sales tax calculator") {
    keywords += ", tn sales tax calculator auto"
  }

  return {
    title: `${titleKeyword} 2025-2026 | Free ${stateData.name} Tax Calculator`,
    description: `Calculate ${stateData.name} ${exactKeyword.replace(" calculator", "")} for 2025-2026. Free ${stateKeyword} to estimate sales tax on purchases.`,
    keywords,
    openGraph: {
      title: `${titleKeyword} 2025-2026`,
      description: `Calculate ${stateData.name} ${exactKeyword.replace(" calculator", "")} for purchases.`,
    },
  }
}

export default async function StateSalesTaxPage({ params }: PageProps) {
  const { state: stateSlug } = await params
  const stateData = STATE_TAX_DATA[stateSlug]

  if (!stateData || !hasCalculatorType(stateSlug, "sales-tax")) {
    redirect('/')
  }

  const exactKeyword = STATE_SALES_TAX_KEYWORDS[stateSlug] || "sales tax calculator"

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {exactKeyword === "car sales tax calculator" 
                ? `${stateData.name} Car Sales Tax Calculator 2025-2026`
                : exactKeyword === "auto sales tax calculator"
                ? `${stateData.name} Auto Sales Tax Calculator 2025-2026`
                : `${stateData.name} Sales Tax Calculator 2025-2026`}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate sales tax for {stateData.name} purchases.
            </p>
          </div>

          <StateCalculatorNav stateSlug={stateSlug} stateName={stateData.name} currentType="sales-tax" />

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              {(() => {
                // Build exact keyword phrases for SEO
                let stateKeyword = `${stateData.name.toLowerCase()} ${exactKeyword}`
                let stateCodeKeyword = `${stateData.code.toLowerCase()} ${exactKeyword}`
                
                // Special cases for exact naming format
                if (stateSlug === "tennessee" && exactKeyword === "car sales tax calculator") {
                  stateKeyword = "tn car sales tax calculator"
                  stateCodeKeyword = "tn sales tax calculator auto" // Also support "tn sales tax calculator auto"
                } else if (stateSlug === "nebraska" && exactKeyword === "car sales tax calculator") {
                  stateKeyword = "nebraska car sales tax calculator"
                  stateCodeKeyword = "ne car sales tax calculator"
                } else if (stateSlug === "texas" && exactKeyword === "auto sales tax calculator") {
                  stateKeyword = "tx auto sales tax calculator"
                  stateCodeKeyword = "tx auto sales tax calculator"
                } else if (stateSlug === "maryland" && exactKeyword === "sales tax calculator") {
                  stateKeyword = "md sales tax calculator"
                  stateCodeKeyword = "md sales tax calculator"
                }
                
                return (
                  <>
                    Our free <strong>{stateKeyword}</strong> helps you calculate sales tax for purchases in {stateData.name}. 
                    This <strong>{stateCodeKeyword}</strong> estimates the total sales tax and final price based on the purchase amount and {stateData.name} state sales tax rate.
                  </>
                )
              })()}
            </p>
          </div>

          <StateSalesTaxCalculator stateSlug={stateSlug} stateData={stateData} keyword={exactKeyword} />

          {/* How It Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The calculator multiplies your purchase amount by the {stateData.name} state sales tax rate to determine the sales tax amount. 
                The total price is calculated by adding the sales tax to the original purchase amount. 
                Sales tax rates may vary by city or county, so this calculator provides an estimate based on the state rate.
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
                <p><strong>Sales Tax:</strong> Sales Tax = Purchase Amount × State Sales Tax Rate</p>
                <p><strong>Total Price:</strong> Total Price = Purchase Amount + Sales Tax</p>
              </div>
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
                  question: 'What is sales tax?',
                  answer: 'Sales tax is a consumption tax imposed by state and local governments on the sale of goods and services. The rate varies by state and often includes both a state rate and local rates that vary by city or county. Sales tax is typically collected at the point of sale and remitted to the taxing authority.',
                },
                {
                  question: 'Do local rates apply?',
                  answer: 'Many states allow cities and counties to impose additional local sales tax on top of the state rate. This calculator uses the state rate as a baseline. For accurate calculations including local rates, check with your local tax authority or use location-specific calculators.',
                },
              ]} />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-sales-tax">
                  <AccordionTrigger className="text-left font-semibold">What is sales tax?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Sales tax is a consumption tax imposed by state and local governments on the sale of goods and services. 
                    The rate varies by state and often includes both a state rate and local rates that vary by city or county. 
                    Sales tax is typically collected at the point of sale and remitted to the taxing authority.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="local-rates">
                  <AccordionTrigger className="text-left font-semibold">Do local rates apply?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Many states allow cities and counties to impose additional local sales tax on top of the state rate. 
                    This calculator uses the state rate as a baseline. For accurate calculations including local rates, 
                    check with your local tax authority or use location-specific calculators.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
                <Link href={`/calculators/state/${stateSlug}/vehicle-tax`} className="text-primary hover:underline">
                  {stateData.name} Vehicle Tax Calculator
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

