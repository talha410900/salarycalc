"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, ShoppingCart } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import type { StateTaxData } from "@/lib/state-tax-data"

interface StateSalesTaxCalculatorProps {
  stateSlug: string
  stateData: StateTaxData
  keyword?: string // For exact keyword matching (e.g., "car sales tax calculator", "sales tax calculator")
}

// State sales tax rates (2025-2026) - simplified, can be expanded
const STATE_SALES_TAX_RATES: Record<string, number> = {
  "tennessee": 0.07, // 7% state rate
  "maryland": 0.06, // 6% state rate
  "nebraska": 0.055, // 5.5% state rate
  "texas": 0.0625, // 6.25% state rate
  "minnesota": 0.06875, // 6.875% state rate
  "louisiana": 0.0445, // 4.45% state rate
}

export function StateSalesTaxCalculator({ stateSlug, stateData, keyword }: StateSalesTaxCalculatorProps) {
  const [amount, setAmount] = useState("")
  const [result, setResult] = useState<{
    stateTax: number
    totalTax: number
    totalPrice: number
  } | null>(null)

  const stateRate = STATE_SALES_TAX_RATES[stateSlug] || 0.06 // Default 6% if not found

  const calculate = useCallback(() => {
    const purchaseAmount = Number.parseFloat(amount)

    if (!amount || isNaN(purchaseAmount) || purchaseAmount <= 0) {
      setResult(null)
      return
    }

    const stateTax = purchaseAmount * stateRate
    const totalTax = stateTax
    const totalPrice = purchaseAmount + totalTax

    setResult({
      stateTax,
      totalTax,
      totalPrice,
    })
  }, [amount, stateRate])

  useEffect(() => {
    calculate()
  }, [calculate])

  const titleKeyword = keyword === "car sales tax calculator" 
    ? "Car Sales Tax Calculator"
    : keyword === "sales tax calculator auto"
    ? "Auto Sales Tax Calculator"
    : keyword === "auto sales tax calculator"
    ? "Auto Sales Tax Calculator"
    : "Sales Tax Calculator"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            {stateData.name} {titleKeyword} 2025-2026
          </CardTitle>
          <CardDescription>
            Calculate sales tax for {stateData.name} purchases.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Purchase Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter the purchase price before tax.
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
              <span className="text-muted-foreground">State Tax ({(stateRate * 100).toFixed(2)}%):</span>
              <span className="font-semibold">{formatCurrency(result.stateTax)}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Tax:</span>
                <span className="font-semibold">{formatCurrency(result.totalTax)}</span>
              </div>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total Price:</span>
                <span className="font-bold text-primary">{formatCurrency(result.totalPrice)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          {stateData.name} state sales tax rate is {(stateRate * 100).toFixed(2)}% for 2025-2026. 
          Local rates may vary by city or county. This calculator provides an estimate based on the state rate.
          Actual rates may vary by specific location and item type.
        </AlertDescription>
      </Alert>
    </div>
  )
}

