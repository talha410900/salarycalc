"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calculator, DollarSign, Info, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { monthlyToYearly, monthlyToWeekly, monthlyToHourly } from "@/lib/salary"

interface Results {
  yearly: number
  weekly: number
  hourly: number
}

export function MonthlyToYearlyCalculator() {
  const [monthlySalary, setMonthlySalary] = useState("")
  const [result, setResult] = useState<Results | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback(() => {
    const monthly = Number.parseFloat(monthlySalary)

    if (!monthlySalary) {
      setResult(null)
      setError(null)
      return
    }

    if (isNaN(monthly) || monthly <= 0) {
      setError("Please enter a valid monthly salary greater than 0")
      setResult(null)
      return
    }

    setError(null)
    setResult({
      yearly: monthlyToYearly(monthly),
      weekly: monthlyToWeekly(monthly),
      hourly: monthlyToHourly(monthly, 40),
    })
  }, [monthlySalary])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border-border">
        <CardHeader className="border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-card-foreground">Monthly to Yearly Converter</CardTitle>
              <CardDescription>Convert your monthly salary to annual income</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="max-w-md">
            <Label htmlFor="monthlySalary" className="text-foreground">
              Monthly Salary ($)
            </Label>
            <div className="relative mt-2">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="monthlySalary"
                type="number"
                step="100"
                min="0"
                placeholder="4500"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
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
              Your Income Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Yearly Salary</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(result.yearly)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Weekly Salary</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.weekly)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Hourly Rate (40 hrs/wk)</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.hourly)}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Formulas Used
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-secondary/50 font-mono text-sm text-foreground space-y-2">
            <p>Yearly Salary = Monthly Salary × 12</p>
            <p>Weekly Salary = Yearly Salary ÷ 52</p>
            <p>Hourly Rate = Weekly Salary ÷ 40</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Example Calculation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="font-medium text-foreground mb-2">If you earn $4,500/month:</p>
            <div className="space-y-1 text-muted-foreground">
              <p>
                Yearly: $4,500 × 12 = <span className="font-bold text-primary">$54,000.00</span>
              </p>
              <p>
                Weekly: $54,000 ÷ 52 = <span className="font-bold text-foreground">$1,038.46</span>
              </p>
              <p>
                Hourly: $1,038.46 ÷ 40 = <span className="font-bold text-foreground">$25.96</span>
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
              <AccordionTrigger className="text-foreground">
                Why is my hourly rate lower than expected?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The hourly rate assumes a 40-hour work week. If you work fewer hours, your effective hourly rate would
                be higher.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-foreground">Is this before or after taxes?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                This calculator works with gross income (before taxes). For take-home pay calculations, use our
                Take-Home Pay Calculator.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
