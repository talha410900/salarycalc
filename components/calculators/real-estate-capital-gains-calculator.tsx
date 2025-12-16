"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Home } from "lucide-react"
import { formatCurrency } from "@/lib/format"

const PRIMARY_RESIDENCE_EXCLUSION = {
  single: 250000,
  married_joint: 500000,
}

const LONG_TERM_CAPITAL_GAINS_RATES = {
  rate_0: { threshold_single: 44725, threshold_married: 89450 },
  rate_15: { threshold_single: 492300, threshold_married: 553850 },
  rate_20: { threshold: Infinity },
}

const NIIT_THRESHOLD = {
  single: 200000,
  married_joint: 250000,
}
const NIIT_RATE = 0.038

export function RealEstateCapitalGainsCalculator() {
  const [salePrice, setSalePrice] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [improvements, setImprovements] = useState("")
  const [filingStatus, setFilingStatus] = useState<"Single" | "Married Filing Jointly">("Single")
  const [livedIn2Of5Years, setLivedIn2Of5Years] = useState(false)
  const [totalIncome, setTotalIncome] = useState("")
  const [result, setResult] = useState<{
    totalGain: number
    taxableGain: number
    federalTax: number
    niit: number
    totalTax: number
  } | null>(null)

  const calculate = useCallback(() => {
    const sale = Number.parseFloat(salePrice)
    const purchase = Number.parseFloat(purchasePrice)
    const improvementsCost = Number.parseFloat(improvements) || 0
    const income = Number.parseFloat(totalIncome) || 0

    if (!salePrice || !purchasePrice || isNaN(sale) || isNaN(purchase) || sale <= 0 || purchase <= 0) {
      setResult(null)
      return
    }

    // Calculate total gain
    const totalGain = sale - (purchase + improvementsCost)

    // Apply primary residence exclusion if applicable
    const exclusion = livedIn2Of5Years
      ? PRIMARY_RESIDENCE_EXCLUSION[filingStatus === "Married Filing Jointly" ? "married_joint" : "single"]
      : 0
    const taxableGain = Math.max(0, totalGain - exclusion)

    // Calculate long-term capital gains tax
    let capitalGainsRate = 0
    if (taxableGain > 0) {
      const thresholds = LONG_TERM_CAPITAL_GAINS_RATES
      const threshold = filingStatus === "Married Filing Jointly" ? thresholds.rate_0.threshold_married : thresholds.rate_0.threshold_single
      
      if (income <= threshold) {
        capitalGainsRate = 0
      } else {
        const rate15Threshold = filingStatus === "Married Filing Jointly" ? thresholds.rate_15.threshold_married : thresholds.rate_15.threshold_single
        if (income <= rate15Threshold) {
          capitalGainsRate = 0.15
        } else {
          capitalGainsRate = 0.20
        }
      }
    }

    const federalTax = taxableGain * capitalGainsRate

    // Calculate NIIT (Net Investment Income Tax)
    const niitThreshold = NIIT_THRESHOLD[filingStatus === "Married Filing Jointly" ? "married_joint" : "single"]
    const niit = income > niitThreshold ? taxableGain * NIIT_RATE : 0

    const totalTax = federalTax + niit

    setResult({
      totalGain,
      taxableGain,
      federalTax,
      niit,
      totalTax,
    })
  }, [salePrice, purchasePrice, improvements, filingStatus, livedIn2Of5Years, totalIncome])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Real Estate Capital Gains Calculator
          </CardTitle>
          <CardDescription>
            Estimates tax on home sale considering the primary residence exclusion.
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
              <Label htmlFor="total-income">Total Income (for tax rate)</Label>
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
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married Filing Jointly">Married Filing Jointly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex items-end">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="primary-residence"
                  checked={livedIn2Of5Years}
                  onCheckedChange={(checked) => setLivedIn2Of5Years(checked === true)}
                />
                <Label htmlFor="primary-residence" className="cursor-pointer">
                  Primary Residence (Lived in 2 of last 5 years?)
                </Label>
              </div>
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
            {livedIn2Of5Years && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Primary Residence Exclusion:</span>
                <span>
                  {formatCurrency(
                    PRIMARY_RESIDENCE_EXCLUSION[filingStatus === "Married Filing Jointly" ? "married_joint" : "single"]
                  )}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxable Gain:</span>
              <span className="font-semibold">{formatCurrency(result.taxableGain)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Federal Tax:</span>
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
                <span className="font-semibold">Total Estimated Tax:</span>
                <span className="font-bold text-primary">{formatCurrency(result.totalTax)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Primary residence exclusion: $250,000 (single) or $500,000 (married filing jointly) if you lived in the home
          for at least 2 of the last 5 years. Long-term capital gains rates are 0%, 15%, or 20% based on total income.
          NIIT (3.8%) applies if MAGI exceeds $200k (single) or $250k (married). Consult a tax professional for specific situations.
        </AlertDescription>
      </Alert>
    </div>
  )
}

