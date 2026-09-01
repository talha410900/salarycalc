import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BiweeklyToAnnualCalculator } from "@/components/calculators/biweekly-to-annual-calculator"
import { FAQSchema } from "@/components/faq-schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { formatCurrency } from "@/lib/format"
import {
  BIWEEKLY_SEO_AMOUNTS,
  formatUsdWhole,
  getBiweeklyAmountDescription,
  getBiweeklyAmountFaqs,
  getBiweeklyAmountPath,
  getBiweeklyAmountTitle,
  getBiweeklyBreakdown,
  getRelatedBiweeklyAmounts,
  parseBiweeklyAmountParam,
} from "@/lib/seo-amount-pages"

interface PageProps {
  params: Promise<{ amount: string }>
}

export function generateStaticParams() {
  return BIWEEKLY_SEO_AMOUNTS.map((amount) => ({ amount: String(amount) }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { amount: amountParam } = await params
  const amount = parseBiweeklyAmountParam(amountParam)

  if (amount === null) {
    return { title: "Biweekly Amount Not Found | TaxSal" }
  }

  const path = getBiweeklyAmountPath(amount)

  return {
    title: getBiweeklyAmountTitle(amount),
    description: getBiweeklyAmountDescription(amount),
    keywords: `${amount} biweekly is how much a year, ${amount} biweekly to annual, if I make ${amount} biweekly`,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: getBiweeklyAmountTitle(amount),
      description: getBiweeklyAmountDescription(amount),
      url: path,
    },
  }
}

export default async function BiweeklyAmountPage({ params }: PageProps) {
  const { amount: amountParam } = await params
  const amount = parseBiweeklyAmountParam(amountParam)

  if (amount === null) {
    notFound()
  }

  const breakdown = getBiweeklyBreakdown(amount)
  const faqs = getBiweeklyAmountFaqs(amount)
  const relatedAmounts = getRelatedBiweeklyAmounts(amount)
  const formattedAmount = formatUsdWhole(amount)
  const formattedAnnual = formatUsdWhole(breakdown.annual)

  return (
    <div className="min-h-screen flex flex-col">
      <FAQSchema faqs={faqs} />
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {formattedAmount} Biweekly Is {formattedAnnual} a Year
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {formattedAmount} × 26 pay periods = {formattedAnnual} annually, or {formatCurrency(breakdown.monthly)}{" "}
              per month.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              <strong>
                {formattedAmount} biweekly is {formattedAnnual} a year.
              </strong>{" "}
              To convert biweekly pay to annual salary, multiply by 26 (52 weeks ÷ 2). {formattedAmount} × 26 ={" "}
              {formattedAnnual}. That is about {formatCurrency(breakdown.monthly)} per month,{" "}
              {formatCurrency(breakdown.weekly)} per week, and {formatCurrency(breakdown.hourly)} per hour on a 40-hour,
              52-week schedule.
            </p>
          </div>

          <BiweeklyToAnnualCalculator defaultAmount={amount} />

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Income breakdown for {formattedAmount} biweekly</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border p-4">
                  <dt className="text-sm text-muted-foreground">Annual salary</dt>
                  <dd className="text-2xl font-bold text-primary">{formattedAnnual}</dd>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <dt className="text-sm text-muted-foreground">Monthly equivalent</dt>
                  <dd className="text-2xl font-bold text-foreground">{formatCurrency(breakdown.monthly)}</dd>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <dt className="text-sm text-muted-foreground">Weekly equivalent</dt>
                  <dd className="text-2xl font-bold text-foreground">{formatCurrency(breakdown.weekly)}</dd>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <dt className="text-sm text-muted-foreground">Hourly (40 hrs/week)</dt>
                  <dd className="text-2xl font-bold text-foreground">{formatCurrency(breakdown.hourly)}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>How this conversion works</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                Biweekly pay is every two weeks, so there are 26 paychecks in a year. Annual salary = biweekly pay × 26.
                For {formattedAmount}: {formattedAmount} × 26 = {formattedAnnual}. Monthly is annual ÷ 12 (
                {formatCurrency(breakdown.monthly)}). This is gross pay before taxes. Use the take-home pay calculator
                to estimate net pay after federal tax, Social Security, and Medicare.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
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
              <CardTitle>Other biweekly amounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedAmounts.map((relatedAmount) => {
                  const related = getBiweeklyBreakdown(relatedAmount)
                  return (
                    <Link
                      key={relatedAmount}
                      href={getBiweeklyAmountPath(relatedAmount)}
                      className="text-primary hover:underline"
                    >
                      {formatUsdWhole(relatedAmount)} biweekly is {formatUsdWhole(related.annual)} a year
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Related Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/calculators/biweekly-to-annual-calculator" className="text-primary hover:underline">
                  Biweekly to Annual Calculator
                </Link>
                <Link href="/calculators/take-home-pay-calculator" className="text-primary hover:underline">
                  Take-Home Pay Calculator
                </Link>
                <Link href="/calculators/federal-tax-calculator" className="text-primary hover:underline">
                  Federal Tax Calculator
                </Link>
                <Link href="/calculators/medicare-tax-calculator" className="text-primary hover:underline">
                  Medicare Tax Calculator
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
