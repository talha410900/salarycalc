"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/format"

const CAPITAL_GAINS_BRACKETS = {
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

export function RentalPropertyCapitalGainsCalculator() {
  const [salePrice, setSalePrice] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [improvements, setImprovements] = useState("")
  const [depreciation, setDepreciation] = useState("")
  const [totalIncome, setTotalIncome] = useState("")
  const [filingStatus, setFilingStatus] = useState<"single" | "married-joint">("single")
  const [result, setResult] = useState<{
    totalGain: number
    taxableGain: number
    capitalGainsTax: number
    depreciationRecapture: number
    niit: number
    totalTax: number
  } | null>(null)

  const calculate = useCallback(() => {
    const sale = Number.parseFloat(salePrice) || 0
    const purchase = Number.parseFloat(purchasePrice) || 0
    const improve = Number.parseFloat(improvements) || 0
    const dep = Number.parseFloat(depreciation) || 0
    const income = Number.parseFloat(totalIncome) || 0

    if (!salePrice || sale <= 0 || purchase <= 0) {
      setResult(null)
      return
    }

    // Calculate total gain
    const adjustedBasis = purchase + improve - dep
    const totalGain = sale - adjustedBasis

    // Depreciation recapture (taxed at 25%)
    const depreciationRecapture = dep * 0.25

    // Remaining gain after depreciation recapture
    const remainingGain = totalGain - dep

    // Capital gains tax on remaining gain
    const brackets = CAPITAL_GAINS_BRACKETS[filingStatus]
    let capitalGainsTax = 0
    const taxableIncome = income + remainingGain

    for (let i = brackets.length - 1; i >= 0; i--) {
      const bracket = brackets[i]
      if (taxableIncome > bracket.threshold) {
        const taxableInBracket = Math.min(remainingGain, taxableIncome - bracket.threshold)
        if (taxableInBracket > 0) {
          capitalGainsTax += taxableInBracket * bracket.rate
        }
        break
      }
    }

    // NIIT (3.8% on investment income if MAGI exceeds threshold)
    const niitThreshold = NIIT_THRESHOLD[filingStatus]
    const niit = taxableIncome > niitThreshold ? remainingGain * 0.038 : 0

    const totalTax = depreciationRecapture + capitalGainsTax + niit

    setResult({
      totalGain,
      taxableGain: remainingGain,
      capitalGainsTax,
      depreciationRecapture,
      niit,
      totalTax,
    })
  }, [salePrice, purchasePrice, improvements, depreciation, totalIncome, filingStatus])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Capital Gains Tax Calculator on Rental Property 2025-2026
          </CardTitle>
          <CardDescription>
            Calculate capital gains tax on the sale of rental property, including depreciation recapture.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sale-price">Sale Price</Label>
              <Input
                id="sale-price"
                type="number"
                placeholder="0.00"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchase-price">Purchase Price</Label>
              <Input
                id="purchase-price"
                type="number"
                placeholder="0.00"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="improvements">Cost of Improvements</Label>
              <Input
                id="improvements"
                type="number"
                placeholder="0.00"
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="depreciation">Total Depreciation Taken</Label>
              <Input
                id="depreciation"
                type="number"
                placeholder="0.00"
                value={depreciation}
                onChange={(e) => setDepreciation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total-income">Total Annual Income</Label>
              <Input
                id="total-income"
                type="number"
                placeholder="0.00"
                value={totalIncome}
                onChange={(e) => setTotalIncome(e.target.value)}
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
              <span className="text-muted-foreground">Total Gain:</span>
              <span className="font-semibold">{formatCurrency(result.totalGain)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxable Gain:</span>
              <span className="font-semibold">{formatCurrency(result.taxableGain)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Depreciation Recapture (25%):</span>
              <span className="font-semibold">{formatCurrency(result.depreciationRecapture)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Capital Gains Tax:</span>
              <span className="font-semibold">{formatCurrency(result.capitalGainsTax)}</span>
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
          Rental property sales are subject to capital gains tax and depreciation recapture. Depreciation taken over the years 
          must be "recaptured" and taxed at 25% (unrecaptured section 1250 gain). The remaining gain is taxed at long-term 
          capital gains rates (0%, 15%, or 20%). High-income taxpayers may also owe the 3.8% Net Investment Income Tax (NIIT). 
          Consider a 1031 exchange to defer taxes. Consult a tax professional for your specific situation.
        </AlertDescription>
      </Alert>
    </div>
  )
}

