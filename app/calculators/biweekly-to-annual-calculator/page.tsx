import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BiweeklyToAnnualCalculator } from "@/components/calculators/biweekly-to-annual-calculator"
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bi-Weekly to Annual Salary Calculator | Convert Biweekly Pay to Annual",
  description: "Convert your bi-weekly paycheck to annual salary and monthly equivalent. Free biweekly to annual calculator for 2025-2026.",
  keywords: "biweekly to annual calculator, bi-weekly to annual, convert biweekly to annual, biweekly salary calculator, biweekly pay calculator",
  openGraph: {
    title: "Bi-Weekly to Annual Salary Calculator | Convert Biweekly Pay to Annual",
    description: "Convert your bi-weekly paycheck to annual salary and monthly equivalent."}}

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

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>biweekly to annual calculator</strong> helps you convert your bi-weekly paycheck to annual salary. 
              This <strong>bi-weekly to annual</strong> calculator calculates your yearly income by multiplying your bi-weekly pay by 26 (the number of pay periods in a year). 
              Use this <strong>biweekly salary calculator</strong> to understand your total annual compensation and plan your budget accordingly.
            </p>
          </div>

          <BiweeklyToAnnualCalculator />

          {/* How Bi-Weekly to Annual Calculator Works */}
          <Card className="mt-12">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">How the Bi-Weekly to Annual Calculator Works</h2>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The <strong>biweekly to annual calculator</strong> multiplies your bi-weekly paycheck by 26 to get your annual salary. 
                For example, if you earn $2,000 per bi-weekly paycheck, your annual salary would be $2,000 × 26 = $52,000. 
                The calculator also converts to monthly (annual ÷ 12) and weekly (bi-weekly ÷ 2) equivalents to give you a complete picture of your income breakdown.
              </p>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/calculators/monthly-to-yearly-calculator" className="text-primary hover:underline">
                  Monthly to Yearly Calculator
                </Link>
                <Link href="/calculators/hourly-to-salary-calculator" className="text-primary hover:underline">
                  Hourly to Salary Calculator
                </Link>
                <Link href="/calculators/take-home-pay-calculator" className="text-primary hover:underline">
                  Take-Home Pay Calculator
                </Link>
                <Link href="/calculators/federal-tax-calculator" className="text-primary hover:underline">
                  Federal Tax Calculator
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
