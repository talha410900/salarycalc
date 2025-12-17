"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/format"

// NC has a flat 4.5% income tax rate (capital gains taxed as ordinary income)
const NC_TAX_RATE = 0.045

const FEDERAL_CAPITAL_GAINS_BRACKETS = {
  single: [
    { threshold: 0, rate: 0.0 },
    { threshold: 44725, rate: 0.15 },
    { threshold: 492300, rate: 0.20 },
  ],
  "married-joint": [
    { threshold: 0, rate: 0.0 },
    { threshold: 89450, rate: 0.15 },
    { threshold: 553850, rate: 0.20 },
  ],
}

const NIIT_THRESHOLD = {
  single: 200000,
  "married-joint": 250000,
}

export function NCCapitalGainsCalculator() {
  const [capitalGain, setCapitalGain] = useState("")
  const [otherIncome, setOtherIncome] = useState("")
  const [filingStatus, setFilingStatus] = useState<"single" | "married-joint">("single")
  const [result, setResult] = useState<{
    ncTax: number
    federalTax: number
    niit: number
    totalTax: number
  } | null>(null)

  const calculate = useCallback(() => {
    const gain = Number.parseFloat(capitalGain) || 0
    const income = Number.parseFloat(otherIncome) || 0

    if (!capitalGain || isNaN(gain) || gain <= 0) {
      setResult(null)
      return
    }

    // NC tax (flat 4.5% on capital gains)
    const ncTax = gain * NC_TAX_RATE

    // Federal capital gains tax
    const totalIncome = income + gain
    const brackets = FEDERAL_CAPITAL_GAINS_BRACKETS[filingStatus]
    let federalTax = 0

    for (let i = brackets.length - 1; i >= 0; i--) {
      const bracket = brackets[i]
      if (totalIncome > bracket.threshold) {
        const taxableInBracket = Math.min(gain, totalIncome - bracket.threshold)
        if (taxableInBracket > 0) {
          federalTax += taxableInBracket * bracket.rate
        }
        break
      }
    }

    // NIIT (3.8% on investment income if MAGI exceeds threshold)
    const niitThreshold = NIIT_THRESHOLD[filingStatus]
    const niit = totalIncome > niitThreshold ? gain * 0.038 : 0

    const totalTax = ncTax + federalTax + niit

    setResult({
      ncTax,
      federalTax,
      niit,
      totalTax,
    })
  }, [capitalGain, otherIncome, filingStatus])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            North Carolina Capital Gains Tax Calculator 2025-2026
          </CardTitle>
          <CardDescription>
            Calculate North Carolina and federal capital gains tax on your investment gains.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="capital-gain">Capital Gain Amount</Label>
              <Input
                id="capital-gain"
                type="number"
                placeholder="0.00"
                value={capitalGain}
                onChange={(e) => setCapitalGain(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="other-income">Other Annual Income</Label>
              <Input
                id="other-income"
                type="number"
                placeholder="0.00"
                value={otherIncome}
                onChange={(e) => setOtherIncome(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="filing-status">Filing Status</Label>
              <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as any)}>
                <SelectTrigger id="filing-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married-joint">Married Filing Jointly</SelectItem>
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
              <span className="text-muted-foreground">NC Capital Gains Tax (4.5%):</span>
              <span className="font-semibold">{formatCurrency(result.ncTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Federal Capital Gains Tax:</span>
              <span className="font-semibold">{formatCurrency(result.federalTax)}</span>
            </div>
            {result.niit > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">NIIT (3.8%):</span>
                <span className="font-semibold">{formatCurrency(result.niit)}</span>
              </div>
            )}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total Tax:</span>
                <span className="font-bold text-primary">{formatCurrency(result.totalTax)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          North Carolina taxes capital gains at a flat 4.5% rate (capital gains are taxed as ordinary income in NC). 
          Federal capital gains are taxed at preferential rates (0%, 15%, or 20% for long-term gains). 
          High-income taxpayers may also owe the 3.8% Net Investment Income Tax (NIIT). 
          This calculator provides estimates for 2025-2026 tax rates.
        </AlertDescription>
      </Alert>
    </div>
  )
}

