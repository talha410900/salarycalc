import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OvertimePayCalculator } from "@/components/calculators/overtime-pay-calculator"

export const metadata = {
  title: "Overtime Pay Calculator | SalaryCalc",
  description: "Calculate your overtime earnings. See your total weekly pay with regular and overtime hours.",
}

export default function OvertimePayPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Overtime Pay Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your overtime earnings based on your hourly rate, overtime hours, and multiplier.
            </p>
          </div>
          <OvertimePayCalculator />
        </div>
      </main>
      <Footer />
    </div>
  )
}
