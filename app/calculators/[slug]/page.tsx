import { notFound } from "next/navigation"
import { STATE_TAX_DATA, ALL_STATES } from "@/lib/state-tax-data"
import { StateCalculator } from "@/components/calculators/state-calculator"
import { StateCalculatorNav } from "@/components/state-calculator-nav"
import { StateWithholdingCalculator } from "@/components/calculators/state-withholding-calculator"
import { StateSalesTaxCalculator } from "@/components/calculators/state-sales-tax-calculator"
import { StateVehicleTaxCalculator } from "@/components/calculators/state-vehicle-tax-calculator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSchema } from "@/components/faq-schema"
import Link from "next/link"
import type { Metadata } from "next"
import {
  getStateTaxCalculatorSlug,
  getStateWithholdingCalculatorSlug,
  getStateSalesTaxCalculatorSlug,
  getStateVehicleTaxCalculatorSlug,
  getMaineExciseTaxCalculatorSlug,
} from "@/lib/seo-slugs"
import { STATE_CALCULATOR_CONFIG, STATE_WITHHOLDING_KEYWORDS, STATE_SALES_TAX_KEYWORDS } from "@/lib/state-calculator-types"

interface PageProps {
  params: Promise<{ slug: string }>
}

/**
 * Parse optimized slug to determine state and calculator type
 */
function parseOptimizedSlug(slug: string): {
  stateSlug: string | null
  type: "income-tax" | "withholding" | "sales-tax" | "vehicle-tax" | "excise-tax" | null
} {
  // Check for Maine excise tax first (special case)
  if (slug === getMaineExciseTaxCalculatorSlug()) {
    return { stateSlug: "maine", type: "excise-tax" }
  }

  // Try to match state tax calculator pattern: {state}-tax-calculator
  for (const state of ALL_STATES) {
    if (slug === getStateTaxCalculatorSlug(state.slug)) {
      return { stateSlug: state.slug, type: "income-tax" }
    }
    
    // Check withholding calculators
    if (slug === getStateWithholdingCalculatorSlug(state.slug)) {
      return { stateSlug: state.slug, type: "withholding" }
    }
    
    // Check sales tax calculators
    if (slug === getStateSalesTaxCalculatorSlug(state.slug)) {
      return { stateSlug: state.slug, type: "sales-tax" }
    }
    
    // Check vehicle tax calculators
    if (slug === getStateVehicleTaxCalculatorSlug(state.slug)) {
      return { stateSlug: state.slug, type: "vehicle-tax" }
    }
  }

  return { stateSlug: null, type: null }
}

