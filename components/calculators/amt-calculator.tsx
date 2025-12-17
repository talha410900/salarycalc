"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Calculator } from "lucide-react"
import { formatCurrency } from "@/lib/format"

const AMT_EXEMPTIONS_2025- = {
  single: 88100,
  married_joint: 137000,
}

const AMT_PHASEOUT_THRESHOLDS_2025- = {
  single: 626350,
  married_joint: 1252700,
}

const AMT_RATE_1 = 0.26
const AMT_RATE_2 = 0.28
const AMT_THRESHOLD_EXCESS = 239100

export function AMTCalculator() {
  const [taxableIncome, setTaxableIncome] = useState("")
  const [filingStatus, setFilingStatus] = useState<"Single" | "Married Filing Jointly">("Single")
  const [preferenceItems, setPreferenceItems] = useState("")
  const [result, setResult] = useState<{
    amti: number
    exemption: number
    amtBase: number
    tentativeAMT: number
    amtOwed: number
  } | null>(null)

  const calculate = useCallback(() => {
    const income = Number.parseFloat(taxableIncome)
    const preferences = Number.parseFloat(preferenceItems) || 0

    if (!taxableIncome || isNaN(income) || income <= 0) {
      setResult(null)
      return
    }

    const statusKey = filingStatus === "Married Filing Jointly" ? "married_joint" : "single"
    const baseExemption = AMT_EXEMPTIONS_2025[statusKey]
    const phaseoutThreshold = AMT_PHASEOUT_THRESHOLDS_2025[statusKey]

    // Calculate AMTI (Alternative Minimum Taxable Income)
    const amti = income + preferences

    // Calculate exemption with phaseout
    const excessOverPhaseout = Math.max(0, amti - phaseoutThreshold)
    const exemptionReduction = excessOverPhaseout * 0.25
    const exemption = Math.max(0, baseExemption - exemptionReduction)

    // Calculate AMT Base
    const amtBase = Math.max(0, amti - exemption)

    // Calculate Tentative AMT
    const amountAtRate1 = Math.min(amtBase, AMT_THRESHOLD_EXCESS)
    const amountAtRate2 = Math.max(0, amtBase - AMT_THRESHOLD_EXCESS)
    const tentativeAMT = amountAtRate1 * AMT_RATE_1 + amountAtRate2 * AMT_RATE_2

    // AMT is only owed if it exceeds regular tax (we'll show tentative AMT)
    const amtOwed = tentativeAMT

    setResult({
      amti,
      exemption,
      amtBase,
      tentativeAMT,
      amtOwed,
    })
  }, [taxableIncome, filingStatus, preferenceItems])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Alternative Minimum Tax (AMT) Calculator 2025-2026
          </CardTitle>
          <CardDescription>
            Determines if you owe AMT based on 2025-2026 exemption amounts and rates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="taxable-income">Regular Taxable Income</Label>
              <Input
                id="taxable-income"
                type="number"
                placeholder="0.00"
                value={taxableIncome}
                onChange={(e) => setTaxableIncome(e.target.value)}
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
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="preference-items">Tax Preference Items (Optional)</Label>
              <Input
                id="preference-items"
                type="number"
                placeholder="0.00"
                value={preferenceItems}
                onChange={(e) => setPreferenceItems(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                e.g., ISO exercise spread, tax-exempt interest, etc.
              </p>
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
              <span className="text-muted-foreground">AMT Income (AMTI):</span>
              <span className="font-semibold">{formatCurrency(result.amti)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Exemption Amount:</span>
              <span className="font-semibold">{formatCurrency(result.exemption)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">AMT Base:</span>
              <span className="font-semibold">{formatCurrency(result.amtBase)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tentative Minimum Tax:</span>
              <span className="font-semibold">{formatCurrency(result.tentativeAMT)}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">AMT Owed (if &gt; Regular Tax):</span>
                <span className="font-bold text-primary">{formatCurrency(result.amtOwed)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          You only pay AMT if it exceeds your regular tax liability. Compare the tentative AMT to your regular tax to determine if AMT applies.
          This calculator uses 2025-2026 AMT exemption amounts and rates. Consult a tax professional for complex situations.
        </AlertDescription>
      </Alert>
    </div>
  )
}

