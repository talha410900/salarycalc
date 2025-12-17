"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Home } from "lucide-react"
import { formatCurrency } from "@/lib/format"

export function MortgageTaxCalculator() {
  const [loanAmount, setLoanAmount] = useState("")
  const [mortgageTaxRate, setMortgageTaxRate] = useState("0.5") // Default 0.5%
  const [result, setResult] = useState<{
    mortgageTax: number
    totalCost: number
  } | null>(null)

  const calculate = useCallback(() => {
    const loan = Number.parseFloat(loanAmount)
    const rate = Number.parseFloat(mortgageTaxRate) / 100

    if (!loanAmount || isNaN(loan) || loan <= 0) {
      setResult(null)
      return
    }

    const mortgageTax = loan * rate
    const totalCost = loan + mortgageTax

    setResult({
      mortgageTax,
      totalCost,
    })
  }, [loanAmount, mortgageTaxRate])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Tax Mortgage Calculator 2025-2026
          </CardTitle>
          <CardDescription>
            Calculate mortgage tax (mortgage recording tax) on your home loan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="loan-amount">Loan Amount</Label>
              <Input
                id="loan-amount"
                type="number"
                placeholder="0.00"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter the mortgage loan amount.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Mortgage Tax Rate (%)</Label>
              <Input
                id="tax-rate"
                type="number"
                placeholder="0.5"
                value={mortgageTaxRate}
                onChange={(e) => setMortgageTaxRate(e.target.value)}
                step="0.01"
              />
              <p className="text-xs text-muted-foreground">
                Enter the mortgage tax rate (typically 0.5% to 2.05% depending on state/county).
              </p>
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
              <span className="text-muted-foreground">Mortgage Tax ({(Number.parseFloat(mortgageTaxRate)).toFixed(2)}%):</span>
              <span className="font-semibold">{formatCurrency(result.mortgageTax)}</span>
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
          Mortgage tax (also called mortgage recording tax) is a one-time tax charged when you record a mortgage with the local government. 
          Rates vary by state and county, typically ranging from 0.5% to 2.05% of the loan amount. 
          This calculator provides an estimate. Check with your local recorder's office for exact rates in your area.
        </AlertDescription>
      </Alert>
    </div>
  )
}

