import type { Metadata } from 'next'
import ReverseSalaryCalculatorClient from '@/components/calculators/reverse-salary-calculator-client'

export const metadata: Metadata = {
  title: "Reverse Salary Calculator 2025 | Calculate Gross from Take-Home",
  description: "Calculate required gross salary from your desired take-home pay. Accurate reverse tax calculator for 2025-2026 taxes including Federal, FICA, and State.",
  keywords: "reverse salary calculator, calculate gross from net, take home pay to salary, salary requirement calculator, how much do i need to make",
  openGraph: {
    title: "Reverse Salary Calculator 2025 | TaxSal",
    description: "Find out exactly how much you need to earn to hit your take-home pay goal.",
    type: "website",
  },
}

export default function ReverseSalaryCalculatorPage() {
  return <ReverseSalaryCalculatorClient />
}
