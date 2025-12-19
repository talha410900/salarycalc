import { notFound } from "next/navigation"
import { STATE_TAX_DATA, ALL_STATES } from "@/lib/state-tax-data"
import { StateCalculator } from "@/components/calculators/state-calculator"
import { StateCalculatorNav } from "@/components/state-calculator-nav"
import { StateWithholdingCalculator } from "@/components/calculators/state-withholding-calculator"
import { StateSalesTaxCalculator } from "@/components/calculators/state-sales-tax-calculator"
import { StateVehicleTaxCalculator } from "@/components/calculators/state-vehicle-tax-calculator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <StateCalculatorNav stateSlug={stateSlug} stateName={stateData.name} currentType="withholding" />
            <StateWithholdingCalculator stateSlug={stateSlug} stateData={stateData} />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (type === "sales-tax") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <StateCalculatorNav stateSlug={stateSlug} stateName={stateData.name} currentType="sales-tax" />
            <StateSalesTaxCalculator stateSlug={stateSlug} stateData={stateData} />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (type === "vehicle-tax") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <StateCalculatorNav stateSlug={stateSlug} stateName={stateData.name} currentType="vehicle-tax" />
            <StateVehicleTaxCalculator stateSlug={stateSlug} stateData={stateData} />
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

