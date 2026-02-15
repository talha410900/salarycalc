import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HourlyToSalaryCalculator } from "@/components/calculators/hourly-to-salary-calculator"
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hourly to Salary Calculator | Convert Hourly Wage to Annual Salary",
  description: "Convert your hourly wage to annual salary. Calculate your yearly income based on hours worked per week. Free hourly to salary calculator for 2025-2026.",
  keywords: "hourly to salary calculator, hourly wage to salary, convert hourly to annual, hourly to yearly calculator, hourly rate calculator",
  openGraph: {
    title: "Hourly to Salary Calculator | Convert Hourly Wage to Annual Salary",
    description: "Convert your hourly wage to annual salary. Calculate your yearly income based on hours worked per week."}}

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

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>hourly to salary calculator</strong> helps you convert your hourly wage to annual salary. 
              This <strong>hourly wage to salary</strong> calculator calculates your yearly income based on your hourly rate, hours worked per week, and weeks worked per year. 
              Use this <strong>hourly to annual salary calculator</strong> to understand your total annual compensation and compare hourly vs. salaried positions.
            </p>
          </div>

          <HourlyToSalaryCalculator />

          {/* Comprehensive Guide Section */}
          <div className="space-y-8 mt-12">
            
            {/* The Math Behind the Conversion */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-foreground">How to Convert Hourly Wage to Annual Salary</h2>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed mb-4">
                  The simplest formula to convert hourly pay to a yearly salary is:
                  <br />
                  <code className="px-2 py-1 bg-muted rounded text-foreground font-mono">Hourly Rate × Hours per Week × 52 Weeks</code>
                </p>
                <p className="leading-relaxed mb-4">
                  For a standard full-time job (40 hours/week), you can simply multiply your hourly rate by <strong>2,080</strong> (40 hours × 52 weeks).
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {[
                    { fps: '$15/hr', salary: '$31,200' },
                    { fps: '$20/hr', salary: '$41,600' },
                    { fps: '$25/hr', salary: '$52,000' },
                    { fps: '$30/hr', salary: '$62,400' },
                    { fps: '$40/hr', salary: '$83,200' },
                    { fps: '$50/hr', salary: '$104,000' },
                    { fps: '$75/hr', salary: '$156,000' },
                    { fps: '$100/hr', salary: '$208,000' },
                  ].map(item => (
                    <div key={item.fps} className="bg-primary/5 p-3 rounded text-center">
                      <div className="font-semibold text-primary">{item.fps}</div>
                      <div className="text-xs text-muted-foreground">approx.</div>
                      <div className="font-bold text-foreground">{item.salary}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Factors That Affect Your Actual Salary */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-foreground">Hidden Factors: What Changes Your Actual Income?</h2>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <ul className="space-y-4 list-none pl-0">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">1</div>
                    <div>
                      <strong className="text-foreground">Unpaid Time Off:</strong> If you don't get paid vacation days, every day you miss reduces your annual income. 
                      Taking 2 weeks (10 days) off unpaid reduces your 2,080 annual hours to 2,000.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">2</div>
                    <div>
                      <strong className="text-foreground">Overtime Pay:</strong> Federal law requires time-and-a-half pay for hours over 40 in a workweek. 
                      Regular overtime can significantly boost your effective annual salary.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">3</div>
                    <div>
                      <strong className="text-foreground">Leap Years & Calendar Quirks:</strong> A standard year has 260 workdays (52 weeks × 5 days). 
                      However, some years have 261 or 262 workdays depending on the calendar, which can mean an extra day's pay.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Detailed FAQ Section */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Is the 2,080 work hour rule accurate?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    It's the standard for full-time salaried employees. However, the exact number of work hours in a year varies slightly. 
                    Most government agencies and payroll systems use 2,087 hours as the divisor for hourly calculations to account for leap years over time.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">How do I calculate monthly income from hourly wage?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Multiply your hourly wage by 173.33 (which is 2,080 hours ÷ 12 months). 
                    For example, $20/hour × 173.33 ≈ $3,466 per month gross income.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Does salary include taxes?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    No, the result shown here is your <strong>Gross Annual Income</strong>. To see what you actually take home 
                    after taxes, use our <Link href="/calculators/take-home-pay-calculator" className="text-primary hover:underline">Take-Home Pay Calculator</Link>.
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
                <Link href="/calculators/salary-to-hourly-calculator" className="text-primary hover:underline">
                  Salary to Hourly Calculator
                </Link>
                <Link href="/calculators/take-home-pay-calculator" className="text-primary hover:underline">
                  Take-Home Pay Calculator
                </Link>
                <Link href="/calculators/overtime-pay-calculator" className="text-primary hover:underline">
                  Overtime Pay Calculator
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
