"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Package } from "lucide-react"
import { formatCurrency } from "@/lib/format"

const IMPORT_DUTY_RATES = {
  Clothing: 0.16,
  Electronics: 0.0,
  "Auto Parts": 0.025,
  Other: 0.05,
}

export function USImportTaxCalculator() {
  const [value, setValue] = useState("")
  const [category, setCategory] = useState<"Clothing" | "Electronics" | "Auto Parts" | "Other">("Other")
  const [result, setResult] = useState<{
    dutyRate: number
    estimatedDuty: number
  } | null>(null)

  const calculate = useCallback(() => {
    const importValue = Number.parseFloat(value)

    if (!value || isNaN(importValue) || importValue <= 0) {
      setResult(null)
      return
    }

    const dutyRate = IMPORT_DUTY_RATES[category]
    const estimatedDuty = importValue * dutyRate

    setResult({
      dutyRate,
      estimatedDuty,
    })
  }, [value, category])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            US Import Tax Calculator
          </CardTitle>
          <CardDescription>
            Similar to Customs Calculator, focused on general import duties.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="value">Product Value (USD)</Label>
              <Input
                id="value"
                type="number"
                placeholder="0.00"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Product Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as any)}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Clothing">Clothing (16%)</SelectItem>
                  <SelectItem value="Electronics">Electronics (0%)</SelectItem>
                  <SelectItem value="Auto Parts">Auto Parts (2.5%)</SelectItem>
                  <SelectItem value="Other">Other (5%)</SelectItem>
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
              <span className="text-muted-foreground">Duty Rate:</span>
              <span className="font-semibold">{(result.dutyRate * 100).toFixed(1)}%</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Estimated Duty:</span>
                <span className="font-bold text-primary">{formatCurrency(result.estimatedDuty)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This is a simplified estimate based on general category rates. Actual import duties vary significantly
          based on product classification (HTS code), country of origin, trade agreements, and current tariffs.
          Consult with a customs broker or use the official Harmonized Tariff Schedule for accurate calculations.
        </AlertDescription>
      </Alert>
    </div>
  )
}

