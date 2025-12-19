"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Package } from "lucide-react"
import { formatCurrency } from "@/lib/format"

const MPF_MIN = 31.67
const MPF_MAX = 614.35
const MPF_RATE = 0.003464

export function CustomsImportDutyCalculator() {
  const [productValue, setProductValue] = useState("")
  const [dutyRate, setDutyRate] = useState("2.5")
  const [insuranceFreight, setInsuranceFreight] = useState("")
  const [result, setResult] = useState<{
    duty: number
    mpf: number
    totalDuty: number
    totalLandedCost: number
  } | null>(null)

  const calculate = useCallback(() => {
    const value = Number.parseFloat(productValue)
    const rate = Number.parseFloat(dutyRate) / 100
    const shipping = Number.parseFloat(insuranceFreight) || 0

    if (!productValue || isNaN(value) || value <= 0) {
      setResult(null)
      return
    }

    // Calculate duty
    const duty = value * rate

    // Calculate MPF (Merchandise Processing Fee)
    // For formal entries (>$2500), MPF is 0.3464% (min $31.67, max $614.35)
    // For informal entries (<$2500), MPF is typically $2-$9, but we'll use the formula
    let mpf = 0
    if (value >= 2500) {
      mpf = Math.min(Math.max(value * MPF_RATE, MPF_MIN), MPF_MAX)
    } else {
      // Informal entry - simplified to $5
      mpf = 5
    }

    const totalDuty = duty + mpf
    const totalLandedCost = value + totalDuty + shipping

    setResult({
      duty,
      mpf,
      totalDuty,
      totalLandedCost,
    })
  }, [productValue, dutyRate, insuranceFreight])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Customs and Import Duty Calculator
          </CardTitle>
          <CardDescription>
            Estimates US import duties based on product value and duty rate. Note: 2025-2026 tariffs may apply.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="product-value">Product Value (USD)</Label>
              <Input
                id="product-value"
                type="number"
                placeholder="0.00"
                value={productValue}
                onChange={(e) => setProductValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duty-rate">Duty Rate (%)</Label>
              <Input
                id="duty-rate"
                type="number"
                step="0.1"
                placeholder="2.5"
                value={dutyRate}
                onChange={(e) => setDutyRate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Common rates: 0% (Tech), 2.5% (General), 10-25% (Specific Lists/China)
              </p>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="insurance-freight">Shipping and Insurance Cost (Optional)</Label>
              <Input
                id="insurance-freight"
                type="number"
                placeholder="0.00"
                value={insuranceFreight}
                onChange={(e) => setInsuranceFreight(e.target.value)}
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
              <span className="text-muted-foreground">Estimated Duty:</span>
              <span className="font-semibold">{formatCurrency(result.duty)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">MPF (Processing Fee):</span>
              <span className="font-semibold">{formatCurrency(result.mpf)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Duty and Fees:</span>
              <span className="font-semibold">{formatCurrency(result.totalDuty)}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total Landed Cost:</span>
                <span className="font-bold text-primary">{formatCurrency(result.totalLandedCost)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This is an estimate. Actual duties may vary based on product classification, country of origin, and current trade policies.
          MPF applies to formal entries ($2500+). Consult with a customs broker for accurate calculations.
        </AlertDescription>
      </Alert>
    </div>
  )
}

