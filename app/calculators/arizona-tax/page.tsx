import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArizonaTaxCalculator } from "@/components/calculators/arizona-tax-calculator"

export const metadata = {
  title: "Arizona State Tax Calculator | SalaryCalc",
  description: "Calculate your Arizona state income tax withholding using the flat 2.5% rate.",
}

export default function ArizonaTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Arizona State Tax Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your Arizona state income tax withholding using the flat tax rate.
            </p>
          </div>
          <ArizonaTaxCalculator />
        </div>
      </main>
      <Footer />
    </div>
  )
}