export async function generateStaticParams() {
  const params: Array<{ slug: string }> = []
  
  // Generate all state tax calculator slugs
  ALL_STATES.forEach(state => {
    params.push({ slug: getStateTaxCalculatorSlug(state.slug) })
    
    // Add other calculator types if available
    const config = STATE_CALCULATOR_CONFIG[state.slug]
    if (config) {
      config.availableCalculators.forEach(calcType => {
        if (calcType === "withholding") {
          params.push({ slug: getStateWithholdingCalculatorSlug(state.slug) })
        } else if (calcType === "sales-tax") {
          params.push({ slug: getStateSalesTaxCalculatorSlug(state.slug) })
        } else if (calcType === "vehicle-tax") {
          params.push({ slug: getStateVehicleTaxCalculatorSlug(state.slug) })
        }
      })
    }
  })
  
  // Add Maine excise tax
  params.push({ slug: getMaineExciseTaxCalculatorSlug() })
  
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { stateSlug, type } = parseOptimizedSlug(slug)

  if (!stateSlug || !type) {
    return { title: "Calculator Not Found" }
  }

  const stateData = STATE_TAX_DATA[stateSlug]
  if (!stateData) {
    return { title: "State Not Found" }
  }

  // Generate metadata based on calculator type
  if (type === "income-tax") {
    return {
      title: `${stateData.name} Tax Calculator 2025-2026 | Free ${stateData.name} Tax Calculator`,
      description: `Calculate your ${stateData.name} state income tax for 2025-2026. Free ${stateData.name.toLowerCase()} tax calculator with federal and state tax estimates.`,
      keywords: `${stateData.name.toLowerCase()} tax calculator, ${stateData.name.toLowerCase()} state tax calculator, ${stateData.code.toLowerCase()} tax calculator`,
    }
  }

  if (type === "withholding") {
    const keyword = STATE_WITHHOLDING_KEYWORDS[stateSlug] || "withholding tax calculator"
    return {
      title: `${stateData.name} ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} 2025-2026 | TaxSal`,
      description: `Calculate ${stateData.name} ${keyword} for 2025-2026. Free ${stateData.name.toLowerCase()} ${keyword} calculator.`,
      keywords: `${stateData.name.toLowerCase()} ${keyword}, ${stateData.code.toLowerCase()} ${keyword}`,
    }
  }

  if (type === "sales-tax") {
    const keyword = STATE_SALES_TAX_KEYWORDS[stateSlug] || "sales tax calculator"
    return {
      title: `${stateData.name} ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} 2025-2026 | TaxSal`,
      description: `Calculate ${stateData.name} ${keyword} for 2025-2026. Free ${stateData.name.toLowerCase()} ${keyword} calculator.`,
      keywords: `${stateData.name.toLowerCase()} ${keyword}, ${stateData.code.toLowerCase()} ${keyword}`,
    }
  }

  if (type === "vehicle-tax") {
    return {
      title: `${stateData.name} Vehicle Tax Calculator 2025-2026 | TaxSal`,
      description: `Calculate ${stateData.name} vehicle tax for 2025-2026. Free ${stateData.name.toLowerCase()} vehicle tax calculator.`,
      keywords: `${stateData.name.toLowerCase()} vehicle tax calculator, ${stateData.code.toLowerCase()} vehicle tax`,
    }
  }

  if (type === "excise-tax") {
    return {
      title: "Maine Excise Tax Calculator 2025-2026 | State of Maine Excise Tax | TaxSal",
      description: "Calculate Maine excise tax for vehicle registration. Free State of Maine excise tax calculator for 2025-2026.",
      keywords: "maine excise tax calculator, state of maine excise tax calculator, maine vehicle excise tax",
    }
  }

  return { title: "Calculator Not Found" }
}

