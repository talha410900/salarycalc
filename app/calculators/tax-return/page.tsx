import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TaxReturnCalculator } from "@/components/calculators/tax-return-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSchema } from "@/components/faq-schema"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tax Return Calculator & Refund Estimator 2025-2026 | Free Tax Refund Calculator",
  description: "Estimate your tax refund or amount owed with our free tax return calculator. Calculate federal income tax, AGI, taxable income, and refund estimates for 2025-2026.",
  keywords: "tax return calculator, tax refund calculator, refund estimator, tax owed calculator, income tax calculator, tax return estimator 2025-2026",
  openGraph: {
    title: "Tax Return Calculator & Refund Estimator 2025-2026 | Free Tax Refund Calculator",
    description: "Estimate your tax refund or amount owed with our free tax return calculator. Calculate federal income tax, AGI, taxable income, and refund estimates.",
  },
}

export default function TaxReturnPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tax Return Calculator & Refund Estimator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estimate your tax refund or amount owed by calculating your federal income tax based on your income, deductions, and withholdings.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>tax return calculator</strong> helps you estimate your tax refund or amount owed for 2025-2026. 
              This <strong>tax refund estimator</strong> calculates your adjusted gross income (AGI), taxable income, federal income tax, and estimated refund based on your total income, adjustments, deductions, and tax withholdings.
            </p>
          </div>

          <TaxReturnCalculator />

          {/* How It Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The calculator first calculates your Adjusted Gross Income (AGI) by subtracting adjustments to income (like IRA contributions, student loan interest) from your total income. It then subtracts either the standard deduction or your itemized deductions from your AGI to determine your taxable income. The federal income tax is calculated using progressive tax brackets based on your filing status. Finally, it compares your tax withheld during the year to your calculated tax liability to determine whether you'll receive a refund or owe additional tax.
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
                <p><strong>Adjusted Gross Income (AGI):</strong> AGI = Total Income - Adjustments to Income</p>
                <p><strong>Taxable Income:</strong> Taxable Income = AGI - Deduction (Standard or Itemized)</p>
                <p><strong>Federal Income Tax:</strong> Calculated using progressive tax brackets based on filing status and taxable income</p>
                <p><strong>Refund or Amount Owed:</strong> Refund/Owed = Tax Withheld - Federal Income Tax Owed</p>
                <p className="text-xs mt-4">
                  <strong>Standard Deductions 2025-2026:</strong> Single: $15,750 | Married Filing Jointly: $31,500 | Married Filing Separately: $15,750 | Head of Household: $23,700
                </p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <FAQSchema faqs={[
                {
                  question: 'What is Adjusted Gross Income (AGI)?',
                  answer: 'Adjusted Gross Income (AGI) is your total income from all sources minus certain adjustments (also called "above-the-line" deductions). These adjustments include contributions to traditional IRAs, student loan interest, educator expenses, and health savings account contributions. AGI is used to determine your eligibility for various tax credits and deductions, and it serves as the starting point for calculating your taxable income.',
                },
                {
                  question: 'Should I use the standard deduction or itemized deductions?',
                  answer: 'You should use whichever deduction method gives you the larger deduction amount. The standard deduction is a fixed amount based on your filing status. Itemized deductions include mortgage interest, state and local taxes (SALT), charitable contributions, and medical expenses that exceed a certain threshold. If your itemized deductions exceed the standard deduction for your filing status, you\'ll save more money by itemizing. Most taxpayers use the standard deduction because it\'s simpler and often larger than their itemized deductions.',
                },
                {
                  question: 'When should I file my tax return?',
                  answer: 'The deadline to file your federal tax return is typically April 15th of the following year. For 2025-2026 taxes, the deadline would be April 15, 2026. If you\'re expecting a refund, you can file as soon as you have all your tax documents (W-2s, 1099s, etc.), usually in late January or early February. If you owe taxes, you still need to file by the deadline, but you can request an extension to file (though you still need to pay any taxes owed by the original deadline to avoid penalties).',
                },
                {
                  question: 'What if I owe taxes? Do I need to make quarterly payments?',
                  answer: 'If you expect to owe more than $1,000 in taxes for the year (after subtracting withholdings and estimated tax payments), you may need to make quarterly estimated tax payments. This is common for self-employed individuals, freelancers, or those with significant investment income. Quarterly payments are due on April 15, June 15, September 15, and January 15 of the following year. If you\'re an employee with a regular paycheck, you can adjust your W-4 form to have more tax withheld to avoid owing at tax time.',
                },
              ]} />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-agi">
                  <AccordionTrigger className="text-left font-semibold">What is Adjusted Gross Income (AGI)?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Adjusted Gross Income (AGI) is your total income from all sources minus certain adjustments (also called "above-the-line" deductions). These adjustments include contributions to traditional IRAs, student loan interest, educator expenses, and health savings account contributions. AGI is used to determine your eligibility for various tax credits and deductions, and it serves as the starting point for calculating your taxable income.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="standard-vs-itemized">
                  <AccordionTrigger className="text-left font-semibold">Should I use the standard deduction or itemized deductions?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    You should use whichever deduction method gives you the larger deduction amount. The standard deduction is a fixed amount based on your filing status. Itemized deductions include mortgage interest, state and local taxes (SALT), charitable contributions, and medical expenses that exceed a certain threshold. If your itemized deductions exceed the standard deduction for your filing status, you'll save more money by itemizing. Most taxpayers use the standard deduction because it's simpler and often larger than their itemized deductions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="when-to-file">
                  <AccordionTrigger className="text-left font-semibold">When should I file my tax return?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    The deadline to file your federal tax return is typically April 15th of the following year. For 2025-2026 taxes, the deadline would be April 15, 2026. If you're expecting a refund, you can file as soon as you have all your tax documents (W-2s, 1099s, etc.), usually in late January or early February. If you owe taxes, you still need to file by the deadline, but you can request an extension to file (though you still need to pay any taxes owed by the original deadline to avoid penalties).
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="quarterly-payments">
                  <AccordionTrigger className="text-left font-semibold">What if I owe taxes? Do I need to make quarterly payments?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    If you expect to owe more than $1,000 in taxes for the year (after subtracting withholdings and estimated tax payments), you may need to make quarterly estimated tax payments. This is common for self-employed individuals, freelancers, or those with significant investment income. Quarterly payments are due on April 15, June 15, September 15, and January 15 of the following year. If you're an employee with a regular paycheck, you can adjust your W-4 form to have more tax withheld to avoid owing at tax time.
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

