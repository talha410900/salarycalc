"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DollarSign, Info, AlertCircle, Landmark } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import {
  calculateFederalTax,
  calculateSocialSecurity,
  calculateMedicare,
  convertToPayPeriod,
  STANDARD_DEDUCTIONS_2025,
} from "@/lib/tax"

interface Results {
  federalTax: number
  socialSecurity: number
  medicare: number
  totalDeductions: number
  netPay: number
  effectiveTaxRate: number
}

export function FederalTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState("")
  const [filingStatus, setFilingStatus] = useState<"single" | "married">("single")
  const [payPeriod, setPayPeriod] = useState<"weekly" | "biweekly" | "monthly">("monthly")
  const [result, setResult] = useState<Results | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback(() => {
    const gross = Number.parseFloat(grossIncome)

    if (!grossIncome) {
      setResult(null)
      setError(null)
      return
    }

    if (isNaN(gross) || gross <= 0) {
      setError("Please enter a valid gross income greater than 0")
      setResult(null)
      return
    }

    // Convert to annual for calculations
    let annualGross = gross
    if (payPeriod === "weekly") annualGross = gross * 52
    else if (payPeriod === "biweekly") annualGross = gross * 26
    else if (payPeriod === "monthly") annualGross = gross * 12

    const annualFederalTax = calculateFederalTax(annualGross, filingStatus)
    const annualSocialSecurity = calculateSocialSecurity(annualGross)
    const annualMedicare = calculateMedicare(annualGross)

    const federalTax = convertToPayPeriod(annualFederalTax, payPeriod)
    const socialSecurity = convertToPayPeriod(annualSocialSecurity, payPeriod)
    const medicare = convertToPayPeriod(annualMedicare, payPeriod)
    const totalDeductions = federalTax + socialSecurity + medicare
    const netPay = gross - totalDeductions
    const effectiveTaxRate = (totalDeductions / gross) * 100

    setError(null)
    setResult({
      federalTax,
      socialSecurity,
      medicare,
      totalDeductions,
      netPay,
      effectiveTaxRate,
    })
  }, [grossIncome, filingStatus, payPeriod])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border-border">
        <CardHeader className="border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Landmark className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-card-foreground">Federal Tax Withholding Calculator</CardTitle>
              <CardDescription>Estimate your federal taxes, Social Security, and Medicare</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="grossIncome" className="text-foreground">
                Gross Pay
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="grossIncome"
                  type="number"
                  step="100"
                  min="0"
                  placeholder="5000"
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filingStatus" className="text-foreground">
                Filing Status
              </Label>
              <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as "single" | "married")}>
                <SelectTrigger id="filingStatus" className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married Filing Jointly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payPeriod" className="text-foreground">
                Pay Period
              </Label>
              <Select value={payPeriod} onValueChange={(v) => setPayPeriod(v as "weekly" | "biweekly" | "monthly")}>
                <SelectTrigger id="payPeriod" className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary/50 text-sm text-muted-foreground">
            <p>
              Standard deduction applied: {formatCurrency(STANDARD_DEDUCTIONS_2025[filingStatus])} ({filingStatus})
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-lg border-primary/20 bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Tax Withholding Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Federal Tax</p>
                <p className="text-xl font-bold text-destructive">{formatCurrency(result.federalTax)}</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Social Security (6.2%)</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(result.socialSecurity)}</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Medicare (1.45%)</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(result.medicare)}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Total Deductions</p>
                <p className="text-xl font-bold text-destructive">{formatCurrency(result.totalDeductions)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Effective rate: {result.effectiveTaxRate.toFixed(1)}%
                </p>
              </div>
              <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Net Take-Home Pay</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(result.netPay)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-secondary/50 font-mono text-sm text-foreground space-y-2">
            <p>1. Annualize your gross pay based on pay period</p>
            <p>2. Apply standard deduction to get taxable income</p>
            <p>3. Calculate federal tax using 2025 progressive brackets</p>
            <p>4. Social Security = Gross × 6.2% (up to wage base)</p>
            <p>5. Medicare = Gross × 1.45%</p>
            <p>6. Convert annual taxes back to your pay period</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Example Calculation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="font-medium text-foreground mb-2">Monthly gross pay of $5,000 (Single):</p>
            <div className="space-y-1 text-muted-foreground text-sm">
              <p>Annual gross: $5,000 × 12 = $60,000</p>
              <p>Taxable income: $60,000 - $15,000 = $45,000</p>
              <p>Federal tax (annual): ~$4,740 → Monthly: ~$395</p>
              <p>Social Security: $5,000 × 6.2% = $310</p>
              <p>Medicare: $5,000 × 1.45% = $72.50</p>
              <p className="font-bold text-primary pt-2">Net pay: ~$4,222.50</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-foreground">Is this exact or an estimate?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                This is a simplified estimate using 2025 tax brackets and standard deductions. Your actual withholding
                may vary based on W-4 elections, additional deductions, and state/local taxes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-foreground">What about state taxes?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                This calculator only includes federal taxes. Use our state-specific calculators for Arizona, New York,
                or North Carolina taxes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
