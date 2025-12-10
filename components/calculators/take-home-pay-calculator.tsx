"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Wallet, DollarSign, Info, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { calculateFederalTax, calculateSocialSecurity, calculateMedicare } from "@/lib/tax"

interface Deductions {
  federalTax: boolean
  stateTax: boolean
  socialSecurity: boolean
  medicare: boolean
}

interface Results {
  grossPay: number
  federalTax: number
  stateTax: number
  socialSecurity: number
  medicare: number
  totalDeductions: number
  netPay: number
}

export function TakeHomePayCalculator() {
  const [grossSalary, setGrossSalary] = useState("")
  const [payPeriod, setPayPeriod] = useState<"weekly" | "biweekly" | "monthly" | "annual">("annual")
  const [filingStatus, setFilingStatus] = useState<"single" | "married">("single")
  const [stateTaxRate, setStateTaxRate] = useState("5")
  const [deductions, setDeductions] = useState<Deductions>({
    federalTax: true,
    stateTax: true,
    socialSecurity: true,
    medicare: true,
  })
  const [result, setResult] = useState<Results | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback(() => {
    const gross = Number.parseFloat(grossSalary)
    const stateRate = Number.parseFloat(stateTaxRate) / 100

    if (!grossSalary) {
      setResult(null)
      setError(null)
      return
    }

    if (isNaN(gross) || gross <= 0) {
      setError("Please enter a valid gross salary greater than 0")
      setResult(null)
      return
    }

    // Convert to annual
    let annualGross = gross
    if (payPeriod === "weekly") annualGross = gross * 52
    else if (payPeriod === "biweekly") annualGross = gross * 26
    else if (payPeriod === "monthly") annualGross = gross * 12

    // Calculate annual deductions
    const annualFederalTax = deductions.federalTax ? calculateFederalTax(annualGross, filingStatus) : 0
    const annualStateTax = deductions.stateTax ? annualGross * stateRate : 0
    const annualSocialSecurity = deductions.socialSecurity ? calculateSocialSecurity(annualGross) : 0
    const annualMedicare = deductions.medicare ? calculateMedicare(annualGross) : 0

    // Convert back to pay period
    const periodMultiplier =
      payPeriod === "weekly" ? 52 : payPeriod === "biweekly" ? 26 : payPeriod === "monthly" ? 12 : 1

    const federalTax = annualFederalTax / periodMultiplier
    const stateTax = annualStateTax / periodMultiplier
    const socialSecurity = annualSocialSecurity / periodMultiplier
    const medicare = annualMedicare / periodMultiplier
    const totalDeductions = federalTax + stateTax + socialSecurity + medicare
    const netPay = gross - totalDeductions

    setError(null)
    setResult({
      grossPay: gross,
      federalTax,
      stateTax,
      socialSecurity,
      medicare,
      totalDeductions,
      netPay,
    })
  }, [grossSalary, payPeriod, filingStatus, stateTaxRate, deductions])

  useEffect(() => {
    calculate()
  }, [calculate])

  const toggleDeduction = (key: keyof Deductions) => {
    setDeductions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border-border">
        <CardHeader className="border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-card-foreground">Take-Home Pay Calculator</CardTitle>
              <CardDescription>Calculate your net pay after all deductions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="grossSalary" className="text-foreground">
                Gross Salary ($)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="grossSalary"
                  type="number"
                  step="1000"
                  min="0"
                  placeholder="60000"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payPeriod" className="text-foreground">
                Pay Period
              </Label>
              <Select value={payPeriod} onValueChange={(v) => setPayPeriod(v as typeof payPeriod)}>
                <SelectTrigger id="payPeriod" className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="stateTaxRate" className="text-foreground">
                State Tax Rate (%)
              </Label>
              <Input
                id="stateTaxRate"
                type="number"
                step="0.1"
                min="0"
                max="15"
                placeholder="5"
                value={stateTaxRate}
                onChange={(e) => setStateTaxRate(e.target.value)}
                className="h-12 text-lg"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-foreground">Select Deductions</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="federalTax"
                  checked={deductions.federalTax}
                  onCheckedChange={() => toggleDeduction("federalTax")}
                />
                <Label htmlFor="federalTax" className="text-sm text-muted-foreground cursor-pointer">
                  Federal Tax
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stateTax"
                  checked={deductions.stateTax}
                  onCheckedChange={() => toggleDeduction("stateTax")}
                />
                <Label htmlFor="stateTax" className="text-sm text-muted-foreground cursor-pointer">
                  State Tax
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="socialSecurity"
                  checked={deductions.socialSecurity}
                  onCheckedChange={() => toggleDeduction("socialSecurity")}
                />
                <Label htmlFor="socialSecurity" className="text-sm text-muted-foreground cursor-pointer">
                  Social Security
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="medicare"
                  checked={deductions.medicare}
                  onCheckedChange={() => toggleDeduction("medicare")}
                />
                <Label htmlFor="medicare" className="text-sm text-muted-foreground cursor-pointer">
                  Medicare
                </Label>
              </div>
            </div>
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
              Pay Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {deductions.federalTax && (
                <div className="text-center p-3 rounded-xl bg-card border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Federal Tax</p>
                  <p className="text-lg font-bold text-destructive">-{formatCurrency(result.federalTax)}</p>
                </div>
              )}
              {deductions.stateTax && (
                <div className="text-center p-3 rounded-xl bg-card border border-border">
                  <p className="text-xs text-muted-foreground mb-1">State Tax</p>
                  <p className="text-lg font-bold text-destructive">-{formatCurrency(result.stateTax)}</p>
                </div>
              )}
              {deductions.socialSecurity && (
                <div className="text-center p-3 rounded-xl bg-card border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Social Security</p>
                  <p className="text-lg font-bold text-destructive">-{formatCurrency(result.socialSecurity)}</p>
                </div>
              )}
              {deductions.medicare && (
                <div className="text-center p-3 rounded-xl bg-card border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Medicare</p>
                  <p className="text-lg font-bold text-destructive">-{formatCurrency(result.medicare)}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Gross Pay</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(result.grossPay)}</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Total Deductions</p>
                <p className="text-xl font-bold text-destructive">-{formatCurrency(result.totalDeductions)}</p>
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
            <p>Net Pay = Gross Pay − Federal Tax − State Tax − Social Security − Medicare</p>
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
              <AccordionTrigger className="text-foreground">What other deductions might I have?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                This calculator includes the most common deductions. You may also have 401(k) contributions, health
                insurance premiums, HSA contributions, and other pre-tax deductions that reduce your take-home pay.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-foreground">How do I know my state tax rate?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                State tax rates vary. Some states like Texas and Florida have no income tax (0%). Others range from 2%
                to over 10%. Use our state-specific calculators for more accurate estimates.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
