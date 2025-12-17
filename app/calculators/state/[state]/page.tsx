import { notFound } from "next/navigation"
import { STATE_TAX_DATA, ALL_STATES } from "@/lib/state-tax-data"
import { StateCalculator } from "@/components/calculators/state-calculator"
import { StateCalculatorNav } from "@/components/state-calculator-nav"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  return ALL_STATES.map((state) => ({
    state: state.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params
  const stateData = STATE_TAX_DATA[stateSlug]

  if (!stateData) {
    return { title: "State Not Found" }
  }

  return {
    title: `${stateData.name} State Tax Calculator 2025-2026 | TaxSal`,
    description: `Calculate your ${stateData.name} state income tax for 2025-2026. ${stateData.notes}`,
  }
}

export default async function StateTaxPage({ params }: PageProps) {
  const { state: stateSlug } = await params
  const stateData = STATE_TAX_DATA[stateSlug]

  if (!stateData) {
    notFound()
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <StateCalculatorNav stateSlug={stateSlug} stateName={stateData.name} currentType="income-tax" />
      </div>
      <StateCalculator stateSlug={stateSlug} stateData={stateData} />
      <Footer />
    </>
  )
}
