"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Home } from "lucide-react"
import { formatCurrency } from "@/lib/format"

// NY Mortgage Tax rates by county (2025-2026)
const NY_MORTGAGE_TAX_RATES: Record<string, number> = {
  "New York City": 1.8, // 1.8% for NYC
  "Nassau": 1.05, // 1.05% for Nassau County
  "Suffolk": 1.05, // 1.05% for Suffolk County
  "Westchester": 1.05, // 1.05% for Westchester County
  "Other NY": 0.5, // 0.5% for other NY counties
}

export function NYMortgageTaxCalculator() {
  const [loanAmount, setLoanAmount] = useState("")
  const [county, setCounty] = useState<keyof typeof NY_MORTGAGE_TAX_RATES>("New York City")
  const [result, setResult] = useState<{
    mortgageTax: number
    totalCost: number
  } | null>(null)

  const calculate = useCallback(() => {
    const loan = Number.parseFloat(loanAmount)

    if (!loanAmount || isNaN(loan) || loan <= 0) {
      setResult(null)
      return
    }

    const rate = NY_MORTGAGE_TAX_RATES[county] / 100
    const mortgageTax = loan * rate
    const totalCost = loan + mortgageTax

    setResult({
      mortgageTax,
      totalCost,
    })
  }, [loanAmount, county])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            NY Mortgage Tax Calculator 2025-2026
          </CardTitle>
          <CardDescription>
            Calculate New York mortgage recording tax on your home loan by county.
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="county">County</Label>
              <Select value={county} onValueChange={(v) => setCounty(v as any)}>
                <SelectTrigger id="county">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New York City">New York City (1.8%)</SelectItem>
                  <SelectItem value="Nassau">Nassau County (1.05%)</SelectItem>
                  <SelectItem value="Suffolk">Suffolk County (1.05%)</SelectItem>
                  <SelectItem value="Westchester">Westchester County (1.05%)</SelectItem>
                  <SelectItem value="Other NY">Other NY Counties (0.5%)</SelectItem>
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
              <span className="text-muted-foreground">NY Mortgage Tax ({(NY_MORTGAGE_TAX_RATES[county]).toFixed(2)}%):</span>
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
          New York mortgage recording tax rates vary by county. New York City has the highest rate at 1.8%, 
          while Nassau, Suffolk, and Westchester counties charge 1.05%. Other New York counties typically charge 0.5%. 
          This calculator provides estimates. Check with your local recorder's office for exact rates.
        </AlertDescription>
      </Alert>
    </div>
  )
}

