"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Briefcase } from "lucide-react"
import { formatCurrency } from "@/lib/format"

const SOCIAL_SECURITY_RATE = 0.124
const MEDICARE_RATE = 0.029
const SOCIAL_SECURITY_WAGE_BASE = 176100
const TAXABLE_EARNINGS_MULTIPLIER = 0.9235

export function SelfEmployedTaxCalculator() {
  const [netProfit, setNetProfit] = useState("")
  const [result, setResult] = useState<{
    taxableEarnings: number
    socialSecurity: number
    medicare: number
    totalSETax: number
    deductionAmount: number
  } | null>(null)

  const calculate = useCallback(() => {
    const profit = Number.parseFloat(netProfit)

    if (!netProfit || isNaN(profit) || profit <= 0) {
      setResult(null)
      return
    }

    // Calculate taxable earnings (92.35% of net profit)
    const taxableEarnings = profit * TAXABLE_EARNINGS_MULTIPLIER

    // Social Security (12.4% on first $176,100 of taxable earnings)
    const socialSecurityTaxable = Math.min(taxableEarnings, SOCIAL_SECURITY_WAGE_BASE)
    const socialSecurity = socialSecurityTaxable * SOCIAL_SECURITY_RATE

    // Medicare (2.9% on all taxable earnings)
    const medicare = taxableEarnings * MEDICARE_RATE

    // Total SE Tax
    const totalSETax = socialSecurity + medicare

    // Income tax deduction (50% of SE tax)
    const deductionAmount = totalSETax * 0.5

    setResult({
      taxableEarnings,
      socialSecurity,
      medicare,
      totalSETax,
      deductionAmount,
    })
  }, [netProfit])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Self-Employed Tax Calculator 2025-2026
          </CardTitle>
          <CardDescription>
            Calculates the 15.3% SE tax (Social Security + Medicare) for freelancers and self-employed individuals.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="net-profit">Net Business Profit</Label>
            <Input
              id="net-profit"
              type="number"
              placeholder="0.00"
              value={netProfit}
              onChange={(e) => setNetProfit(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter your net profit from self-employment (after business expenses).
            </p>
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
              <span className="text-muted-foreground">Taxable Earnings (92.35%):</span>
              <span className="font-semibold">{formatCurrency(result.taxableEarnings)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Social Security Portion (12.4%):</span>
              <span className="font-semibold">{formatCurrency(result.socialSecurity)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Medicare Portion (2.9%):</span>
              <span className="font-semibold">{formatCurrency(result.medicare)}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Self-Employment Tax:</span>
                <span className="font-bold text-primary">{formatCurrency(result.totalSETax)}</span>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-muted-foreground">Tax Deduction Amount (50%):</span>
              <span className="font-semibold text-green-600">{formatCurrency(result.deductionAmount)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              You can deduct 50% of your SE tax from your federal AGI when calculating income tax.
            </p>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Self-employment tax is 15.3% (12.4% Social Security + 2.9% Medicare) on 92.35% of net profit.
          Social Security tax applies only to the first $176,100 of taxable earnings in 2025-2026.
          You can deduct 50% of your SE tax from your federal AGI. This calculator uses 2025-2026 rates.
        </AlertDescription>
      </Alert>
    </div>
  )
}

