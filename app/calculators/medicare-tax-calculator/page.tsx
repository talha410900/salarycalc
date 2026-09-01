import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MedicareTaxCalculator } from "@/components/calculators/medicare-tax-calculator"
import { FAQSchema } from "@/components/faq-schema"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

const PAGE_PATH = "/calculators/medicare-tax-calculator"

const MEDICARE_FAQS = [
  {
    question: "How much Medicare tax is deducted from an $1,800 paycheck?",
    answer:
      "$26.10. Employee Medicare tax is 1.45% of gross wages, so $1,800 × 0.0145 = $26.10. That is the standard withholding on that paycheck before any additional Medicare tax.",
  },
  {
    question: "What is the Medicare tax rate?",
    answer:
      "Employees pay 1.45% of all wages toward Medicare, with no wage cap. An additional 0.9% Medicare tax applies to wages above $200,000 for single filers or $250,000 for married filing jointly.",
  },
  {
    question: "Is Medicare tax the same as Social Security tax?",
    answer:
      "No. Social Security is 6.2% of wages up to the annual wage base ($176,100 for 2025-2026). Medicare is 1.45% of all wages. Together they are the employee share of FICA.",
  },
]

export const metadata: Metadata = {
  title: "Medicare Tax Calculator (1.45%) | $1,800 Gross = $26.10",
  description:
    "Calculate employee Medicare tax at 1.45%. $1,800 gross pay has $26.10 withheld. Includes the 0.9% additional Medicare tax for high earners.",
  keywords: "medicare tax calculator, medicare tax 1.45%, how much medicare tax, medicare withheld from paycheck",
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Medicare Tax Calculator (1.45%) | $1,800 Gross = $26.10",
    description:
      "Calculate employee Medicare tax at 1.45%. $1,800 gross pay has $26.10 withheld. Includes the 0.9% additional Medicare tax for high earners.",
    url: PAGE_PATH,
  },
}

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Medicare Tax Calculator",
  url: "https://www.taxsal.com/calculators/medicare-tax-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  description: "Calculate employee Medicare tax at 1.45%. $1,800 gross = $26.10 withheld.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
}

export default function MedicareTaxCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <FAQSchema faqs={MEDICARE_FAQS} />
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Medicare Tax Calculator (1.45%)</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              $1,800 gross pay × 1.45% = $26.10 Medicare tax withheld.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Employee <strong>Medicare tax is 1.45%</strong> of gross wages, with no income cap. On an{" "}
              <strong>$1,800 paycheck, Medicare withholding is $26.10</strong> ($1,800 × 0.0145). Use the calculator to
              find the deduction for any gross amount. High earners also pay an extra 0.9% once calendar-year wages pass
              $200,000 (single) or $250,000 (married filing jointly).
            </p>
          </div>

          <MedicareTaxCalculator defaultGross={1800} />

          <Card className="mt-12">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">How Medicare tax is calculated</h2>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                Medicare withholding = gross pay × 1.45%. The same rate applies to every paycheck; unlike Social
                Security, there is no wage base. Example: if gross pay is $1,800 this pay period, Medicare tax deducted
                is $1,800 × 1.45% = $26.10. Employers also pay a matching 1.45%, but that employer share is not taken
                from the employee paycheck.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Formulas used</h2>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <div className="space-y-3">
                <p>
                  <strong>Base Medicare:</strong> Gross pay × 1.45%
                </p>
                <p>
                  <strong>Additional Medicare:</strong> max(0, annual wages − $200,000 single / $250,000 married) × 0.9%
                </p>
                <p>
                  <strong>Example:</strong> $1,800 × 1.45% = $26.10
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {MEDICARE_FAQS.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/calculators/payroll-tax-calculator" className="text-primary hover:underline">
                  Payroll Tax Calculator
                </Link>
                <Link href="/calculators/federal-tax-calculator" className="text-primary hover:underline">
                  Federal Tax Calculator
                </Link>
                <Link href="/calculators/take-home-pay-calculator" className="text-primary hover:underline">
                  Take-Home Pay Calculator
                </Link>
                <Link href="/calculators/biweekly-to-annual-calculator" className="text-primary hover:underline">
                  Biweekly to Annual Calculator
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
