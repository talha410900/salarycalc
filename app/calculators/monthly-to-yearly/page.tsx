import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MonthlyToYearlyCalculator } from "@/components/calculators/monthly-to-yearly-calculator"

export const metadata = {
  title: "Monthly to Yearly Calculator | TaxSal",
  description: "Convert your monthly salary to annual income. Calculate weekly and hourly rates too.",
}

export default function MonthlyToYearlyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Monthly to Yearly Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert your monthly salary to yearly, weekly, and hourly income equivalents.
            </p>
          </div>
          <MonthlyToYearlyCalculator />
        </div>
      </main>
      <Footer />
    </div>
  )
}
