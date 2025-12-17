"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Receipt } from "lucide-react"
import { formatCurrency } from "@/lib/format"

// Maine excise tax is based on MSRP and vehicle age
// Rate decreases as vehicle gets older
const MAINE_EXCISE_TAX_RATES = {
  year1: 0.024, // 2.4% for first year
  year2: 0.0175, // 1.75% for second year
  year3: 0.013, // 1.3% for third year
  year4: 0.01, // 1.0% for fourth year
  year5: 0.0065, // 0.65% for fifth year
  year6Plus: 0.004, // 0.4% for sixth year and older
}

export function MaineExciseTaxCalculator() {
  const [msrp, setMsrp] = useState("")
  const [vehicleAge, setVehicleAge] = useState<"year1" | "year2" | "year3" | "year4" | "year5" | "year6Plus">("year1")
  const [result, setResult] = useState<{
    exciseTax: number
    totalPrice: number
  } | null>(null)

  const calculate = useCallback(() => {
    const msrpValue = Number.parseFloat(msrp)

    if (!msrp || isNaN(msrpValue) || msrpValue <= 0) {
      setResult(null)
      return
    }

    const rate = MAINE_EXCISE_TAX_RATES[vehicleAge]
    const exciseTax = msrpValue * rate
    const totalPrice = msrpValue + exciseTax

    setResult({
      exciseTax,
      totalPrice,
    })
  }, [msrp, vehicleAge])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            State of Maine Excise Tax Calculator 2025-2026
          </CardTitle>
          <CardDescription>
            Calculate excise tax for vehicle registrations in Maine based on MSRP and vehicle age.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="msrp">Vehicle MSRP</Label>
              <Input
                id="msrp"
                type="number"
                placeholder="0.00"
                value={msrp}
                onChange={(e) => setMsrp(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter the manufacturer's suggested retail price (MSRP).
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle-age">Vehicle Age</Label>
              <Select value={vehicleAge} onValueChange={(v) => setVehicleAge(v as any)}>
                <SelectTrigger id="vehicle-age">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year1">First Year (2.4%)</SelectItem>
                  <SelectItem value="year2">Second Year (1.75%)</SelectItem>
                  <SelectItem value="year3">Third Year (1.3%)</SelectItem>
                  <SelectItem value="year4">Fourth Year (1.0%)</SelectItem>
                  <SelectItem value="year5">Fifth Year (0.65%)</SelectItem>
                  <SelectItem value="year6Plus">Sixth Year+ (0.4%)</SelectItem>
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
              <span className="text-muted-foreground">Excise Tax ({(MAINE_EXCISE_TAX_RATES[vehicleAge] * 100).toFixed(2)}%):</span>
              <span className="font-semibold">{formatCurrency(result.exciseTax)}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total with Tax:</span>
                <span className="font-bold text-primary">{formatCurrency(result.totalPrice)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Maine excise tax is calculated based on the vehicle's MSRP and age. The rate decreases each year:
          First year: 2.4%, Second year: 1.75%, Third year: 1.3%, Fourth year: 1.0%, Fifth year: 0.65%, 
          Sixth year and older: 0.4%. This calculator provides an estimate. Actual excise tax may vary 
          based on local assessments and vehicle condition. Contact your local tax assessor for exact rates.
        </AlertDescription>
      </Alert>
    </div>
  )
}

