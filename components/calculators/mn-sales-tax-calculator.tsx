"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, ShoppingCart } from "lucide-react"
import { formatCurrency } from "@/lib/format"

const MN_STATE_RATE = 0.06875
const MN_LOCAL_RATES = {
  "General MN": 0.0,
  Minneapolis: 0.02155,
  "St. Paul": 0.02,
}

export function MNSalesTaxCalculator() {
  const [amount, setAmount] = useState("")
  const [location, setLocation] = useState<"General MN" | "Minneapolis" | "St. Paul">("General MN")
  const [result, setResult] = useState<{
    stateTax: number
    localTax: number
    totalTax: number
    totalPrice: number
  } | null>(null)

  const calculate = useCallback(() => {
    const purchaseAmount = Number.parseFloat(amount)

    if (!amount || isNaN(purchaseAmount) || purchaseAmount <= 0) {
      setResult(null)
      return
    }

    const localRate = MN_LOCAL_RATES[location]
    const stateTax = purchaseAmount * MN_STATE_RATE
    const localTax = purchaseAmount * localRate
    const totalTax = stateTax + localTax
    const totalPrice = purchaseAmount + totalTax

    setResult({
      stateTax,
      localTax,
      totalTax,
      totalPrice,
    })
  }, [amount, location])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Minnesota Sales Tax Calculator 2025
          </CardTitle>
          <CardDescription>
            Calculates total sales tax for Minnesota (State + Local).
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
              <Label htmlFor="location">Location</Label>
              <Select value={location} onValueChange={(v) => setLocation(v as any)}>
                <SelectTrigger id="location">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General MN">General MN</SelectItem>
                  <SelectItem value="Minneapolis">Minneapolis</SelectItem>
                  <SelectItem value="St. Paul">St. Paul</SelectItem>
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
              <span className="text-muted-foreground">State Tax (6.875%):</span>
              <span className="font-semibold">{formatCurrency(result.stateTax)}</span>
            </div>
            {result.localTax > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Local Tax:</span>
                <span className="font-semibold">{formatCurrency(result.localTax)}</span>
              </div>
            )}
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
          Minnesota state sales tax rate is 6.875% for 2025. Local rates vary by city.
          Minneapolis has an additional 2.155% local tax, and St. Paul has 2.0%.
          Actual rates may vary by specific location within these cities.
        </AlertDescription>
      </Alert>
    </div>
  )
}

