import type { Metadata } from 'next'
import StateTaxComparisonClient from '@/components/calculators/state-tax-comparison-client'

export const metadata: Metadata = {
  title: "State Tax Comparison Tool 2025 | Compare Taxes by State",
  description: "Compare state income taxes, sales taxes, and take-home pay between any two US states. Find out how much you can save by moving. Free tax comparison calculator.",
  keywords: "state tax comparison, compare state taxes, tax calculator by state, relocation tax calculator, cost of living calculator, state income tax comparison",
  openGraph: {
    title: "State Tax Comparison Tool 2025 | TaxSal",
    description: "Thinking of moving? Compare taxes side-by-side to see how much you could save.",
    type: "website",
  },
}

export default function StateTaxComparisonPage() {
  return <StateTaxComparisonClient />
}
