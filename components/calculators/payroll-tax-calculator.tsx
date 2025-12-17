"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Calculator } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { ALL_STATES } from "@/lib/state-tax-data"

const FEDERAL_BRACKETS_2025 = {
  single: [
    { rate: 0.10, up_to: 11925 },
    { rate: 0.12, up_to: 48475 },
    { rate: 0.22, up_to: 103350 },
    { rate: 0.24, up_to: 197300 },
    { rate: 0.32, up_to: 250525 },
    { rate: 0.35, up_to: 626350 },
    { rate: 0.37, up_to: Infinity },
  ],
  married_joint: [
    { rate: 0.10, up_to: 23850 },
    { rate: 0.12, up_to: 96950 },
    { rate: 0.22, up_to: 206700 },
    { rate: 0.24, up_to: 394600 },
    { rate: 0.32, up_to: 501050 },
    { rate: 0.35, up_to: 751600 },
    { rate: 0.37, up_to: Infinity },
  ],
  head_household: [
    { rate: 0.10, up_to: 17050 },
    { rate: 0.12, up_to: 64850 },
    { rate: 0.22, up_to: 103350 },
    { rate: 0.24, up_to: 197300 },
    { rate: 0.32, up_to: 250525 },
    { rate: 0.35, up_to: 626350 },
    { rate: 0.37, up_to: Infinity },
  ],
}

const STANDARD_DEDUCTIONS_2025 = {
  single: 15750,
  married_joint: 31500,
  head_household: 23625,
}

const SOCIAL_SECURITY_RATE = 0.062
const SOCIAL_SECURITY_WAGE_BASE = 176100
const MEDICARE_RATE = 0.0145
const ADDITIONAL_MEDICARE_RATE = 0.009
const ADDITIONAL_MEDICARE_THRESHOLD = {
  single: 200000,
  married_joint: 250000,
}

function calculateFederalTax(annualIncome: number, filingStatus: string): number {
  const deduction = STANDARD_DEDUCTIONS_2025[filingStatus as keyof typeof STANDARD_DEDUCTIONS_2025] || 15750
  const taxableIncome = Math.max(0, annualIncome - deduction)
  const brackets = FEDERAL_BRACKETS_20252026[filingStatus as keyof typeof FEDERAL_BRACKETS_2025] || FEDERAL_BRACKETS_20252026.single

  let tax = 0
  let remainingIncome = taxableIncome

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i]
    const prevThreshold = i === 0 ? 0 : brackets[i - 1].up_to
    const bracketSize = Math.min(bracket.up_to - prevThreshold, remainingIncome)
    
    if (bracketSize <= 0) break
    
    tax += bracketSize * bracket.rate
    remainingIncome -= bracketSize
    
    if (remainingIncome <= 0) break
  }

  return tax
}

function calculateFICA(annualIncome: number, filingStatus: string): { socialSecurity: number; medicare: number } {
  // Social Security (capped at wage base)
  const socialSecurityTaxable = Math.min(annualIncome, SOCIAL_SECURITY_WAGE_BASE)
  const socialSecurity = socialSecurityTaxable * SOCIAL_SECURITY_RATE

  // Medicare
  const threshold = ADDITIONAL_MEDICARE_THRESHOLD[filingStatus as keyof typeof ADDITIONAL_MEDICARE_THRESHOLD] || 200000
  let medicare = annualIncome * MEDICARE_RATE
  
  // Additional Medicare for high earners
  if (annualIncome > threshold) {
    const additionalMedicareTaxable = annualIncome - threshold
    medicare += additionalMedicareTaxable * ADDITIONAL_MEDICARE_RATE
  }

  return { socialSecurity, medicare }
}

