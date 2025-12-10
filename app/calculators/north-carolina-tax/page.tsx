import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NorthCarolinaTaxCalculator } from "@/components/calculators/north-carolina-tax-calculator"

export const metadata = {
  title: "North Carolina Tax Calculator | SalaryCalc",
  description: "Calculate your North Carolina state income tax using the 4.5% flat rate.",
}

export default function NorthCarolinaTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">North Carolina Tax Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your NC state income tax using the flat 4.5% rate.
            </p>
          </div>
          <NorthCarolinaTaxCalculator />
        </div>
      </main>
      <Footer />
    </div>
  )
}
