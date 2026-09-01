"use client"

import { useCallback, useEffect, useState } from "react"
import { AlertCircle, DollarSign, HeartPulse, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/format"
import {
  ADDITIONAL_MEDICARE_RATE,
  ADDITIONAL_MEDICARE_THRESHOLD_SINGLE,
  calculateMedicareOnGross,
  MEDICARE_RATE,
} from "@/lib/tax"

interface MedicareTaxCalculatorProps {
  defaultGross?: number
}

export function MedicareTaxCalculator({ defaultGross = 1800 }: MedicareTaxCalculatorProps) {
  const [grossPay, setGrossPay] = useState(String(defaultGross))
  const [amountType, setAmountType] = useState<"paycheck" | "annual">("paycheck")
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ base: number; additional: number; total: number } | null>(null)

  const calculate = useCallback(() => {
    const gross = Number.parseFloat(grossPay)

    if (!grossPay) {
      setResult(null)
      setError(null)
      return
    }

    if (Number.isNaN(gross) || gross <= 0) {
      setError("Please enter a valid gross pay amount greater than 0")
      setResult(null)
      return
    }

    setError(null)
    setResult(
      calculateMedicareOnGross(gross, {
        additionalThreshold: amountType === "annual" ? ADDITIONAL_MEDICARE_THRESHOLD_SINGLE : undefined,
      })
    )
  }, [grossPay, amountType])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border-border">
        <CardHeader className="border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <HeartPulse className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-card-foreground">Medicare Tax Calculator</CardTitle>
              <CardDescription>Employee Medicare tax is 1.45% of gross wages</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="grossPay" className="text-foreground">
                Gross pay ($)
              </Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="grossPay"
                  type="number"
                  step="50"
                  min="0"
                  placeholder="1800"
                  value={grossPay}
                  onChange={(event) => setGrossPay(event.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="amountType" className="text-foreground">
                This amount is
              </Label>
              <Select value={amountType} onValueChange={(value: "paycheck" | "annual") => setAmountType(value)}>
                <SelectTrigger id="amountType" className="mt-2 h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paycheck">A paycheck (this pay period)</SelectItem>
                  <SelectItem value="annual">Annual wages</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-lg border-primary/20 bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Medicare tax withheld
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-2">Base Medicare (1.45%)</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(result.base)}</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-2">Additional (0.9%)</p>
              <p className="text-3xl font-bold text-foreground">{formatCurrency(result.additional)}</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-2">Total Medicare</p>
              <p className="text-3xl font-bold text-foreground">{formatCurrency(result.total)}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Formula used
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-secondary/50 font-mono text-sm text-foreground space-y-2">
            <p>Medicare tax = Gross pay × {(MEDICARE_RATE * 100).toFixed(2)}%</p>
            <p>
              Additional Medicare = max(0, Annual wages − $
              {ADDITIONAL_MEDICARE_THRESHOLD_SINGLE.toLocaleString("en-US")}) × {(ADDITIONAL_MEDICARE_RATE * 100).toFixed(1)}%
            </p>
          </div>
          <p className="mt-4 text-muted-foreground text-sm">
            Example: $1,800 × 1.45% = $26.10 deducted from that paycheck. Additional Medicare (0.9%) applies only after
            calendar-year wages pass $200,000 for a single filer ($250,000 married filing jointly).
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
