import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TakeHomePayCalculator } from "@/components/calculators/take-home-pay-calculator"

export const metadata = {
  title: "Take-Home Pay Calculator | SalaryCalc",
  description:
    "Calculate your net take-home pay after all tax deductions including federal, state, Social Security, and Medicare.",
}

export default function TakeHomePayPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Take-Home Pay Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your actual paycheck amount after all taxes and deductions.
            </p>
          </div>
          <TakeHomePayCalculator />
        </div>
      </main>
      <Footer />
    </div>
  )
}
