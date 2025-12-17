"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, ShoppingCart } from "lucide-react"
import { formatCurrency } from "@/lib/format"

const LA_STATE_RATE_2025 = 0.05

export function LASalesTaxCalculator() {
  const [amount, setAmount] = useState("")
  const [parishRate, setParishRate] = useState("5.0")
  const [result, setResult] = useState<{
    stateTax: number
    localTax: number
    totalTax: number
    totalPrice: number
  } | null>(null)

  const calculate = useCallback(() => {
    const purchaseAmount = Number.parseFloat(amount)
    const parish = Number.parseFloat(parishRate) / 100

    if (!amount || isNaN(purchaseAmount) || purchaseAmount <= 0) {
      setResult(null)
      return
    }

    const stateTax = purchaseAmount * LA_STATE_RATE_2025
    const localTax = purchaseAmount * parish
    const totalTax = stateTax + localTax
    const totalPrice = purchaseAmount + totalTax

    setResult({
      stateTax,
      localTax,
      totalTax,
      totalPrice,
    })
  }, [amount, parishRate])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Louisiana Sales Tax Calculator 2025-2026
          </CardTitle>
          <CardDescription>
            Calculates sales tax for Louisiana (New 2025-2026 Rate).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Purchase Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parish-rate">Parish/Local Rate (%)</Label>
              <Input
                id="parish-rate"
                type="number"
                step="0.1"
                placeholder="5.0"
                value={parishRate}
                onChange={(e) => setParishRate(e.target.value)}
              />
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
              <span className="text-muted-foreground">State Tax (5%):</span>
              <span className="font-semibold">{formatCurrency(result.stateTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Local Tax ({parishRate}%):</span>
              <span className="font-semibold">{formatCurrency(result.localTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Tax:</span>
              <span className="font-semibold">{formatCurrency(result.totalTax)}</span>
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
          Louisiana state sales tax rate is 5% for 2025-2026. Parish/local rates vary by location.
          Enter the specific parish rate for your location. Total tax = State (5%) + Parish/Local rate.
        </AlertDescription>
      </Alert>
    </div>
  )
}