export default async function OptimizedCalculatorPage({ params }: PageProps) {
  const { slug } = await params
  const { stateSlug, type } = parseOptimizedSlug(slug)

  if (!stateSlug || !type) {
    notFound()
  }

  const stateData = STATE_TAX_DATA[stateSlug]
  if (!stateData) {
    notFound()
  }

  // Render appropriate calculator based on type
  if (type === "income-tax") {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8 pb-0">
          <StateCalculatorNav stateSlug={stateSlug} stateName={stateData.name} currentType="income-tax" />
        </div>
        <StateCalculator stateSlug={stateSlug} stateData={stateData} />
        <Footer />
      </>
    )
  }

  if (type === "withholding") {
    const exactKeyword = STATE_WITHHOLDING_KEYWORDS[stateSlug] || "withholding tax calculator"
    
    // Build exact keyword phrases for SEO
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
        <FAQSchema faqs={faqData} />
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {(() => {
                  if (exactKeyword === "paycheck tax calculator") {
                    if (stateSlug === "nevada") {
                      return `Paycheck Tax Calculator Nevada 2025-2026`
                    }
                    if (stateSlug === "minnesota") {
                      return `MN Paycheck Tax Calculator 2025-2026`
                    }
                    if (stateSlug === "pennsylvania") {
                      return `PA Paycheck Tax Calculator 2025-2026`
                    }
                    if (stateSlug === "michigan") {
                      return `Michigan Paycheck Tax Calculator 2025-2026`
                    }
                    return `${stateData.name} Paycheck Tax Calculator 2025-2026`
                  } else if (exactKeyword === "payroll tax calculator") {
                    return `${stateData.name} Payroll Tax Calculator 2025-2026`
                  } else {
                    return `${stateData.name} Withholding Tax Calculator 2025-2026`
                  }
                })()}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Calculate payroll withholding tax for {stateData.name}, including federal, state, Social Security, and Medicare taxes.
              </p>
            </div>

            <StateCalculatorNav stateSlug={stateSlug} stateName={stateData.name} currentType="withholding" />

            {/* SEO-focused first paragraph */}
            <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
              <p className="text-base leading-relaxed">
                Our free <strong>{stateKeyword}</strong> helps you calculate payroll withholding taxes for {stateData.name}. 
                This <strong>{stateCodeKeyword}</strong> estimates federal income tax, {stateData.name} state tax, Social Security, and Medicare withholdings based on your gross pay, pay period, and filing status.
              </p>
            </div>

            <StateWithholdingCalculator stateSlug={stateSlug} stateData={stateData} />

            {/* How It Works Section */}
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed">
                  {stateData.type === "Flat" 
                    ? `The calculator uses ${stateData.name}'s flat tax rate of ${((stateData.rate || 0) * 100).toFixed(2)}% to calculate state income tax on your annual income. `
                    : `The calculator uses ${stateData.name}'s progressive tax brackets to calculate state income tax. Your income is taxed at increasing rates as it passes through each bracket - only the income within each bracket is taxed at that bracket's rate. `}
                  Federal income tax is calculated separately using 2025-2026 federal brackets and standard deductions ($15,750 single, $31,500 married filing jointly). Social Security tax is calculated at 6.2% on wages up to $176,100, and Medicare tax is 1.45% on all wages, plus an additional 0.9% for high earners (income over $200,000 single or $250,000 married). Your gross pay is first converted to annual income based on your pay period (weekly × 52, bi-weekly × 26, monthly × 12). All taxes are then calculated on the annual amount and converted back to your pay period. Your net take-home pay is your gross pay minus all these taxes combined.
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
                  <Link href="/calculators/federal-tax-calculator" className="text-primary hover:underline">
                    Federal Tax Calculator
                  </Link>
                  <Link href="/calculators/take-home-pay-calculator" className="text-primary hover:underline">
                    Take-Home Pay Calculator
                  </Link>
                  <Link href="/calculators/payroll-tax-calculator" className="text-primary hover:underline">
                    Payroll Tax Calculator
                  </Link>
                  <Link href={`/calculators/${getStateTaxCalculatorSlug(stateSlug)}`} className="text-primary hover:underline">
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
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (type === "sales-tax") {
    const exactKeyword = STATE_SALES_TAX_KEYWORDS[stateSlug] || "sales tax calculator"
    
    // Build exact keyword phrases for SEO
    let stateKeyword = `${stateData.name.toLowerCase()} ${exactKeyword}`
    let stateCodeKeyword = `${stateData.code.toLowerCase()} ${exactKeyword}`
    
    // Special cases for exact naming format
    if (stateSlug === "tennessee" && exactKeyword === "car sales tax calculator") {
      stateKeyword = "tn car sales tax calculator"
      stateCodeKeyword = "tn sales tax calculator auto"
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

    // FAQ data for schema
    const faqData = [
      {
        question: 'What is sales tax?',
        answer: 'Sales tax is a consumption tax imposed by state and local governments on the sale of goods and services. The rate varies by state and often includes both a state rate and local rates that vary by city or county. Sales tax is typically collected at the point of sale and remitted to the taxing authority.',
      },
      {
        question: 'Do local rates apply?',
        answer: 'Many states allow cities and counties to impose additional local sales tax on top of the state rate. This calculator uses the state rate as a baseline. For accurate calculations including local rates, check with your local tax authority or use location-specific calculators.',
      },
    ]

    return (
      <div className="min-h-screen flex flex-col">
        <FAQSchema faqs={faqData} />
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
                Our free <strong>{stateKeyword}</strong> helps you calculate sales tax for purchases in {stateData.name}. 
                This <strong>{stateCodeKeyword}</strong> estimates the total sales tax and final price based on the purchase amount and {stateData.name} state sales tax rate.
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
                  The calculator multiplies your purchase amount by the {stateData.name} state sales tax rate to determine the sales tax amount. The total price is calculated by adding the sales tax to the original purchase amount. Sales tax rates may vary by city or county, so this calculator provides an estimate based on the state rate. Some states allow local jurisdictions to impose additional sales tax on top of the state rate, which can result in a higher total tax than shown here. For the most accurate calculation including local rates, check with your local tax authority or use location-specific calculators.
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
                  <Link href={`/calculators/${getStateWithholdingCalculatorSlug(stateSlug)}`} className="text-primary hover:underline">
                    {stateData.name} Withholding Tax Calculator
                  </Link>
                  <Link href={`/calculators/${getStateVehicleTaxCalculatorSlug(stateSlug)}`} className="text-primary hover:underline">
                    {stateData.name} Vehicle Tax Calculator
                  </Link>
                  <Link href={`/calculators/${getStateTaxCalculatorSlug(stateSlug)}`} className="text-primary hover:underline">
                    {stateData.name} Tax Calculator
                  </Link>
                  <Link href="/calculators/federal-tax-calculator" className="text-primary hover:underline">
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

  if (type === "vehicle-tax") {
    // FAQ data for schema
    const faqData = [
      {
        question: 'What is vehicle tax?',
        answer: 'Vehicle tax is a tax imposed by some states on vehicle purchases or registrations. The rate and calculation method vary by state. Some states charge a percentage of the vehicle\'s value, while others may use a different calculation method. Vehicle tax is typically paid at the time of purchase or registration.',
      },
      {
        question: 'When do I pay vehicle tax?',
        answer: 'Vehicle tax is typically paid when you purchase a vehicle or register it in a new state. The tax is usually collected by the dealership at the point of sale or by the DMV when you register the vehicle. Some states require annual vehicle tax payments as part of registration renewal.',
      },
    ]

    return (
      <div className="min-h-screen flex flex-col">
        <FAQSchema faqs={faqData} />
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
                Our free <strong>{stateData.name.toLowerCase()} vehicle tax calculator</strong> helps you calculate vehicle tax for purchases and registrations in {stateData.name}. 
                This <strong>{stateData.code.toLowerCase()} vehicle tax calculator</strong> estimates the vehicle tax amount and total price based on the vehicle value and {stateData.name} state vehicle tax rate.
              </p>
            </div>

            <StateVehicleTaxCalculator stateSlug={stateSlug} stateData={stateData} />

            {/* How It Works Section */}
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed">
                  The calculator multiplies your vehicle value by the {stateData.name} state vehicle tax rate to determine the vehicle tax amount. The total price is calculated by adding the vehicle tax to the original vehicle value. Vehicle tax rates and calculation methods may vary by state, and some states may use different valuation methods (such as assessed value, purchase price, or MSRP). This calculator provides an estimate based on the state rate applied to the vehicle value you enter. Actual vehicle taxes may vary based on vehicle type, age, local regulations, and specific valuation methods used by your state's DMV or tax office.
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
                  <p><strong>Vehicle Tax:</strong> Vehicle Tax = Vehicle Value × State Vehicle Tax Rate</p>
                  <p><strong>Total Price:</strong> Total Price = Vehicle Value + Vehicle Tax</p>
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
                  <AccordionItem value="what-is-vehicle-tax">
                    <AccordionTrigger className="text-left font-semibold">What is vehicle tax?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Vehicle tax is a tax imposed by some states on vehicle purchases or registrations. The rate and calculation method vary by state. Some states charge a percentage of the vehicle's value, while others may use a different calculation method. Vehicle tax is typically paid at the time of purchase or registration.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="when-to-pay">
                    <AccordionTrigger className="text-left font-semibold">When do I pay vehicle tax?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Vehicle tax is typically paid when you purchase a vehicle or register it in a new state. The tax is usually collected by the dealership at the point of sale or by the DMV when you register the vehicle. Some states require annual vehicle tax payments as part of registration renewal.
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
                  <Link href={`/calculators/${getStateWithholdingCalculatorSlug(stateSlug)}`} className="text-primary hover:underline">
                    {stateData.name} Withholding Tax Calculator
                  </Link>
                  <Link href={`/calculators/${getStateSalesTaxCalculatorSlug(stateSlug)}`} className="text-primary hover:underline">
                    {stateData.name} Sales Tax Calculator
                  </Link>
                  <Link href={`/calculators/${getStateTaxCalculatorSlug(stateSlug)}`} className="text-primary hover:underline">
                    {stateData.name} Tax Calculator
                  </Link>
                  <Link href="/calculators/federal-tax-calculator" className="text-primary hover:underline">
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

  if (type === "excise-tax") {
    // Import and render Maine excise tax calculator
    const { default: MaineExciseTaxPage } = await import("../state/maine/excise-tax/page")
    return <MaineExciseTaxPage />
  }

  notFound()
}

