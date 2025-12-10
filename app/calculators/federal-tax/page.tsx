import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FederalTaxCalculator } from "@/components/calculators/federal-tax-calculator"

export const metadata = {
  title: "Federal Tax Withholding Calculator | SalaryCalc",
  description:
    "Calculate your federal income tax, Social Security, and Medicare withholdings. Estimate your net take-home pay.",
}

export default function FederalTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Federal Tax Withholding Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estimate your federal income tax, Social Security, and Medicare deductions based on 2025 tax brackets.
            </p>
          </div>
          <FederalTaxCalculator />
        </div>
      </main>
      <Footer />
    </div>
  )
}
