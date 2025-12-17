"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatPercent } from "@/lib/format"
import { calculateStateTax, getEffectiveTaxRate, type StateTaxData } from "@/lib/state-tax-data"
import { calculateFederalTax, calculateSocialSecurity, calculateMedicare } from "@/lib/tax"
import { Building2, DollarSign, TrendingDown, PieChart, Info, ArrowLeft, Calculator } from "lucide-react"
import Link from "next/link"

interface StateCalculatorProps {
  stateSlug: string
  stateData: StateTaxData
}

export function StateCalculator({ stateSlug, stateData }: StateCalculatorProps) {
  const [annualIncome, setAnnualIncome] = useState<string>("75000")
  const [filingStatus, setFilingStatus] = useState<"single" | "married_joint">("single")

  const income = Number.parseFloat(annualIncome) || 0

  const results = useMemo(() => {
    const stateTax = calculateStateTax(stateSlug, income, filingStatus)
    const federalTax = calculateFederalTax(income, filingStatus === "single" ? "single" : "married")
    const socialSecurity = calculateSocialSecurity(income)
    const medicare = calculateMedicare(income)
    const totalTax = stateTax + federalTax + socialSecurity + medicare
    const takeHomePay = income - totalTax
    const effectiveStateRate = getEffectiveTaxRate(stateSlug, income, filingStatus)
    const effectiveTotalRate = income > 0 ? (totalTax / income) * 100 : 0

    return {
      stateTax,
      federalTax,
      socialSecurity,
      medicare,
      totalTax,
      takeHomePay,
      effectiveStateRate,
      effectiveTotalRate,
      monthlyTakeHome: takeHomePay / 12,
      biweeklyTakeHome: takeHomePay / 26,
    }
  }, [income, filingStatus, stateSlug])

  const isNoTaxState = stateData.type === "None"

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/#states"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All States
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
              {stateData.code}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{stateData.name} Tax Calculator</h1>
              <p className="text-muted-foreground text-sm">2025-2026 Tax Year</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant={isNoTaxState ? "default" : "secondary"} className={isNoTaxState ? "bg-emerald-500" : ""}>
              {stateData.type === "None" ? "No Income Tax" : `${stateData.type} Tax`}
            </Badge>
            {stateData.type !== "None" && (
              <Badge variant="outline">
                {stateData.type === "Flat"
                  ? `${((stateData.rate || 0) * 100).toFixed(2)}% Flat Rate`
                  : `${stateData.brackets?.single.length} Tax Brackets`}
              </Badge>
            )}
          </div>

          <p className="text-muted-foreground mt-3 text-sm max-w-2xl">{stateData.notes}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Calculate Your Tax
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="income">Annual Gross Income</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="income"
                      type="number"
                      value={annualIncome}
                      onChange={(e) => setAnnualIncome(e.target.value)}
                      className="pl-10"
                      placeholder="75000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="filing-status">Filing Status</Label>
                  <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as typeof filingStatus)}>
                    <SelectTrigger id="filing-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married_joint">Married Filing Jointly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tax Brackets Card (for graduated states) */}
            {stateData.type === "Graduated" && stateData.brackets && (
              <Card className="mt-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    2025-2026 Tax Brackets ({filingStatus === "single" ? "Single" : "Married"})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {stateData.brackets[filingStatus].map((bracket, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-xs py-1 border-b border-border/50 last:border-0"
                      >
                        <span className="text-muted-foreground">
                          {index === 0
                            ? `$0 - ${formatCurrency(stateData.brackets![filingStatus][index + 1]?.threshold || 0)}`
                            : index === stateData.brackets![filingStatus].length - 1
                              ? `${formatCurrency(bracket.threshold)}+`
                              : `${formatCurrency(bracket.threshold)} - ${formatCurrency(stateData.brackets![filingStatus][index + 1]?.threshold || 0)}`}
                        </span>
                        <span className="font-medium text-foreground">{(bracket.rate * 100).toFixed(2)}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Results */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground font-medium">Annual Take-Home Pay</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(results.takeHomePay)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatCurrency(results.monthlyTakeHome)}/month • {formatCurrency(results.biweeklyTakeHome)}
                    /bi-weekly
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium">{stateData.name} State Tax</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {isNoTaxState ? "$0" : formatCurrency(results.stateTax)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Effective Rate: {isNoTaxState ? "0.00%" : formatPercent(results.effectiveStateRate)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tax Breakdown */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Complete Tax Breakdown
                </CardTitle>
                <CardDescription>Federal, State, and FICA taxes combined</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Gross Annual Income</span>
                    <span className="font-semibold">{formatCurrency(income)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Federal Income Tax</span>
                    <span className="text-destructive">-{formatCurrency(results.federalTax)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">{stateData.name} State Tax</span>
                    <span className={isNoTaxState ? "text-emerald-700 dark:text-emerald-600" : "text-destructive"}>
                      {isNoTaxState ? "$0 (No Tax)" : `-${formatCurrency(results.stateTax)}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Social Security (6.2%)</span>
                    <span className="text-destructive">-{formatCurrency(results.socialSecurity)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Medicare (1.45%)</span>
                    <span className="text-destructive">-{formatCurrency(results.medicare)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t border-border">
                    <span className="text-sm font-medium">Total Tax</span>
                    <span className="font-semibold text-destructive">-{formatCurrency(results.totalTax)}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 bg-primary/5 rounded-lg px-3 -mx-3">
                    <span className="font-semibold">Net Take-Home Pay</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(results.takeHomePay)}</span>
                  </div>

                  <div className="text-center text-xs text-muted-foreground pt-2">
                    Effective Total Tax Rate: {formatPercent(results.effectiveTotalRate)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How It Works Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p className="text-sm leading-relaxed">
                  {stateData.type === "None" ? (
                    <>
                      Since {stateData.name} has no state income tax, the calculator only deducts federal taxes (federal income tax, Social Security, and Medicare) from your gross income. Federal income tax is calculated using 2025-2026 tax brackets and standard deductions. Social Security tax is 6.2% on wages up to $176,100, and Medicare tax is 1.45% on all wages (plus 0.9% additional Medicare for high earners). Your net take-home pay is your gross income minus these federal taxes only.
                    </>
                  ) : stateData.type === "Flat" ? (
                    <>
                      The calculator first calculates your federal taxes using 2025-2026 tax brackets and standard deductions. It then calculates {stateData.name} state tax by applying the flat rate of {((stateData.rate || 0) * 100).toFixed(2)}% to your taxable income. Social Security tax (6.2% on first $176,100) and Medicare tax (1.45% on all wages) are also calculated. Your net take-home pay is your gross income minus federal tax, state tax, Social Security, and Medicare.
                    </>
                  ) : (
                    <>
                      The calculator uses {stateData.name}'s progressive tax brackets to calculate state income tax. Your income is taxed at increasing rates as it passes through each bracket - only the income within each bracket is taxed at that bracket's rate. Federal income tax is calculated separately using 2025-2026 federal brackets and standard deductions. Social Security (6.2% on first $176,100) and Medicare (1.45% on all wages) are also deducted. Your net take-home pay is your gross income minus all these taxes combined.
                    </>
                  )}
                </p>
              </CardContent>
            </Card>

            {/* Formulas Used Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Formulas Used</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <div className="space-y-3 text-sm">
                  {stateData.type === "None" ? (
                    <>
                      <p><strong>Federal Tax:</strong> Taxable Income = Gross Income - Standard Deduction ($15,750 single, $31,500 married). Tax calculated using progressive brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%).</p>
                      <p><strong>Social Security:</strong> Tax = min(Annual Income, $176,100) × 6.2%</p>
                      <p><strong>Medicare:</strong> Base = Annual Income × 1.45%. Additional = max(0, Annual Income - $200,000 single or $250,000 married) × 0.9%</p>
                      <p><strong>State Tax:</strong> $0.00 ({stateData.name} has no state income tax)</p>
                      <p><strong>Net Pay:</strong> Net Pay = Gross Income - Federal Tax - Social Security - Medicare</p>
                    </>
                  ) : stateData.type === "Flat" ? (
                    <>
                      <p><strong>Federal Tax:</strong> Taxable Income = Gross Income - Standard Deduction ($15,750 single, $31,500 married). Tax calculated using progressive brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%).</p>
                      <p><strong>{stateData.name} State Tax:</strong> State Tax = Taxable Income × {((stateData.rate || 0) * 100).toFixed(2)}%</p>
                      <p><strong>Social Security:</strong> Tax = min(Annual Income, $176,100) × 6.2%</p>
                      <p><strong>Medicare:</strong> Base = Annual Income × 1.45%. Additional = max(0, Annual Income - $200,000 single or $250,000 married) × 0.9%</p>
                      <p><strong>Net Pay:</strong> Net Pay = Gross Income - Federal Tax - State Tax - Social Security - Medicare</p>
                    </>
                  ) : (
                    <>
                      <p><strong>Federal Tax:</strong> Taxable Income = Gross Income - Standard Deduction ($15,750 single, $31,500 married). Tax calculated using progressive brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%).</p>
                      <p><strong>{stateData.name} State Tax:</strong> Calculated using progressive brackets. For each bracket: Tax = (Income in Bracket) × Bracket Rate. Total State Tax = Sum of all bracket taxes.</p>
                      <p><strong>Social Security:</strong> Tax = min(Annual Income, $176,100) × 6.2%</p>
                      <p><strong>Medicare:</strong> Base = Annual Income × 1.45%. Additional = max(0, Annual Income - $200,000 single or $250,000 married) × 0.9%</p>
                      <p><strong>Net Pay:</strong> Net Pay = Gross Income - Federal Tax - State Tax - Social Security - Medicare</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm">
                      What type of income tax does {stateData.name} have?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {stateData.type === "None"
                        ? `${stateData.name} does not have a state income tax on wages. ${stateData.notes}`
                        : stateData.type === "Flat"
                          ? `${stateData.name} has a flat income tax rate of ${((stateData.rate || 0) * 100).toFixed(2)}%. ${stateData.notes}`
                          : `${stateData.name} has a graduated income tax system with ${stateData.brackets?.single.length} tax brackets. ${stateData.notes}`}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm">
                      How is {stateData.name} state tax calculated?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {stateData.type === "None"
                        ? `Since ${stateData.name} has no state income tax, you only pay federal taxes and FICA (Social Security and Medicare).`
                        : stateData.type === "Flat"
                          ? `${stateData.name} uses a flat tax rate of ${((stateData.rate || 0) * 100).toFixed(2)}%. Simply multiply your taxable income by this rate to calculate your state tax.`
                          : `${stateData.name} uses progressive tax brackets. Your income is taxed at increasing rates as it passes through each bracket. Only the income within each bracket is taxed at that bracket's rate.`}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-sm">
                      Are there any local taxes in {stateData.name}?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      This calculator shows state-level taxes only. Some cities and counties in {stateData.name} may
                      levy additional local income taxes. Check with your local tax authority for complete information.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-sm">What deductions are included?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      This calculator uses the federal standard deduction for 2025-2026 ($15,000 for single filers, $30,000
                      for married filing jointly). State-specific deductions may vary. Consult a tax professional for
                      personalized advice.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
