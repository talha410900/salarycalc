"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Car } from "lucide-react"
import { formatCurrency } from "@/lib/format"

// VA property tax on cars - varies by locality, using average
const VA_CAR_PROPERTY_TAX_RATE = 0.04 // 4% average, varies by county/city

export function VAPropertyTaxCarCalculator() {
  const [carValue, setCarValue] = useState("")
  const [result, setResult] = useState<{
    propertyTax: number
    totalCost: number
  } | null>(null)

  const calculate = useCallback(() => {
    const value = Number.parseFloat(carValue)

    if (!carValue || isNaN(value) || value <= 0) {
      setResult(null)
      return
    }

    const propertyTax = value * VA_CAR_PROPERTY_TAX_RATE
    const totalCost = value + propertyTax

    setResult({
      propertyTax,
      totalCost,
    })
  }, [carValue])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            VA Property Tax Car Calculator 2025-2026
          </CardTitle>
          <CardDescription>
            Calculate Virginia property tax on your vehicle based on assessed value.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="car-value">Vehicle Assessed Value</Label>
            <Input
              id="car-value"
              type="number"
              placeholder="0.00"
              value={carValue}
              onChange={(e) => setCarValue(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter the assessed value of your vehicle (typically based on NADA or similar valuation).
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
              <span className="text-muted-foreground">Property Tax (4%):</span>
              <span className="font-semibold">{formatCurrency(result.propertyTax)}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total Cost:</span>
                <span className="font-bold text-primary">{formatCurrency(result.totalCost)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Virginia charges property tax on vehicles annually. The rate varies by county and city, typically ranging from 3.5% to 5.5% 
          of the vehicle's assessed value. This calculator uses an average rate of 4%. 
          Check with your local commissioner of revenue or treasurer's office for the exact rate in your locality.
        </AlertDescription>
      </Alert>
    </div>
  )
}

