import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MonthlyToYearlyCalculator } from "@/components/calculators/monthly-to-yearly-calculator"
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Monthly to Yearly Calculator | Convert Monthly Salary to Annual Income",
  description: "Convert your monthly salary to annual income. Calculate weekly and hourly rates too. Free monthly to yearly calculator for 2025-2026.",
  keywords: "monthly to yearly calculator, monthly to annual calculator, convert monthly to yearly, monthly salary to annual, monthly income calculator",
  openGraph: {
    title: "Monthly to Yearly Calculator | Convert Monthly Salary to Annual Income",
    description: "Convert your monthly salary to annual income. Calculate weekly and hourly rates too."}}

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

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>monthly to yearly calculator</strong> helps you convert your monthly salary to annual income. 
              This <strong>monthly to annual calculator</strong> calculates your yearly, weekly, and hourly income equivalents based on your monthly salary. 
              Use this <strong>monthly salary to annual</strong> converter to understand your total annual compensation and plan your budget accordingly.
            </p>
          </div>

          <MonthlyToYearlyCalculator />

          {/* How Monthly to Yearly Calculator Works */}
          <Card className="mt-12">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">How the Monthly to Yearly Calculator Works</h2>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The <strong>monthly to yearly calculator</strong> multiplies your monthly salary by 12 to get your annual income. 
                For example, if you earn $4,000 per month, your annual salary would be $4,000 × 12 = $48,000. 
                The calculator also converts to weekly (annual ÷ 52) and hourly rates (annual ÷ hours per year) to give you a complete picture of your income breakdown.
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
                <Link href="/calculators/hourly-to-salary-calculator" className="text-primary hover:underline">
                  Hourly to Salary Calculator
                </Link>
                <Link href="/calculators/salary-to-hourly-calculator" className="text-primary hover:underline">
                  Salary to Hourly Calculator
                </Link>
                <Link href="/calculators/biweekly-to-annual-calculator" className="text-primary hover:underline">
                  Bi-Weekly to Annual Calculator
                </Link>
                <Link href="/calculators/take-home-pay-calculator" className="text-primary hover:underline">
                  Take-Home Pay Calculator
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
