"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Car } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import type { StateTaxData } from "@/lib/state-tax-data"

interface StateVehicleTaxCalculatorProps {
  stateSlug: string
  stateData: StateTaxData
}

// Vehicle tax rates by state (2025-2026) - simplified
const VEHICLE_TAX_RATES: Record<string, number> = {
  "virginia": 0.04, // 4% vehicle tax
  "west-virginia": 0.05, // 5% vehicle tax
}

export function StateVehicleTaxCalculator({ stateSlug, stateData }: StateVehicleTaxCalculatorProps) {
  const [vehicleValue, setVehicleValue] = useState("")
  const [result, setResult] = useState<{
    vehicleTax: number
    totalPrice: number
  } | null>(null)

  const vehicleRate = VEHICLE_TAX_RATES[stateSlug] || 0.04 // Default 4% if not found

  const calculate = useCallback(() => {
    const value = Number.parseFloat(vehicleValue)

    if (!vehicleValue || isNaN(value) || value <= 0) {
      setResult(null)
      return
    }

    const vehicleTax = value * vehicleRate
    const totalPrice = value + vehicleTax

    setResult({
      vehicleTax,
      totalPrice,
    })
  }, [vehicleValue, vehicleRate])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            {stateData.name} Vehicle Tax Calculator 2025-2026
          </CardTitle>
          <CardDescription>
            Calculate vehicle tax for {stateData.name} vehicle purchases and registrations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicle-value">Vehicle Value</Label>
            <Input
              id="vehicle-value"
              type="number"
              placeholder="0.00"
              value={vehicleValue}
              onChange={(e) => setVehicleValue(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter the vehicle purchase price or assessed value.
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
              <span className="text-muted-foreground">Vehicle Tax ({(vehicleRate * 100).toFixed(2)}%):</span>
              <span className="font-semibold">{formatCurrency(result.vehicleTax)}</span>
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
          {stateData.name} vehicle tax rate is {(vehicleRate * 100).toFixed(2)}% for 2025-2026. 
          This calculator provides an estimate based on the state rate. 
          Actual vehicle taxes may vary based on vehicle type, age, and local regulations.
          Consult your local DMV or tax office for exact rates.
        </AlertDescription>
      </Alert>
    </div>
  )
}

