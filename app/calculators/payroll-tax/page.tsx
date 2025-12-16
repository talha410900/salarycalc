import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PayrollTaxCalculator } from "@/components/calculators/payroll-tax-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Payroll Tax Calculator (2025) | Calculate Net Pay After Taxes",
  description: "Calculate your net pay by deducting Federal Tax, Social Security, and Medicare from gross wages for the 2025 tax year. Free payroll tax calculator.",
  keywords: "payroll tax calculator, net pay calculator, 2025 payroll taxes, federal tax calculator, social security tax, medicare tax",
  openGraph: {
    title: "Payroll Tax Calculator (2025) | Calculate Net Pay After Taxes",
    description: "Calculate your net pay by deducting Federal Tax, Social Security, and Medicare from gross wages for the 2025 tax year.",
  },
}

export default function PayrollTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Payroll Tax Calculator (2025)</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate net pay by deducting Federal Tax, Social Security, and Medicare from gross wages for the 2025 tax year.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our <strong>payroll tax calculator</strong> helps you understand <strong>how to calculate payroll taxes</strong> for 2025 by deducting federal tax, Social Security (6.2%), and Medicare (1.45%) from gross wages. 
              Enter your gross pay, pay period, and filing status for instant net pay calculations.
            </p>
          </div>

          <PayrollTaxCalculator />

          {/* How It Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The calculator first converts your gross pay to annual income based on your pay period. It then calculates federal income tax using 2025 tax brackets and standard deductions ($15,750 single, $31,500 married, $23,625 head of household). Social Security tax is calculated at 6.2% on wages up to $176,100, and Medicare tax is 1.45% on all wages, plus an additional 0.9% for high earners (income over $200,000 single or $250,000 married). If you select a state, state income tax is also calculated. Finally, all taxes are converted back to your pay period and deducted from gross pay to show your net pay.
              </p>
              <p className="leading-relaxed mt-4">
                All calculations are performed on an annual basis first, then converted back to your selected pay period. Weekly pay is multiplied by 52, bi-weekly by 26, monthly by 12, and annual remains as-is. This ensures accurate tax calculations regardless of pay frequency.
              </p>
            </CardContent>
          </Card>

          {/* Formulas Used Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Formulas Used</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <div className="space-y-3">
                <p><strong>Federal Tax:</strong> Taxable Income = Gross Income - Standard Deduction. Tax is calculated using progressive brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%).</p>
                <p><strong>Social Security:</strong> Tax = min(Annual Income, $176,100) × 6.2%</p>
                <p><strong>Medicare:</strong> Base Tax = Annual Income × 1.45%. Additional Medicare = max(0, Annual Income - Threshold) × 0.9% where Threshold is $200,000 (single) or $250,000 (married).</p>
                <p><strong>Net Pay:</strong> Net Pay = Gross Pay - (Federal Tax + Social Security + Medicare + State Tax) / Pay Period Multiplier</p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="accuracy">
                  <AccordionTrigger className="text-left font-semibold">How accurate are the calculations?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    The calculator uses official 2025 federal tax brackets, standard deductions, and FICA rates. Results are estimates and may vary slightly from actual paychecks due to W-4 elections, additional deductions, or state-specific calculations. For exact amounts, consult your payroll department or tax professional.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

