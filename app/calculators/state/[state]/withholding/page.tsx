import { notFound } from "next/navigation"
import { STATE_TAX_DATA, ALL_STATES } from "@/lib/state-tax-data"
import { hasCalculatorType, STATE_WITHHOLDING_KEYWORDS } from "@/lib/state-calculator-types"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StateWithholdingCalculator } from "@/components/calculators/state-withholding-calculator"
import { StateCalculatorNav } from "@/components/state-calculator-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HowItWorksCard } from "@/components/how-it-works-card"
import { FAQSchema } from "@/components/faq-schema"
import Link from "next/link"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  // Only generate params for states that have withholding calculator
  return ALL_STATES.filter((state) => 
    hasCalculatorType(state.slug, "withholding")
  ).map((state) => ({
    state: state.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params
  const stateData = STATE_TAX_DATA[stateSlug]

  if (!stateData || !hasCalculatorType(stateSlug, "withholding")) {
    return { title: "State Not Found" }
  }

  // Get exact keyword from mapping (e.g., "withholding tax calculator", "paycheck tax calculator", "payroll tax calculator")
  const exactKeyword = STATE_WITHHOLDING_KEYWORDS[stateSlug] || "withholding tax calculator"
  
  // Build exact keyword phrases for SEO
  let stateKeyword = `${stateData.name.toLowerCase()} ${exactKeyword}`
  let stateCodeKeyword = `${stateData.code.toLowerCase()} ${exactKeyword}`
  
  // Special cases for exact naming format
  if (stateSlug === "nevada" && exactKeyword === "paycheck tax calculator") {
    stateKeyword = "paycheck tax calculator nevada"
    stateCodeKeyword = "nv paycheck tax calculator"
  } else if (stateSlug === "minnesota" && exactKeyword === "paycheck tax calculator") {
    stateKeyword = "mn paycheck tax calculator"
    stateCodeKeyword = "mn paycheck tax calculator"
  } else if (stateSlug === "pennsylvania" && exactKeyword === "paycheck tax calculator") {
    stateKeyword = "pa paycheck tax calculator"
    stateCodeKeyword = "pa paycheck tax calculator"
  }

  // Build title using exact keyword format from user's list
  let titleKeyword = ""
  if (exactKeyword === "paycheck tax calculator") {
    // Nevada: "paycheck tax calculator nevada"
    if (stateSlug === "nevada") {
      titleKeyword = "Paycheck Tax Calculator Nevada"
    }
    // Minnesota: "mn paycheck tax calculator"
    else if (stateSlug === "minnesota") {
      titleKeyword = "MN Paycheck Tax Calculator"
    }
    // Pennsylvania: "pa paycheck tax calculator"
    else if (stateSlug === "pennsylvania") {
      titleKeyword = "PA Paycheck Tax Calculator"
    }
    // Michigan: "michigan paycheck tax calculator"
    else if (stateSlug === "michigan") {
      titleKeyword = "Michigan Paycheck Tax Calculator"
    } else {
      titleKeyword = `${stateData.name} Paycheck Tax Calculator`
    }
  } else if (exactKeyword === "payroll tax calculator") {
    titleKeyword = `${stateData.name} Payroll Tax Calculator`
  } else {
    // Maryland: "maryland withholding tax calculator"
    titleKeyword = `${stateData.name} Withholding Tax Calculator`
  }

  return {
    title: `${titleKeyword} 2025-2026 | Free ${stateData.name} Tax Calculator`,
    description: `Calculate ${stateData.name} ${exactKeyword.replace(" calculator", "")} for 2025-2026. Free ${stateKeyword} including federal, state, Social Security, and Medicare taxes.`,
    keywords: `${stateKeyword}, ${stateCodeKeyword}, ${stateData.name.toLowerCase()} tax calculator, ${stateData.code.toLowerCase()} tax calculator`,
    openGraph: {
      title: `${titleKeyword} 2025-2026`,
      description: `Calculate ${stateData.name} ${exactKeyword.replace(" calculator", "")} including federal, state, Social Security, and Medicare taxes.`,
    },
  }
}

export default async function StateWithholdingPage({ params }: PageProps) {
  const { state: stateSlug } = await params
  const stateData = STATE_TAX_DATA[stateSlug]

  if (!stateData || !hasCalculatorType(stateSlug, "withholding")) {
    notFound()
  }

  // FAQ data for schema
  const faqData = [
    {
      question: 'What is payroll withholding tax?',
      answer: 'Payroll withholding tax is the amount your employer deducts from your paycheck to cover your estimated federal and state income taxes, Social Security, and Medicare taxes. These withholdings are sent to the IRS and state tax authorities on your behalf. At tax time, you\'ll file a return to reconcile what was withheld versus what you actually owe.',
    },
    {
      question: 'How can I adjust my withholding?',
      answer: 'You can adjust your withholding by submitting a new W-4 form to your employer. The W-4 form allows you to claim allowances, specify additional withholding amounts, or request that less tax be withheld. If you consistently receive large refunds, you may want to reduce your withholding. If you owe taxes each year, you may want to increase your withholding or make estimated tax payments.',
    },
    {
      question: 'When should I review my withholding?',
      answer: 'You should review your withholding whenever you experience a major life change, such as getting married or divorced, having a child, buying a home, changing jobs, or experiencing significant changes in income. You should also review it at the beginning of each tax year to ensure your withholdings align with your expected tax liability. The IRS recommends using their Tax Withholding Estimator tool to check your withholding mid-year.',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* FAQ Schema */}
      <FAQSchema faqs={faqData} />
      
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {(() => {
                const exactKeyword = STATE_WITHHOLDING_KEYWORDS[stateSlug] || "withholding tax calculator"
                // Use exact naming format from user's list
                if (exactKeyword === "paycheck tax calculator") {
                  // Nevada: "paycheck tax calculator nevada"
                  if (stateSlug === "nevada") {
                    return `Paycheck Tax Calculator Nevada 2025-2026`
                  }
                  // Minnesota: "mn paycheck tax calculator"
                  if (stateSlug === "minnesota") {
                    return `MN Paycheck Tax Calculator 2025-2026`
                  }
                  // Pennsylvania: "pa paycheck tax calculator"
                  if (stateSlug === "pennsylvania") {
                    return `PA Paycheck Tax Calculator 2025-2026`
                  }
                  // Michigan: "michigan paycheck tax calculator"
                  if (stateSlug === "michigan") {
                    return `Michigan Paycheck Tax Calculator 2025-2026`
                  }
                  return `${stateData.name} Paycheck Tax Calculator 2025-2026`
                } else if (exactKeyword === "payroll tax calculator") {
                  // Virginia, Louisiana, Oregon, South Carolina: "state payroll tax calculator"
                  return `${stateData.name} Payroll Tax Calculator 2025-2026`
                } else {
                  // Maryland: "maryland withholding tax calculator"
                  return `${stateData.name} Withholding Tax Calculator 2025-2026`
                }
              })()}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate payroll withholding tax for {stateData.name}, including federal, state, Social Security, and Medicare taxes.
            </p>
          </div>

          {/* State Calculator Navigation */}
          <StateCalculatorNav stateSlug={stateSlug} stateName={stateData.name} currentType="withholding" />

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              {(() => {
                const exactKeyword = STATE_WITHHOLDING_KEYWORDS[stateSlug] || "withholding tax calculator"
                // Build exact keyword phrase based on state
                let stateKeyword = `${stateData.name.toLowerCase()} ${exactKeyword}`
                let stateCodeKeyword = `${stateData.code.toLowerCase()} ${exactKeyword}`
                
                // Special cases for exact naming
                if (stateSlug === "nevada" && exactKeyword === "paycheck tax calculator") {
                  stateKeyword = "paycheck tax calculator nevada"
                  stateCodeKeyword = "nv paycheck tax calculator"
                } else if (stateSlug === "minnesota" && exactKeyword === "paycheck tax calculator") {
                  stateKeyword = "mn paycheck tax calculator"
                  stateCodeKeyword = "mn paycheck tax calculator"
                } else if (stateSlug === "pennsylvania" && exactKeyword === "paycheck tax calculator") {
                  stateKeyword = "pa paycheck tax calculator"
                  stateCodeKeyword = "pa paycheck tax calculator"
                }
                
                return (
                  <>
                    Our free <strong>{stateKeyword}</strong> helps you calculate payroll withholding taxes for {stateData.name}. 
                    This <strong>{stateCodeKeyword}</strong> estimates federal income tax, {stateData.name} state tax, Social Security, and Medicare withholdings based on your gross pay, pay period, and filing status.
                  </>
                )
              })()}
            </p>
          </div>

          <StateWithholdingCalculator stateSlug={stateSlug} stateData={stateData} />

          {/* How It Works Section */}
          <HowItWorksCard
            steps={[
              {
                number: '01',
                icon: 'Calculator',
                title: 'Enter Your Details',
                description: `Input your gross pay, pay period, and filing status for ${stateData.name}.`,
              },
              {
                number: '02',
                icon: 'Calculator',
                title: 'Calculate Taxes',
                description: `We calculate federal tax, ${stateData.name} state tax, Social Security, and Medicare based on 2025-2026 rates.`,
              },
              {
                number: '03',
                icon: 'TrendingUp',
                title: 'View Results',
                description: 'Get instant breakdown of all taxes and your net take-home pay with detailed insights.',
              },
            ]}
            subtitle={`Calculate your ${stateData.name} payroll withholding taxes in three simple steps`}
          />

          {/* Formulas Used Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Formulas Used</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <div className="space-y-3">
                <p><strong>Annual Income:</strong> Annual Income = Gross Pay × Pay Period Multiplier (52 for weekly, 26 for bi-weekly, 12 for monthly)</p>
                <p><strong>Federal Tax:</strong> Taxable Income = Annual Income - Standard Deduction. Tax calculated using progressive brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%)</p>
                <p><strong>{stateData.name} State Tax:</strong> {stateData.type === "Flat" 
                  ? `State Tax = Annual Income × ${((stateData.rate || 0) * 100).toFixed(2)}%`
                  : "Calculated using progressive tax brackets based on filing status"}
                </p>
                <p><strong>Social Security:</strong> Social Security = min(Annual Income, $176,100) × 6.2%</p>
                <p><strong>Medicare:</strong> Base = Annual Income × 1.45%. Additional = max(0, Annual Income - Threshold) × 0.9%</p>
                <p><strong>Total Withholding:</strong> Total = Federal Tax + State Tax + Social Security + Medicare</p>
                <p><strong>Net Pay:</strong> Net Pay = Gross Pay - (Total Withholding / Pay Period Multiplier)</p>
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
                <AccordionItem value="what-is-withholding">
                  <AccordionTrigger className="text-left font-semibold">What is payroll withholding tax?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Payroll withholding tax is the amount your employer deducts from your paycheck to cover your estimated federal and state income taxes, Social Security, and Medicare taxes. These withholdings are sent to the IRS and state tax authorities on your behalf. At tax time, you'll file a return to reconcile what was withheld versus what you actually owe.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-to-adjust">
                  <AccordionTrigger className="text-left font-semibold">How can I adjust my withholding?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    You can adjust your withholding by submitting a new W-4 form to your employer. The W-4 form allows you to claim allowances, specify additional withholding amounts, or request that less tax be withheld. If you consistently receive large refunds, you may want to reduce your withholding. If you owe taxes each year, you may want to increase your withholding or make estimated tax payments.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="when-to-review">
                  <AccordionTrigger className="text-left font-semibold">When should I review my withholding?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    You should review your withholding whenever you experience a major life change, such as getting married or divorced, having a child, buying a home, changing jobs, or experiencing significant changes in income. You should also review it at the beginning of each tax year to ensure your withholdings align with your expected tax liability. The IRS recommends using their Tax Withholding Estimator tool to check your withholding mid-year.
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
                <Link href="/calculators/federal-tax" className="text-primary hover:underline">
                  Federal Tax Calculator
                </Link>
                <Link href="/calculators/take-home-pay" className="text-primary hover:underline">
                  Take-Home Pay Calculator
                </Link>
                <Link href="/calculators/payroll-tax" className="text-primary hover:underline">
                  Payroll Tax Calculator
                </Link>
                <Link href={`/calculators/state/${stateSlug}`} className="text-primary hover:underline">
                  {stateData.name} Tax Calculator
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
                For official tax information, visit the <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Internal Revenue Service (IRS)</a> website. 
                The IRS provides detailed information about <a href="https://www.irs.gov/forms-pubs/about-form-w-4" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">W-4 forms</a> and <a href="https://www.irs.gov/individuals/tax-withholding-estimator" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">tax withholding</a>.
              </p>
            </CardContent>
          </Card>
          
          {/* FAQ Schema is already added at the top of the component */}
        </div>
      </main>
      <Footer />
    </div>
  )
}

