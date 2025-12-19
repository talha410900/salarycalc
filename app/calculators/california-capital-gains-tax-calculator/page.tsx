import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CACapitalGainsCalculator } from "@/components/calculators/ca-capital-gains-calculator"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSchema } from "@/components/faq-schema"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "California Capital Gains Tax Calculator 2025-2026 | CA Capital Gains Tax",
  description: "Free California Capital Gains tax calculator for 2025-2026. Calculate CA state tax on capital gains. California taxes capital gains as ordinary income with no special lower rate.",
  keywords: "california capital gains tax calculator, CA capital gains calculator, california tax on gains, capital gains tax california 2025-2026, california capital gains tax",
  openGraph: {
    title: "California Capital Gains Tax Calculator 2025-2026 | CA Capital Gains Tax",
    description: "Free California Capital Gains tax calculator for 2025-2026. Calculate CA state tax on capital gains.",
  },
}

export default function CACapitalGainsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">California Capital Gains Tax Calculator 2025-2026</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculates CA state tax on capital gains (taxed as ordinary income).
            </p>
          </div>

          {/* SEO-focused first paragraph */}
          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Our free <strong>California Capital Gains tax calculator</strong> calculates CA state tax on capital gains for 2025-2026. 
              California taxes all capital gains as ordinary income (1% to 12.3% brackets). Enter total taxable income, capital gain amount, and filing status for instant CA tax calculations. 
              This <strong>California Capital Gains tax calculator</strong> helps you understand how much California state tax you'll owe on your capital gains, whether from stocks, real estate, or other investments.
            </p>
          </div>

          <CACapitalGainsCalculator />

          {/* How the California Capital Gains Tax Calculator Works */}
          <Card className="mt-12">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">How the California Capital Gains Tax Calculator Works</h2>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed mb-4">
                Unlike the federal government, California taxes all capital gains as ordinary income using the state's progressive tax brackets. 
                The <strong>California Capital Gains tax calculator</strong> takes your total taxable income (including capital gains), applies California's 2025-2026 tax brackets (ranging from 1% to 12.3%), and calculates your total California tax. 
                If your taxable income exceeds $1,000,000, it also adds the 1% Mental Health Services Tax surcharge. The effective rate shows what percentage of your total income goes to California taxes.
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Using the California Capital Gains Tax Calculator</h3>
              <p className="leading-relaxed mb-4">
                When using this <strong>California Capital Gains tax calculator</strong>, you'll need to enter your total taxable income, which includes both your regular income and your capital gains. 
                California doesn't distinguish between short-term and long-term capital gains for state tax purposes - both are taxed at your regular income tax rate. 
                This is different from federal tax law, which offers lower rates (0%, 15%, or 20%) for long-term capital gains held for more than one year.
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">California Tax Brackets for Capital Gains</h3>
              <p className="leading-relaxed">
                The calculator uses California's 2025-2026 tax brackets, which range from 1% for the lowest income earners to 12.3% for the highest earners. 
                For single filers, the top bracket of 12.3% applies to taxable income over $721,314. For married couples filing jointly, the top bracket applies to income over $1,442,628. 
                Additionally, if your taxable income exceeds $1,000,000, you'll pay an extra 1% Mental Health Services Tax on the entire amount.
              </p>
            </CardContent>
          </Card>

          {/* Understanding California Capital Gains Tax */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Understanding California Capital Gains Tax</h2>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed mb-4">
                California is one of the few states that taxes capital gains at the same rate as ordinary income, with no preferential treatment for long-term capital gains. 
                This means when you use a <strong>California Capital Gains tax calculator</strong>, you'll see that your capital gains are subject to the same progressive tax rates as your regular income. 
                This can result in significantly higher state taxes on capital gains compared to federal taxes, especially for high-income taxpayers.
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">California vs Federal Capital Gains Tax Rates</h3>
              <p className="leading-relaxed mb-4">
                For example, if you're a single filer with $500,000 in taxable income (including $200,000 in capital gains), your California tax rate would be 9.3% on most of that income. 
                At the federal level, if those were long-term capital gains, you might only pay 15% or 20% on the gains portion. 
                But in California, the entire amount is taxed at your regular income tax rate, which could be as high as 12.3% plus the 1% surcharge for income over $1 million.
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Mental Health Services Tax Surcharge</h3>
              <p className="leading-relaxed">
                The <strong>California Capital Gains tax calculator</strong> accounts for all of these factors, including the Mental Health Services Tax surcharge that applies to high earners. 
                This surcharge adds an additional 1% tax on all taxable income over $1,000,000, which can significantly increase your total California tax liability. 
                For taxpayers with substantial capital gains, this can mean paying effective California tax rates of 13.3% or higher on their gains.
              </p>
            </CardContent>
          </Card>

          {/* Formulas Used Section */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Formulas Used in the California Capital Gains Tax Calculator</h2>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground mb-3">California Tax Calculation Formula</h3>
                <p><strong>California Tax Calculation:</strong> Uses progressive brackets: 1% ($0-$10,756 single), 2% ($10,757-$25,499), 4% ($25,500-$40,245), 6% ($40,246-$55,866), 8% ($55,867-$70,606), 9.3% ($70,607-$360,659), 10.3% ($360,660-$432,787), 11.3% ($432,788-$721,314), 12.3% (above $721,314).</p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Mental Health Services Tax Formula</h3>
                <p><strong>Mental Health Services Tax:</strong> If Taxable Income &gt; $1,000,000, add Taxable Income × 0.01</p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Effective Tax Rate Calculation</h3>
                <p><strong>Effective CA Rate:</strong> Effective Rate = Total CA Tax / Total Taxable Income</p>
                <p className="mt-4">
                  The <strong>California Capital Gains tax calculator</strong> applies these brackets progressively, meaning you pay the lower rate on income in each bracket, and higher rates only apply to income above each threshold. 
                  This progressive system ensures that lower-income taxpayers pay a smaller percentage of their income in taxes, while higher-income taxpayers pay a larger percentage.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Related Calculators</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/calculators/nc-capital-gains" className="text-primary hover:underline">
                  North Carolina Capital Gains Calculator
                </Link>
                <Link href="/calculators/real-estate-capital-gains" className="text-primary hover:underline">
                  Real Estate Capital Gains Calculator
                </Link>
                <Link href="/calculators/rental-property-capital-gains" className="text-primary hover:underline">
                  Rental Property Capital Gains Calculator
                </Link>
                <Link href="/calculators/federal-tax" className="text-primary hover:underline">
                  Federal Tax Calculator
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions About California Capital Gains Tax</h2>
            </CardHeader>
            <CardContent>
              <FAQSchema faqs={[
                {
                  question: 'Why doesn\'t California have a lower capital gains rate?',
                  answer: 'California is one of the few states that taxes capital gains at the same rate as ordinary income, with no preferential treatment for long-term capital gains. This means California residents pay state tax on capital gains at their regular income tax rate, which can be as high as 13.3% (12.3% top bracket + 1% Mental Health Services Tax) for the highest earners, significantly higher than the federal long-term capital gains rates of 0%, 15%, or 20%.',
                },
                {
                  question: 'How does California capital gains tax compare to federal?',
                  answer: 'Federal taxes offer preferential long-term capital gains rates (0%, 15%, or 20% depending on income), while California taxes all capital gains as ordinary income at rates from 1% to 12.3% (plus 1% surcharge for income over $1M). This means California residents often pay significantly more state tax on capital gains than federal tax, especially for high-income taxpayers. You\'ll pay both federal and California taxes on your capital gains.',
                },
                {
                  question: 'What is the Mental Health Services Tax surcharge?',
                  answer: 'The Mental Health Services Tax is a 1% surcharge that applies to all taxable income over $1,000,000 in California. This means if your total taxable income (including capital gains) exceeds $1 million, you\'ll pay an additional 1% tax on the entire amount, not just the amount over $1 million. This can significantly increase your California tax liability on capital gains.',
                },
                {
                  question: 'Does the California Capital Gains tax calculator include federal taxes?',
                  answer: 'No, this calculator only calculates California state tax on capital gains. You\'ll also need to calculate your federal capital gains tax separately. Federal tax rates for long-term capital gains are typically 0%, 15%, or 20% depending on your income level, which is generally lower than California\'s rates.',
                },
              ]} />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="no-preferential-rate">
                  <AccordionTrigger className="text-left font-semibold">Why doesn't California have a lower capital gains rate?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    California is one of the few states that taxes capital gains at the same rate as ordinary income, with no preferential treatment for long-term capital gains. This means California residents pay state tax on capital gains at their regular income tax rate, which can be as high as 13.3% (12.3% top bracket + 1% Mental Health Services Tax) for the highest earners, significantly higher than the federal long-term capital gains rates of 0%, 15%, or 20%.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="federal-vs-state">
                  <AccordionTrigger className="text-left font-semibold">How does California capital gains tax compare to federal?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Federal taxes offer preferential long-term capital gains rates (0%, 15%, or 20% depending on income), while California taxes all capital gains as ordinary income at rates from 1% to 12.3% (plus 1% surcharge for income over $1M). This means California residents often pay significantly more state tax on capital gains than federal tax, especially for high-income taxpayers. You'll pay both federal and California taxes on your capital gains.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="mental-health-tax">
                  <AccordionTrigger className="text-left font-semibold">What is the Mental Health Services Tax surcharge?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    The Mental Health Services Tax is a 1% surcharge that applies to all taxable income over $1,000,000 in California. This means if your total taxable income (including capital gains) exceeds $1 million, you'll pay an additional 1% tax on the entire amount, not just the amount over $1 million. This can significantly increase your California tax liability on capital gains.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="federal-included">
                  <AccordionTrigger className="text-left font-semibold">Does the California Capital Gains tax calculator include federal taxes?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    No, this calculator only calculates California state tax on capital gains. You'll also need to calculate your federal capital gains tax separately. Federal tax rates for long-term capital gains are typically 0%, 15%, or 20% depending on your income level, which is generally lower than California's rates.
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