export function PayrollTaxCalculator() {
  const [grossPay, setGrossPay] = useState("")
  const [payPeriod, setPayPeriod] = useState<"Annually" | "Monthly" | "Bi-weekly" | "Weekly">("Annually")
  const [filingStatus, setFilingStatus] = useState<"Single" | "Married Filing Jointly" | "Head of Household">("Single")
  const [state, setState] = useState("Federal Only")
  const [result, setResult] = useState<{
    federalTax: number
    socialSecurity: number
    medicare: number
    stateTax: number
    netPay: number
  } | null>(null)

  const calculate = useCallback(() => {
    const gross = Number.parseFloat(grossPay)
    if (!grossPay || isNaN(gross) || gross <= 0) {
      setResult(null)
      return
    }

    // Convert to annual
    let annualGross = gross
    if (payPeriod === "Weekly") annualGross = gross * 52
    else if (payPeriod === "Bi-weekly") annualGross = gross * 26
    else if (payPeriod === "Monthly") annualGross = gross * 12

    // Calculate taxes
    const filingStatusKey = filingStatus === "Married Filing Jointly" ? "married_joint" : filingStatus === "Head of Household" ? "head_household" : "single"
    const federalTax = calculateFederalTax(annualGross, filingStatusKey)
    const { socialSecurity, medicare } = calculateFICA(annualGross, filingStatusKey)

    // State tax (simplified - would need full state tax calculation)
    let stateTax = 0
    if (state !== "Federal Only") {
      // This is a placeholder - would need full state tax calculation
      const stateData = ALL_STATES.find(s => s.name === state)
      if (stateData && stateData.type !== "None") {
        // Simplified state tax calculation
        stateTax = annualGross * (stateData.rate || 0.05)
      }
    }

    // Convert back to pay period
    const periodMultiplier = payPeriod === "Weekly" ? 52 : payPeriod === "Bi-weekly" ? 26 : payPeriod === "Monthly" ? 12 : 1
    const netPay = gross - (federalTax + socialSecurity + medicare + stateTax) / periodMultiplier

    setResult({
      federalTax: federalTax / periodMultiplier,
      socialSecurity: socialSecurity / periodMultiplier,
      medicare: medicare / periodMultiplier,
      stateTax: stateTax / periodMultiplier,
      netPay,
    })
  }, [grossPay, payPeriod, filingStatus, state])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Payroll Tax Calculator (2025-2026)
          </CardTitle>
          <CardDescription>
            Calculate net pay by deducting Federal Tax, Social Security, and Medicare from gross wages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="gross-pay">Gross Pay</Label>
              <Input
                id="gross-pay"
                type="number"
                placeholder="0.00"
                value={grossPay}
                onChange={(e) => setGrossPay(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pay-period">Pay Period</Label>
              <Select value={payPeriod} onValueChange={(v) => setPayPeriod(v as any)}>
                <SelectTrigger id="pay-period">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Annually">Annually</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="filing-status">Filing Status</Label>
              <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as any)}>
                <SelectTrigger id="filing-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married Filing Jointly">Married Filing Jointly</SelectItem>
                  <SelectItem value="Head of Household">Head of Household</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State (Optional)</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger id="state">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Federal Only">Federal Only</SelectItem>
                  {ALL_STATES.map((s) => (
                    <SelectItem key={s.slug} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Federal Income Tax:</span>
              <span className="font-semibold">{formatCurrency(result.federalTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Social Security Tax:</span>
              <span className="font-semibold">{formatCurrency(result.socialSecurity)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Medicare Tax:</span>
              <span className="font-semibold">{formatCurrency(result.medicare)}</span>
            </div>
            {state !== "Federal Only" && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">State Tax:</span>
                <span className="font-semibold">{formatCurrency(result.stateTax)}</span>
              </div>
            )}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Net Pay:</span>
                <span className="font-bold text-primary">{formatCurrency(result.netPay)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This calculator uses 2025-2026 tax brackets and rates. Results are estimates and should not be considered tax advice.
          Consult a tax professional for specific situations.
        </AlertDescription>
      </Alert>
    </div>
  )
}

