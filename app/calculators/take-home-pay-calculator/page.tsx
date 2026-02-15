import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TakeHomePayCalculator } from "@/components/calculators/take-home-pay-calculator"
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Take-Home Pay Calculator | Net Pay Calculator 2025-2026 | TaxSal",
  description: "Calculate your net take-home pay after all tax deductions including federal, state, Social Security, and Medicare for 2025-2026. Free take-home pay calculator.",
  keywords: "take home pay calculator, net pay calculator, paycheck calculator, after tax salary calculator, take home pay 2025-2026",
  openGraph: {
    title: "Take-Home Pay Calculator | Net Pay Calculator 2025-2026",
    description: "Calculate your net take-home pay after all tax deductions including federal, state, Social Security, and Medicare for 2025-2026."}}

export default function TakeHomePayPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Take-Home Pay Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your actual paycheck amount after all taxes and deductions.
            </p>
          </div>

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>take-home pay calculator</strong> helps you calculate your net pay after all tax deductions for 2025-2026. 
              This <strong>net pay calculator</strong> estimates your actual paycheck amount by deducting federal tax, state tax, Social Security, and Medicare from your gross salary. 
              Use this <strong>take home pay calculator</strong> to understand how much money you'll actually receive in your bank account after taxes.
            </p>
          </div>

          <TakeHomePayCalculator />

          {/* Comprehensive Guide Section */}
          <div className="space-y-8 mt-12">
            
            {/* Understanding Paycheck Deductions */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-foreground">Where Does Your Paycheck Go? Understanding Deductions</h2>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed mb-4">
                  It can be shocking to see the difference between your gross salary and the amount that actually hits your bank account. 
                  Your "take-home pay" is what's left after a series of mandatory and voluntary deductions.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Mandatory Deductions</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><strong>Federal Income Tax:</strong> Based on 2025 brackets and your filing status.</li>
                      <li><strong>State Income Tax:</strong> Varies by state (0% to 13%+).</li>
                      <li><strong>Social Security (6.2%):</strong> Capped at $176,100 of income.</li>
                      <li><strong>Medicare (1.45%):</strong> No income cap; additional 0.9% for high earners.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Voluntary Deductions</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><strong>Retirement (401k/403b):</strong> Pre-tax contributions that lower your taxable income.</li>
                      <li><strong>Health Insurance:</strong> Medical, dental, and vision premiums.</li>
                      <li><strong>HSA/FSA:</strong> Pre-tax savings for healthcare costs.</li>
                      <li><strong>Life/Disability Insurance:</strong> Usually post-tax deductions.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* States with No Income Tax */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-foreground">States with No Income Tax</h2>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed mb-4">
                  Where you live significantly impacts your take-home pay. Nine states have no state income tax on regular income, 
                  meaning you verify keep more of your paycheck in these locations:
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Alaska', 'Florida', 'Nevada', 'New Hampshire', 'South Dakota', 'Tennessee', 'Texas', 'Washington', 'Wyoming'].map(state => (
                    <span key={state} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {state}
                    </span>
                  ))}
                </div>
                <p className="text-sm italic">
                  *Note: New Hampshire and Washington tax interest/dividends or capital gains in specific scenarios, but generally not wage income.
                </p>
              </CardContent>
            </Card>

            {/* Pre-Tax vs Post-Tax Explained */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-foreground">Pre-Tax vs. Post-Tax Deductions</h2>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed mb-4">
                  Understanding the difference can help you save money. <strong>Pre-tax deductions</strong> (like Traditional 401k and HSA) 
                  are taken out <em>before</em> federal and state taxes are calculated, lowering your tax bill immediately. 
                  <strong>Post-tax deductions</strong> (like Roth 401k) are taken out <em>after</em> taxes, providing tax-free growth for the future but no immediate tax break.
                </p>
              </CardContent>
            </Card>

            {/* Detailed FAQ Section */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Why is my take-home pay lower than expected?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This is often due to "tax withholding" settings on your W-4 form. If you claim fewer deductions/dependents, 
                    your employer withholds more tax per paycheck (leading to a larger refund later). 
                    Other factors include high state taxes or benefits costs like health insurance.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">How do bonus payouts work?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Bonuses are often withheld at a flat 22% federal rate (plus state taxes), which might be higher or lower 
                    than your regular tax bracket. This catch-up often happens when you file your annual tax return.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Does this calculator support 2026 projections?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Yes, we verify updated projections for the 2026 tax year based on inflation adjustments to tax brackets and standard deductions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Related Calculators */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/calculators/federal-tax-calculator" className="text-primary hover:underline">
                  Federal Tax Calculator
                </Link>
                <Link href="/calculators/payroll-tax-calculator" className="text-primary hover:underline">
                  Payroll Tax Calculator
                </Link>
                <Link href="/calculators/tax-return-calculator" className="text-primary hover:underline">
                  Tax Return Calculator
                </Link>
                <Link href="/calculators/hourly-to-salary-calculator" className="text-primary hover:underline">
                  Hourly to Salary Calculator
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
