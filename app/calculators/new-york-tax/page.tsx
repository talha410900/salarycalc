import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewYorkTaxCalculator } from "@/components/calculators/new-york-tax-calculator"

export const metadata = {
  title: "New York State Tax Calculator | SalaryCalc",
  description: "Calculate your New York state income tax using progressive tax brackets.",
}

export default function NewYorkTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">New York State Tax Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your NY state income tax using 2025-2026 progressive tax brackets.
            </p>
          </div>
          <NewYorkTaxCalculator />
        </div>
      </main>
      <Footer />
    </div>
  )
}
