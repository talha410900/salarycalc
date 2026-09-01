import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BiweeklyToAnnualCalculator } from "@/components/calculators/biweekly-to-annual-calculator"
import { BiweeklyConversionTable } from "@/components/calculators/biweekly-conversion-table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSchema } from "@/components/faq-schema"
import Link from "next/link"
import type { Metadata } from "next"
import { BIWEEKLY_HUB_FAQS } from "@/lib/seo-amount-pages"

const PAGE_PATH = "/calculators/biweekly-to-annual-calculator"

export const metadata: Metadata = {
  title: "Biweekly to Annual Salary Calculator | $2,000 Biweekly Is $52,000 a Year",
  description:
    "Multiply biweekly pay by 26. $2,000 biweekly is $52,000 a year ($4,333.33/month). Convert any biweekly paycheck to annual salary.",
  keywords:
    "biweekly to annual calculator, 2000 biweekly is how much a year, biweekly to annual salary, convert biweekly to annual, biweekly salary calculator",
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Biweekly to Annual Salary Calculator | $2,000 Biweekly Is $52,000 a Year",
    description:
      "Multiply biweekly pay by 26. $2,000 biweekly is $52,000 a year ($4,333.33/month). Convert any biweekly paycheck to annual salary.",
    url: PAGE_PATH,
  },
}

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Biweekly to Annual Salary Calculator",
  url: "https://www.taxsal.com/calculators/biweekly-to-annual-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  description: "Convert biweekly pay to annual salary. $2,000 biweekly is $52,000 a year.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: "Biweekly to annual conversion, monthly equivalent, common paycheck table",
}

export default function BiweeklyToAnnualPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <FAQSchema faqs={BIWEEKLY_HUB_FAQS} />
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Biweekly to Annual Salary Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Multiply biweekly pay by 26. $2,000 biweekly is $52,000 a year.
            </p>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              To convert <strong>biweekly pay to annual salary</strong>, multiply by 26 (the number of two-week pay
              periods in a year). <strong>$2,000 biweekly is $52,000 a year</strong> ($2,000 × 26), or about $4,333.33
              per month. Use the calculator below for any paycheck amount, or pick a common amount from the conversion
              table.
            </p>
          </div>

          <BiweeklyToAnnualCalculator defaultAmount={2000} />

          <Card className="mt-12">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">How the Biweekly to Annual Calculator Works</h2>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                Annual salary = biweekly paycheck × 26. For example, $2,000 × 26 = $52,000. Monthly equivalent is annual
                ÷ 12 ($4,333.33). Weekly is biweekly ÷ 2. Semi-monthly pay (twice per month) uses 24 periods, not 26 —
                that is a different schedule.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Biweekly to annual conversion table</h2>
            </CardHeader>
            <CardContent>
              <BiweeklyConversionTable />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {BIWEEKLY_HUB_FAQS.map((faq, index) => (
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
                <Link href="/calculators/monthly-to-yearly-calculator" className="text-primary hover:underline">
                  Monthly to Yearly Calculator
                </Link>
                <Link href="/calculators/hourly-to-salary-calculator" className="text-primary hover:underline">
                  Hourly to Salary Calculator
                </Link>
                <Link href="/calculators/take-home-pay-calculator" className="text-primary hover:underline">
                  Take-Home Pay Calculator
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
