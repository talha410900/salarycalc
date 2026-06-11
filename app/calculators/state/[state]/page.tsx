import { redirect } from "next/navigation"
import { STATE_TAX_DATA, ALL_STATES, getTopMarginalRate } from "@/lib/state-tax-data"
import { StateCalculator } from "@/components/calculators/state-calculator"
import { StateCalculatorNav } from "@/components/state-calculator-nav"
import { StateTaxContent } from "@/components/state-tax-content"
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

  const rateSummary =
    stateData.type === "None"
      ? `${stateData.name} has no state income tax.`
      : `Top rate: ${getTopMarginalRate(stateSlug)}.`

  return {
    title: `${stateData.name} State Tax Calculator 2025-2026 | Free ${stateData.name} Tax Calculator`,
    description: `Calculate your ${stateData.name} state income tax for 2025-2026. ${rateSummary} Free calculator with ${stateData.name} brackets, worked examples, and take-home pay estimates.`,
    keywords: `${stateData.name.toLowerCase()} tax calculator, ${stateData.name.toLowerCase()} state tax calculator, ${stateData.code.toLowerCase()} tax calculator, ${stateData.name.toLowerCase()} income tax calculator`,
    alternates: {
      canonical: `/calculators/state/${stateSlug}`,
    },
    openGraph: {
      title: `${stateData.name} State Tax Calculator 2025-2026`,
      description: `Calculate your ${stateData.name} state income tax for 2025-2026. ${rateSummary}`,
    },
  }
}

export default async function StateTaxPage({ params }: PageProps) {
  const { state: stateSlug } = await params
  const stateData = STATE_TAX_DATA[stateSlug]

  if (!stateData) {
    redirect('/')
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 pb-0">
        <StateCalculatorNav stateSlug={stateSlug} stateName={stateData.name} currentType="income-tax" />
      </div>
      <StateCalculator stateSlug={stateSlug} stateData={stateData} />
      <StateTaxContent stateSlug={stateSlug} />
      <Footer />
    </>
  )
}
