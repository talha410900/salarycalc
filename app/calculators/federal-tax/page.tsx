import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FederalTaxCalculator } from "@/components/calculators/federal-tax-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

          {/* How Federal Tax Calculator Works */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How the Federal Tax Calculator Works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                The <strong>federal tax calculator</strong> uses 2025-2026 tax brackets to calculate your federal income tax based on your filing status (single or married). 
                It applies the standard deduction ($15,750 for single filers, $31,500 for married filing jointly) and calculates tax using progressive brackets ranging from 10% to 37%. 
                The calculator also computes Social Security tax at 6.2% on wages up to $176,100 and Medicare tax at 1.45% on all wages, with an additional 0.9% for high earners.
              </p>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Related Tax Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/calculators/take-home-pay" className="text-primary hover:underline">
                  Take-Home Pay Calculator
                </Link>
                <Link href="/calculators/payroll-tax" className="text-primary hover:underline">
                  Payroll Tax Calculator
                </Link>
                <Link href="/calculators/tax-return" className="text-primary hover:underline">
                  Tax Return Calculator
                </Link>
                <Link href="/calculators/self-employed-tax" className="text-primary hover:underline">
                  Self-Employed Tax Calculator
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* External Resources */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                For official tax information and forms, visit the <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Internal Revenue Service (IRS)</a> website. 
                The IRS provides detailed information about <a href="https://www.irs.gov/forms-pubs/about-publication-15" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">tax withholding</a> and <a href="https://www.irs.gov/forms-pubs/about-form-w-4" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">W-4 forms</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
