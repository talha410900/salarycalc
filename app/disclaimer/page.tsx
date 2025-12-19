import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disclaimer - TaxSal | Tax Calculator Disclaimer',
  description: 'Important disclaimer regarding the use of our tax calculator and salary calculator. Read about limitations, accuracy, and professional tax advice.',
  keywords: 'disclaimer, tax calculator disclaimer, tax advice, calculator limitations',
  openGraph: {
    title: 'Disclaimer - TaxSal',
    description: 'Important disclaimer regarding the use of our tax calculator and salary calculator.',
  },
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
              Disclaimer
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <Alert className="mb-6 border-amber-500/50 bg-amber-500/10">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-900 dark:text-amber-100">Important Notice</AlertTitle>
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              The information provided by TaxSal is for general informational purposes only. All calculations are estimates and should not be used as the sole basis for financial or tax decisions.
            </AlertDescription>
          </Alert>

          <Card>
            <CardContent className="p-8 space-y-8 prose prose-sm max-w-none">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. General Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, TaxSal excludes all representations, warranties, obligations, and liabilities arising out of or in connection with this website and the calculators provided.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Tax Calculations</h2>
                <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Accuracy of Tax Calculations</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our tax calculators use the latest available tax brackets and rates from the Internal Revenue Service (IRS) and state tax authorities. However, tax laws are complex and subject to frequent changes. The calculations provided are estimates only and may not reflect your actual tax liability.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Factors that may affect your actual tax liability include but are not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Deductions and credits not accounted for in our calculators</li>
                  <li>Changes in tax law after our last update</li>
                  <li>State and local tax variations</li>
                  <li>Filing status and dependents</li>
                  <li>Other income sources</li>
                  <li>Retirement contributions and other pre-tax deductions</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3">2.2 Not for Tax Filing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our calculators are designed for planning and estimation purposes only. They should NOT be used for actual tax filing or as a substitute for professional tax advice. For tax filing purposes, please consult with a qualified tax professional or use official IRS tax software.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Salary and Wage Calculations</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our salary and wage conversion calculators provide estimates based on standard formulas and assumptions. Actual take-home pay may vary significantly based on:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Federal, state, and local tax withholdings</li>
                  <li>Social Security and Medicare deductions</li>
                  <li>Health insurance and other benefits</li>
                  <li>Retirement contributions (401k, IRA, etc.)</li>
                  <li>Other payroll deductions</li>
                  <li>Overtime and bonus payments</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  The calculations assume standard deductions and do not account for all possible deductions, credits, or tax situations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. No Professional Advice</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The information provided on this website does not constitute financial, tax, legal, or professional advice. TaxSal is not a financial advisor, tax preparer, or legal professional.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Before making any financial or tax decisions, you should consult with qualified professionals, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Certified Public Accountants (CPAs) for tax advice</li>
                  <li>Financial advisors for investment and financial planning</li>
                  <li>Tax attorneys for complex tax situations</li>
                  <li>Your employer's HR department for payroll questions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Data and Updates</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We make every effort to keep our tax brackets, rates, and calculation formulas up to date. However, tax laws change frequently, and there may be delays between when changes occur and when we update our calculators.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We are not responsible for any errors or omissions in the information provided. Users should verify all calculations independently and consult official sources, such as the IRS website, for the most current tax information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In no event will TaxSal, its owners, employees, or affiliates be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits, arising out of or in connection with the use of this website or our calculators.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By using our website and calculators, you acknowledge that you understand and agree to these limitations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. State-Specific Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  State tax laws vary significantly and may include local taxes, special deductions, and other factors not accounted for in our calculators. Some states have complex tax structures that cannot be fully represented in a simple calculator.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For accurate state tax information, please consult your state's department of revenue or a qualified tax professional familiar with your state's tax laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Third-Party Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites or reference third-party information. We are not responsible for the accuracy, completeness, or reliability of information from third-party sources. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. User Responsibility</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You are solely responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Verifying the accuracy of all calculations</li>
                  <li>Consulting with professionals for important financial decisions</li>
                  <li>Ensuring compliance with all applicable tax laws</li>
                  <li>Using the information provided in a responsible manner</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to update this disclaimer at any time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of the website after any changes constitutes acceptance of the updated disclaimer.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this disclaimer, please contact us:
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-muted-foreground mb-2">
                    <strong className="text-foreground">Email:</strong> support@taxsal.com
                  </p>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Website:</strong>{' '}
                    <a href="/contact" className="text-primary hover:underline">
                      Contact Page
                    </a>
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

