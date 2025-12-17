"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Home } from "lucide-react"
import { formatCurrency } from "@/lib/format"

// Illinois property tax - varies by county, using average effective rate
const IL_PROPERTY_TAX_RATE = 0.0219 // 2.19% average effective rate (varies significantly by county)

export function IllinoisPropertyTaxCalculator() {
  const [propertyValue, setPropertyValue] = useState("")
  const [result, setResult] = useState<{
    propertyTax: number
    monthlyTax: number
  } | null>(null)

  const calculate = useCallback(() => {
    const value = Number.parseFloat(propertyValue)

    if (!propertyValue || isNaN(value) || value <= 0) {
      setResult(null)
      return
    }

    const propertyTax = value * IL_PROPERTY_TAX_RATE
    const monthlyTax = propertyTax / 12

    setResult({
      propertyTax,
      monthlyTax,
    })
  }, [propertyValue])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Property Tax in Illinois Calculator 2025-2026
          </CardTitle>
          <CardDescription>
            Calculate property tax for Illinois real estate based on assessed value.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="property-value">Property Assessed Value</Label>
            <Input
              id="property-value"
              type="number"
              placeholder="0.00"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter the assessed value of your property (typically a percentage of fair market value).
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
              <span className="text-muted-foreground">Annual Property Tax (2.19%):</span>
              <span className="font-semibold">{formatCurrency(result.propertyTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Property Tax:</span>
              <span className="font-semibold">{formatCurrency(result.monthlyTax)}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Illinois property tax rates vary significantly by county and municipality. The average effective rate is approximately 2.19%, 
          but rates can range from less than 1% to over 4% depending on location. This calculator uses the average rate. 
          Check with your local assessor's office for the exact rate and assessed value in your area.
        </AlertDescription>
      </Alert>
    </div>
  )
}

