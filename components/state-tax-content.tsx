import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQSchema } from "@/components/faq-schema"
import { STATE_TAX_DATA } from "@/lib/state-tax-data"
import {
  STATE_TAX_AGENCIES,
  TAX_DATA_LAST_REVIEWED,
  getStateNarrative,
  getStateFAQs,
  getExampleRows,
  getNeighborComparisons,
} from "@/lib/state-content"

interface StateTaxContentProps {
  stateSlug: string
}

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export function StateTaxContent({ stateSlug }: StateTaxContentProps) {
  const data = STATE_TAX_DATA[stateSlug]
  if (!data) return null

  const narrative = getStateNarrative(stateSlug)
  const faqs = getStateFAQs(stateSlug)
  const examples = getExampleRows(stateSlug)
  const neighbors = getNeighborComparisons(stateSlug)
  const agency = STATE_TAX_AGENCIES[stateSlug]
  const brackets = data.type === "Graduated" ? data.brackets : undefined

  return (
    <section className="container mx-auto px-4 pb-12 space-y-6 max-w-4xl">
      <FAQSchema faqs={faqs} />

      {/* State-specific overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">
            How Income Tax Works in {data.name} (2025-2026)
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-3">
          {narrative.map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>

      {/* Bracket table for graduated states */}
      {brackets && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {data.name} Income Tax Brackets 2025-2026
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {([
                ["Single Filers", brackets.single],
                ["Married Filing Jointly", brackets.married_joint],
              ] as const).map(([label, rows]) => (
                <div key={label}>
                  <h3 className="text-sm font-semibold mb-2">{label}</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="py-1.5 font-medium">Taxable Income Over</th>
                        <th className="py-1.5 font-medium text-right">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((bracket, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-1.5">{usd(bracket.threshold)}</td>
                          <td className="py-1.5 text-right">
                            {(bracket.rate * 100).toFixed(2).replace(/\.?0+$/, "")}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Worked examples */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            Example Take-Home Pay in {data.name} (Single Filer)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="py-1.5 font-medium">Salary</th>
                  <th className="py-1.5 font-medium text-right">{data.code} State Tax</th>
                  <th className="py-1.5 font-medium text-right">Federal Tax</th>
                  <th className="py-1.5 font-medium text-right">FICA</th>
                  <th className="py-1.5 font-medium text-right">Take-Home</th>
                </tr>
              </thead>
              <tbody>
                {examples.map((row) => (
                  <tr key={row.salary} className="border-b last:border-0">
                    <td className="py-1.5 font-medium">{usd(row.salary)}</td>
                    <td className="py-1.5 text-right">
                      {usd(row.stateTax)}
                      <span className="text-muted-foreground text-xs">
                        {" "}
                        ({row.effectiveStateRate.toFixed(1)}%)
                      </span>
                    </td>
                    <td className="py-1.5 text-right">{usd(row.federalTax)}</td>
                    <td className="py-1.5 text-right">{usd(row.fica)}</td>
                    <td className="py-1.5 text-right font-medium">{usd(row.takeHome)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Estimates for a single filer using 2025-2026 federal brackets, the $15,750 standard
            deduction, and {data.name} state tax rules. State-specific deductions and credits may
            lower your actual bill.
          </p>
        </CardContent>
      </Card>

      {/* Neighbor comparison with internal links */}
      {neighbors.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {data.name} vs. Neighboring States
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="py-1.5 font-medium">State</th>
                  <th className="py-1.5 font-medium">Tax Structure</th>
                  <th className="py-1.5 font-medium text-right">Top Rate</th>
                  <th className="py-1.5 font-medium text-right">State Tax on $75k</th>
                </tr>
              </thead>
              <tbody>
                {neighbors.map((n) => (
                  <tr key={n.slug} className="border-b last:border-0">
                    <td className="py-1.5">
                      <Link
                        href={`/calculators/state/${n.slug}`}
                        className="text-primary hover:underline"
                      >
                        {n.name}
                      </Link>
                    </td>
                    <td className="py-1.5">
                      {n.type === "None" ? "No income tax" : n.type}
                    </td>
                    <td className="py-1.5 text-right">{n.topRate}</td>
                    <td className="py-1.5 text-right">{usd(n.taxOn75k)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* State-specific FAQs */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {data.name} Income Tax FAQs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Sources & freshness */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Sources &amp; Methodology</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Tax rates and brackets on this page reflect the 2025-2026 tax year and were last
            reviewed in {TAX_DATA_LAST_REVIEWED}. Federal figures come from the{" "}
            <a
              href="https://www.irs.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Internal Revenue Service (IRS)
            </a>
            {agency && (
              <>
                ; {data.name} figures come from the{" "}
                <a
                  href={agency.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {agency.name}
                </a>
              </>
            )}
            .
          </p>
          <p>
            These results are estimates for planning purposes and are not tax advice. Consult a
            tax professional or the official sources above before making financial decisions. See
            our <Link href="/disclaimer" className="text-primary hover:underline">disclaimer</Link>{" "}
            and <Link href="/tax-brackets" className="text-primary hover:underline">2025-2026 tax
            brackets reference</Link>.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
