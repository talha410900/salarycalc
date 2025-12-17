import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SalaryToHourlyCalculator } from "@/components/calculators/salary-to-hourly-calculator"

export const metadata = {
  title: "Salary to Hourly Calculator | TaxSal",
  description:
    "Convert your annual salary to hourly rate. Find out your equivalent hourly wage based on your work schedule.",
}

export default function SalaryToHourlyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Salary to Hourly Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert your annual salary into an equivalent hourly rate based on your work schedule.
            </p>
          </div>
          <SalaryToHourlyCalculator />
        </div>
      </main>
      <Footer />
    </div>
  )
}
