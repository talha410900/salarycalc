"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/format"

const CA_BRACKETS_2025-2026_SINGLE = [
  { rate: 0.01, up_to: 10756 },
  { rate: 0.02, up_to: 25499 },
  { rate: 0.04, up_to: 40245 },
  { rate: 0.06, up_to: 55866 },
  { rate: 0.08, up_to: 70606 },
  { rate: 0.093, up_to: 360659 },
  { rate: 0.103, up_to: 432787 },
  { rate: 0.113, up_to: 721314 },
  { rate: 0.123, up_to: Infinity },
]

const CA_BRACKETS_2025-2026_MARRIED = [
  { rate: 0.01, up_to: 21512 },
  { rate: 0.02, up_to: 50998 },
  { rate: 0.04, up_to: 80490 },
  { rate: 0.06, up_to: 111732 },
  { rate: 0.08, up_to: 141212 },
  { rate: 0.093, up_to: 721318 },
  { rate: 0.103, up_to: 865574 },
  { rate: 0.113, up_to: 1442628 },
  { rate: 0.123, up_to: Infinity },
]

const MENTAL_HEALTH_SURCHARGE_THRESHOLD = 1000000
const MENTAL_HEALTH_SURCHARGE_RATE = 0.01

function calculateCATax(taxableIncome: number, filingStatus: string): number {
  const brackets = filingStatus === "Married Filing Jointly" ? CA_BRACKETS_2025-2026_MARRIED : CA_BRACKETS_2025-2026_SINGLE

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

  // Add Mental Health Service Tax surcharge if applicable
  if (taxableIncome > MENTAL_HEALTH_SURCHARGE_THRESHOLD) {
    tax += taxableIncome * MENTAL_HEALTH_SURCHARGE_RATE
  }

  return tax
}

export function CACapitalGainsCalculator() {
  const [totalTaxableIncome, setTotalTaxableIncome] = useState("")
  const [capitalGainAmount, setCapitalGainAmount] = useState("")
  const [filingStatus, setFilingStatus] = useState<"Single" | "Married Filing Jointly">("Single")
  const [result, setResult] = useState<{
    totalTax: number
    effectiveRate: number
  } | null>(null)

  const calculate = useCallback(() => {
    const totalIncome = Number.parseFloat(totalTaxableIncome)
    const gains = Number.parseFloat(capitalGainAmount)

    if (!totalTaxableIncome || isNaN(totalIncome) || totalIncome <= 0) {
      setResult(null)
      return
    }

    // CA taxes capital gains as ordinary income
    // Calculate total CA tax on all taxable income
    const totalTax = calculateCATax(totalIncome, filingStatus)

    // Calculate effective rate
    const effectiveRate = totalTax / totalIncome

    setResult({
      totalTax,
      effectiveRate,
    })
  }, [totalTaxableIncome, capitalGainAmount, filingStatus])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            California Capital Gains Tax Calculator 2025-2026
          </CardTitle>
          <CardDescription>
            Calculates CA state tax on capital gains (taxed as ordinary income).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="total-income">Total Taxable Income (including gains)</Label>
              <Input
                id="total-income"
                type="number"
                placeholder="0.00"
                value={totalTaxableIncome}
                onChange={(e) => setTotalTaxableIncome(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capital-gain">Capital Gain Amount</Label>
              <Input
                id="capital-gain"
                type="number"
                placeholder="0.00"
                value={capitalGainAmount}
                onChange={(e) => setCapitalGainAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
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
              <span className="text-muted-foreground">California Tax on Total Income:</span>
              <span className="font-semibold">{formatCurrency(result.totalTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Effective CA Rate:</span>
              <span className="font-semibold">{(result.effectiveRate * 100).toFixed(2)}%</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <p className="text-sm text-muted-foreground">
                Note: California taxes capital gains as ordinary income with no special lower rate.
                {Number.parseFloat(totalTaxableIncome) > MENTAL_HEALTH_SURCHARGE_THRESHOLD && (
                  <span className="block mt-1 text-amber-600">
                    Mental Health Service Tax (1%) applies to income over $1,000,000.
                  </span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          California taxes capital gains as ordinary income. There is no special lower rate for long-term capital gains in CA.
          This calculator uses 2025-2026 California tax brackets. Consult a tax professional for specific advice.
        </AlertDescription>
      </Alert>
    </div>
  )
}

