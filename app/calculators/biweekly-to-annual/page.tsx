import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BiweeklyToAnnualCalculator } from "@/components/calculators/biweekly-to-annual-calculator"

export const metadata = {
  title: "Bi-Weekly to Annual Salary Calculator | TaxSal",
  description: "Convert your bi-weekly paycheck to annual salary and monthly equivalent.",
}

export default function BiweeklyToAnnualPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Bi-Weekly to Annual Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert your bi-weekly paycheck to annual salary and monthly equivalent.
            </p>
          </div>
          <BiweeklyToAnnualCalculator />
        </div>
      </main>
      <Footer />
    </div>
  )
}
