"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, MapPin } from "lucide-react"
import { formatCurrency } from "@/lib/format"

// Calculate Texas paycheck (no state tax)
export function TexasPaycheckCalculator() {
  const [grossPay, setGrossPay] = useState("")
  const [filingStatus, setFilingStatus] = useState<"Single" | "Married Filing Jointly">("Single")
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

    // Use annual for calculations
    const annualGross = gross

    // Federal tax brackets 2025-2026
    const STANDARD_DEDUCTIONS = {
      Single: 15750,
      "Married Filing Jointly": 31500,
    }

    const FEDERAL_BRACKETS = {
      Single: [
        { rate: 0.10, up_to: 11925 },
        { rate: 0.12, up_to: 48475 },
        { rate: 0.22, up_to: 103350 },
        { rate: 0.24, up_to: 197300 },
        { rate: 0.32, up_to: 250525 },
        { rate: 0.35, up_to: 626350 },
        { rate: 0.37, up_to: Infinity },
      ],
      "Married Filing Jointly": [
        { rate: 0.10, up_to: 23850 },
        { rate: 0.12, up_to: 96950 },
        { rate: 0.22, up_to: 206700 },
        { rate: 0.24, up_to: 394600 },
        { rate: 0.32, up_to: 501050 },
        { rate: 0.35, up_to: 751600 },
        { rate: 0.37, up_to: Infinity },
      ],
    }

    const deduction = STANDARD_DEDUCTIONS[filingStatus]
    const taxableIncome = Math.max(0, annualGross - deduction)
    const brackets = FEDERAL_BRACKETS[filingStatus]

    let federalTax = 0
    let remainingIncome = taxableIncome

    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i]
      const prevThreshold = i === 0 ? 0 : brackets[i - 1].up_to
      const bracketSize = Math.min(bracket.up_to - prevThreshold, remainingIncome)
      
      if (bracketSize <= 0) break
      
      federalTax += bracketSize * bracket.rate
      remainingIncome -= bracketSize
      
      if (remainingIncome <= 0) break
    }

    // FICA taxes
    const SOCIAL_SECURITY_RATE = 0.062
    const SOCIAL_SECURITY_WAGE_BASE = 176100
    const MEDICARE_RATE = 0.0145
    const ADDITIONAL_MEDICARE_RATE = 0.009
    const ADDITIONAL_MEDICARE_THRESHOLD = {
      Single: 200000,
      "Married Filing Jointly": 250000,
    }

    const socialSecurityTaxable = Math.min(annualGross, SOCIAL_SECURITY_WAGE_BASE)
    const socialSecurity = socialSecurityTaxable * SOCIAL_SECURITY_RATE

    const threshold = ADDITIONAL_MEDICARE_THRESHOLD[filingStatus]
    let medicare = annualGross * MEDICARE_RATE
    if (annualGross > threshold) {
      const additionalMedicareTaxable = annualGross - threshold
      medicare += additionalMedicareTaxable * ADDITIONAL_MEDICARE_RATE
    }

    // Texas has no state income tax
    const stateTax = 0
    const netPay = gross - (federalTax + socialSecurity + medicare) / 1

    setResult({
      federalTax: federalTax / 1,
      socialSecurity: socialSecurity / 1,
      medicare: medicare / 1,
      stateTax: 0,
      netPay,
    })
  }, [grossPay, filingStatus])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Texas Paycheck Calculator (No State Tax)
          </CardTitle>
          <CardDescription>
            Calculate take-home pay for Texas residents (Federal taxes only, no state income tax).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="gross-pay">Gross Pay (Annual)</Label>
              <Input
                id="gross-pay"
                type="number"
                placeholder="0.00"
                value={grossPay}
                onChange={(e) => setGrossPay(e.target.value)}
              />
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
              <span className="text-muted-foreground">Federal Tax:</span>
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
            <div className="flex justify-between">
              <span className="text-muted-foreground">State Tax:</span>
              <span className="font-semibold text-green-600">$0.00 (No State Tax)</span>
            </div>
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
          Texas has no state income tax. This calculator shows federal taxes only. Results are estimates for 2025-2026 tax year.
        </AlertDescription>
      </Alert>
    </div>
  )
}

