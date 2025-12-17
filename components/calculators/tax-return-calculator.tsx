"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Info, Receipt, DollarSign } from "lucide-react"
import { formatCurrency } from "@/lib/format"

const STANDARD_DEDUCTIONS_2025 = {
  single: 15750,
  "married-joint": 31500,
  "married-separate": 15750,
  "head-of-household": 23700,
}

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
  "married-joint": [
    { rate: 0.10, up_to: 23850 },
    { rate: 0.12, up_to: 96950 },
    { rate: 0.22, up_to: 206700 },
    { rate: 0.24, up_to: 394600 },
    { rate: 0.32, up_to: 501050 },
    { rate: 0.35, up_to: 751600 },
    { rate: 0.37, up_to: Infinity },
  ],
  "married-separate": [
    { rate: 0.10, up_to: 11925 },
    { rate: 0.12, up_to: 48475 },
    { rate: 0.22, up_to: 103350 },
    { rate: 0.24, up_to: 197300 },
    { rate: 0.32, up_to: 250525 },
    { rate: 0.35, up_to: 375800 },
    { rate: 0.37, up_to: Infinity },
  ],
  "head-of-household": [
    { rate: 0.10, up_to: 17050 },
    { rate: 0.12, up_to: 72800 },
    { rate: 0.22, up_to: 117450 },
    { rate: 0.24, up_to: 200800 },
    { rate: 0.32, up_to: 250525 },
    { rate: 0.35, up_to: 626350 },
    { rate: 0.37, up_to: Infinity },
  ],
}

function calculateFederalTax(taxableIncome: number, filingStatus: string): number {
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

export function TaxReturnCalculator() {
  const [totalIncome, setTotalIncome] = useState("")
  const [adjustments, setAdjustments] = useState("")
  const [filingStatus, setFilingStatus] = useState("single")
  const [deductionType, setDeductionType] = useState("standard")
  const [itemizedDeductions, setItemizedDeductions] = useState("")
  const [taxWithheld, setTaxWithheld] = useState("")
  const [result, setResult] = useState<{
    agi: number
    deduction: number
    taxableIncome: number
    federalTax: number
    refundOrOwed: number
  } | null>(null)

  const calculate = useCallback(() => {
    const income = Number.parseFloat(totalIncome) || 0
    const adj = Number.parseFloat(adjustments) || 0
    const withheld = Number.parseFloat(taxWithheld) || 0

    if (!totalIncome || isNaN(income) || income <= 0) {
      setResult(null)
      return
    }

    // Calculate AGI (Adjusted Gross Income)
    const agi = Math.max(0, income - adj)

    // Calculate deduction
    let deduction = 0
    if (deductionType === "standard") {
      deduction = STANDARD_DEDUCTIONS_2025[filingStatus as keyof typeof STANDARD_DEDUCTIONS_2025] || STANDARD_DEDUCTIONS_2025.single
    } else {
      deduction = Number.parseFloat(itemizedDeductions) || 0
    }

    // Calculate taxable income
    const taxableIncome = Math.max(0, agi - deduction)

    // Calculate federal income tax
    const federalTax = calculateFederalTax(taxableIncome, filingStatus)

    // Calculate refund or amount owed
    const refundOrOwed = withheld - federalTax

    setResult({
      agi,
      deduction,
      taxableIncome,
      federalTax,
      refundOrOwed,
    })
  }, [totalIncome, adjustments, filingStatus, deductionType, itemizedDeductions, taxWithheld])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Tax Return Calculator & Refund Estimator 2025-2026
          </CardTitle>
          <CardDescription>
            Estimate your tax refund or amount owed by calculating your federal income tax based on your income, deductions, and withholdings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="filing-status">Filing Status</Label>
            <Select value={filingStatus} onValueChange={setFilingStatus}>
              <SelectTrigger id="filing-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married-joint">Married Filing Jointly</SelectItem>
                <SelectItem value="married-separate">Married Filing Separately</SelectItem>
                <SelectItem value="head-of-household">Head of Household</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="total-income">Total Income</Label>
            <Input
              id="total-income"
              type="number"
              placeholder="0.00"
              value={totalIncome}
              onChange={(e) => setTotalIncome(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter your total income from all sources (wages, interest, dividends, etc.).
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adjustments">Adjustments to Income</Label>
            <Input
              id="adjustments"
              type="number"
              placeholder="0.00"
              value={adjustments}
              onChange={(e) => setAdjustments(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter adjustments (IRA contributions, student loan interest, educator expenses, etc.).
            </p>
          </div>

          <div className="space-y-2">
            <Label>Deduction Type</Label>
            <RadioGroup value={deductionType} onValueChange={setDeductionType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="font-normal cursor-pointer">
                  Standard Deduction ({formatCurrency(STANDARD_DEDUCTIONS_2025[filingStatus as keyof typeof STANDARD_DEDUCTIONS_2025] || STANDARD_DEDUCTIONS_2025.single)})
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="itemized" id="itemized" />
                <Label htmlFor="itemized" className="font-normal cursor-pointer">
                  Itemized Deductions
                </Label>
              </div>
            </RadioGroup>
          </div>

          {deductionType === "itemized" && (
            <div className="space-y-2">
              <Label htmlFor="itemized-deductions">Itemized Deductions</Label>
              <Input
                id="itemized-deductions"
                type="number"
                placeholder="0.00"
                value={itemizedDeductions}
                onChange={(e) => setItemizedDeductions(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter your total itemized deductions (mortgage interest, state/local taxes, charitable contributions, etc.).
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="tax-withheld">Federal Tax Withheld</Label>
            <Input
              id="tax-withheld"
              type="number"
              placeholder="0.00"
              value={taxWithheld}
              onChange={(e) => setTaxWithheld(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter the total federal income tax withheld from your paychecks during the year.
            </p>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Tax Return Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Adjusted Gross Income (AGI):</span>
              <span className="font-semibold">{formatCurrency(result.agi)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Deduction:</span>
              <span className="font-semibold">{formatCurrency(result.deduction)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxable Income:</span>
              <span className="font-semibold">{formatCurrency(result.taxableIncome)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Federal Income Tax Owed:</span>
              <span className="font-semibold">{formatCurrency(result.federalTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax Withheld:</span>
              <span className="font-semibold">{formatCurrency(Number.parseFloat(taxWithheld) || 0)}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">
                  {result.refundOrOwed >= 0 ? "Estimated Refund:" : "Amount Owed:"}
                </span>
                <span className={`font-bold ${result.refundOrOwed >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(Math.abs(result.refundOrOwed))}
                </span>
              </div>
            </div>
            {result.refundOrOwed >= 0 ? (
              <p className="text-xs text-muted-foreground mt-2">
                You may receive a refund of {formatCurrency(result.refundOrOwed)} when you file your tax return.
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-2">
                You may owe an additional {formatCurrency(Math.abs(result.refundOrOwed))} when you file your tax return.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This calculator estimates your federal income tax for 2025-2026. It uses standard deductions and 2025-2026 tax brackets.
          Your actual tax liability may vary based on credits, additional income sources, and other factors. This is for estimation purposes only.
        </AlertDescription>
      </Alert>
    </div>
  )
}

