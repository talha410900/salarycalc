import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FederalTaxCalculator } from "@/components/calculators/federal-tax-calculator"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Federal Tax Calculator | Federal Tax Withholding Calculator 2025-2026",
  description: "Calculate your federal income tax, Social Security, and Medicare withholdings for 2025-2026. Free federal tax calculator to estimate your net take-home pay and tax deductions.",
  keywords: "federal tax calculator, federal tax withholding calculator, federal income tax calculator, tax withholding calculator, federal tax 2025-2026",
  openGraph: {
    title: "Federal Tax Calculator | Federal Tax Withholding Calculator 2025-2026",
    description: "Calculate your federal income tax, Social Security, and Medicare withholdings for 2025-2026. Free federal tax calculator.",
  },
}

export default function FederalTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Federal Tax Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estimate your federal income tax, Social Security, and Medicare deductions based on 2025-2026 tax brackets.
            </p>
          </div>

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>federal tax calculator</strong> helps you calculate federal income tax, Social Security, and Medicare withholdings for 2025-2026. 
              This <strong>federal tax withholding calculator</strong> estimates your net take-home pay by calculating federal tax deductions based on your gross income, filing status, and 2025-2026 tax brackets. 
              Use this <strong>federal income tax calculator</strong> to understand how much federal tax will be withheld from your paycheck.
            </p>
          </div>

          <FederalTaxCalculator />

          {/* Comprehensive Guide Section */}
          <div className="space-y-8 mt-12">
            
            {/* Understanding Federal Tax Brackets */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-foreground">Understanding 2025-2026 Federal Tax Brackets</h2>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed mb-4">
                  The United States uses a progressive tax system, meaning your income is taxed at different rates as it rises. 
                  For the 2025-2026 tax year, there are seven federal income tax brackets: 10%, 12%, 22%, 24%, 32%, 35%, and 37%.
                </p>
                <p className="leading-relaxed mb-4">
                  It's a common misconception that moving into a higher tax bracket means <em>all</em> your income is taxed at that higher rate. 
                  In reality, only the portion of your income that falls within that specific bracket is taxed at that rate. 
                  Your <strong>effective tax rate</strong> is the actual percentage of your total income that goes to the IRS, which is typically lower than your top marginal tax bracket.
                </p>
                <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">2025 Tax Brackets (Single Filers)</h3>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>10%</strong> on income between $0 and $11,925</li>
                  <li><strong>12%</strong> on income between $11,926 and $48,475</li>
                  <li><strong>22%</strong> on income between $48,476 and $103,350</li>
                  <li><strong>24%</strong> on income between $103,351 and $197,300</li>
                  <li><strong>32%</strong> on income between $197,301 and $250,525</li>
                  <li><strong>35%</strong> on income between $250,526 and $626,350</li>
                  <li><strong>37%</strong> on income over $626,350</li>
                </ul>
                <p className="text-sm italic">
                  *Note: These are projected brackets for 2025. Actual IRS adjustments may vary slightly due to inflation.
                </p>
              </CardContent>
            </Card>

            {/* Standard vs Itemized Deduction */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-foreground">Standard Deduction vs. Itemized Deductions</h2>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed mb-4">
                  Taxpayers can choose between taking the <strong>Standard Deduction</strong> or <strong>Itemizing Deductions</strong>. 
                  The Standard Deduction is a flat amount that reduces your taxable income, no questions asked. 
                  Itemizing requires you to list eligible expenses (like mortgage interest, state taxes, and charitable donations) on Schedule A.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">2025 Standard Deduction Amounts</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Single & Married Filing Separately:</span>
                        <span className="font-medium">$15,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Married Filing Jointly:</span>
                        <span className="font-medium">$30,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Head of Household:</span>
                        <span className="font-medium">$22,500</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="leading-relaxed text-sm">
                      Most Americans (over 85%) choose the Standard Deduction because recent tax laws nearly doubled the amount, 
                      making it higher than most people's itemized expenses. Our calculator automatically applies the 
                      Standard Deduction based on your filing status unless you specify otherwise.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FICA Taxes Explained */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-foreground">FICA Taxes: Social Security & Medicare</h2>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed mb-4">
                  Beyond federal income tax, your paycheck is also subject to FICA (Federal Insurance Contributions Act) taxes. 
                  These fund the Social Security and Medicare programs.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground">Social Security Tax (6.2%)</h3>
                    <p className="leading-relaxed">
                      You pay 6.2% of your earnings into Social Security, but only up to a certain income limit called the "wage base." 
                      For 2025, this limit is projected to be around <strong>$176,100</strong>. Any income earned above this amount is not taxed for Social Security.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Medicare Tax (1.45% +)</h3>
                    <p className="leading-relaxed">
                      You pay 1.45% of <em>all</em> your earnings into Medicare, with no income limit. 
                      High earners (single filers over $200,000 or married couples over $250,000) pay an 
                      <strong>Additional Medicare Tax of 0.9%</strong> on the excess amount.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed FAQ Section */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">How do I calculate my effective tax rate?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your effective tax rate is calculated by dividing your total tax (Federal + FICA) by your gross income. 
                    For example, if you earn $100,000 and pay $18,000 in total taxes, your effective tax rate is 18%. 
                    This is different from your marginal tax rate, which is the rate applied to the last dollar you earned.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Does this calculator include state taxes?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This specific page focuses on Federal taxes. However, our <Link href="/calculators/take-home-pay-calculator" className="text-primary hover:underline">Take-Home Pay Calculator</Link> includes both federal and state tax estimates for all 50 states.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What is the difference between gross pay and net pay?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong>Gross pay</strong> is the total amount you earn before any deductions (the salary offer you accepted). 
                    <strong>Net pay</strong> (or take-home pay) is what actually hits your bank account after federal taxes, state taxes, 
                    Social Security, Medicare, and other deductions like health insurance or 401(k) contributions are subtracted.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">How can I reduce my taxable income?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Common ways to lower your taxable income include contributing to a 401(k) or 403(b) retirement plan, 
                    contributing to a Health Savings Account (HSA), or using a Flexible Spending Account (FSA). 
                    These contributions are taken out "pre-tax," meaning they lower the income amount the IRS uses to calculate your taxes.
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
                <Link href="/calculators/payroll-tax-calculator" className="text-primary hover:underline">
                  Payroll Tax Calculator
                </Link>
                <Link href="/calculators/take-home-pay-calculator" className="text-primary hover:underline">
                  Take-Home Pay Calculator
                </Link>
                <Link href="/calculators/tax-return-calculator" className="text-primary hover:underline">
                  Tax Return Calculator
                </Link>
                <Link href="/calculators/self-employed-tax-calculator" className="text-primary hover:underline">
                  Self-Employed Tax Calculator
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

