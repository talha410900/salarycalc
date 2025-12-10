import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HourlyToSalaryCalculator } from "@/components/calculators/hourly-to-salary-calculator"

export const metadata = {
  title: "Hourly to Salary Calculator | SalaryCalc",
  description:
    "Convert your hourly wage to annual salary. Calculate your yearly income based on hours worked per week.",
}

export default function HourlyToSalaryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hourly to Salary Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert your hourly wage into an annual salary based on your work schedule. Factor in overtime, benefits,
              and more.
            </p>
          </div>

          <HourlyToSalaryCalculator />
        </div>
      </main>
      <Footer />
    </div>
  )
}
