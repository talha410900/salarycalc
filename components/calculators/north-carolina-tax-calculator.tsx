"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Building2, DollarSign, Info, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { calculateNorthCarolinaTax, NC_TAX_RATE } from "@/lib/tax"

interface Results {
  stateTax: number
  effectiveRate: number
  afterTax: number
}

export function NorthCarolinaTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState("")
  const [result, setResult] = useState<Results | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback(() => {
    const gross = Number.parseFloat(grossIncome)

    if (!grossIncome) {
      setResult(null)
      setError(null)
      return
    }

    if (isNaN(gross) || gross <= 0) {
      setError("Please enter a valid gross income greater than 0")
      setResult(null)
      return
    }

    setError(null)
    const stateTax = calculateNorthCarolinaTax(gross)
    const effectiveRate = gross > 0 ? (stateTax / gross) * 100 : 0
    const afterTax = gross - stateTax

    setResult({
      stateTax,
      effectiveRate,
      afterTax,
    })
  }, [grossIncome])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border-border">
        <CardHeader className="border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-card-foreground">North Carolina Tax Calculator</CardTitle>
              <CardDescription>Calculate your NC flat state income tax</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="max-w-md">
            <Label htmlFor="grossIncome" className="text-foreground">
              Annual Gross Income ($)
            </Label>
            <div className="relative mt-2">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="grossIncome"
                type="number"
                step="1000"
                min="0"
                placeholder="60000"
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary/50 text-sm text-muted-foreground">
            <p>
              North Carolina has a flat income tax rate of {(NC_TAX_RATE * 100).toFixed(2)}% (2025-2026). Standard deduction
              of $14,500 applied.
            </p>
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
              North Carolina Tax Results
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">NC State Tax</p>
              <p className="text-2xl font-bold text-destructive">{formatCurrency(result.stateTax)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Effective Rate</p>
              <p className="text-2xl font-bold text-foreground">{result.effectiveRate.toFixed(2)}%</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">After NC Tax</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(result.afterTax)}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Formula Used
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-secondary/50 font-mono text-sm text-foreground space-y-2">
            <p>Taxable Income = Gross Income − Standard Deduction ($14,500)</p>
            <p>NC State Tax = Taxable Income × 4.5%</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Example Calculation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="font-medium text-foreground mb-2">If your annual income is $60,000:</p>
            <div className="space-y-1 text-muted-foreground">
              <p>Taxable income: $60,000 - $14,500 = $45,500</p>
              <p>
                NC tax: $45,500 × 4.5% = <span className="font-bold text-primary">$2,047.50</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-foreground">Why is NC tax simpler than other states?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                North Carolina uses a flat tax system, meaning everyone pays the same percentage regardless of income.
                This makes calculations straightforward compared to states with progressive brackets.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-foreground">Are there any local taxes in NC?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                North Carolina does not have local income taxes. However, counties may have different sales tax rates.
                This calculator only covers state income tax.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
