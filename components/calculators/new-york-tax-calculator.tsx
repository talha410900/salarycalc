"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Building2, DollarSign, Info, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { calculateNewYorkTax, NY_STANDARD_DEDUCTION } from "@/lib/tax"

interface Results {
  stateTax: number
  effectiveRate: number
  afterTax: number
}

export function NewYorkTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState("")
  const [filingStatus, setFilingStatus] = useState<"single" | "married">("single")
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
    const stateTax = calculateNewYorkTax(gross, filingStatus)
    const effectiveRate = gross > 0 ? (stateTax / gross) * 100 : 0
    const afterTax = gross - stateTax

    setResult({
      stateTax,
      effectiveRate,
      afterTax,
    })
  }, [grossIncome, filingStatus])

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
              <CardTitle className="text-card-foreground">New York State Tax Calculator</CardTitle>
              <CardDescription>Calculate your NY state income tax using progressive brackets</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="grossIncome" className="text-foreground">
                Annual Gross Income ($)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="grossIncome"
                  type="number"
                  step="1000"
                  min="0"
                  placeholder="75000"
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filingStatus" className="text-foreground">
                Filing Status
              </Label>
              <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as "single" | "married")}>
                <SelectTrigger id="filingStatus" className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married Filing Jointly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary/50 text-sm text-muted-foreground">
            <p>
              NY standard deduction: {formatCurrency(NY_STANDARD_DEDUCTION[filingStatus])} ({filingStatus})
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
              New York Tax Results
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">NY State Tax</p>
              <p className="text-2xl font-bold text-destructive">{formatCurrency(result.stateTax)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Effective Rate</p>
              <p className="text-2xl font-bold text-foreground">{result.effectiveRate.toFixed(2)}%</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">After NY Tax</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(result.afterTax)}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            NY Tax Brackets (2025-2026)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-secondary/50 text-sm text-foreground">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2">Single Filers:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>4% on first $8,500</li>
                  <li>4.5% on $8,500 - $11,700</li>
                  <li>5.25% on $11,700 - $13,900</li>
                  <li>5.85% on $13,900 - $80,650</li>
                  <li>6.25% on $80,650 - $215,400</li>
                  <li>6.85% on $215,400+</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Married Filing Jointly:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>4% on first $17,150</li>
                  <li>4.5% on $17,150 - $23,600</li>
                  <li>5.25% on $23,600 - $27,900</li>
                  <li>5.85% on $27,900 - $161,550</li>
                  <li>6.25% on $161,550 - $323,200</li>
                  <li>6.85% on $323,200+</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Example Calculation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="font-medium text-foreground mb-2">Annual income of $75,000 (Single):</p>
            <div className="space-y-1 text-muted-foreground text-sm">
              <p>Taxable income: $75,000 - $8,000 = $67,000</p>
              <p>Tax calculation using progressive brackets:</p>
              <p className="font-bold text-primary pt-1">Estimated NY tax: ~$3,640</p>
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
              <AccordionTrigger className="text-foreground">Does this include NYC tax?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No, this calculator only includes NY state tax. New York City residents also pay an additional city
                income tax of 3.078% to 3.876%.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-foreground">What about Yonkers tax?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yonkers residents pay an additional surcharge equal to 16.75% of their NY state tax liability. This is
                not included in this calculator.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
