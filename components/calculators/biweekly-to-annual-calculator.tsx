"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CalendarDays, DollarSign, Info, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { biweeklyToAnnual, biweeklyToMonthly } from "@/lib/salary"

interface Results {
  annual: number
  monthly: number
}

export function BiweeklyToAnnualCalculator() {
  const [biweeklyPay, setBiweeklyPay] = useState("")
  const [result, setResult] = useState<Results | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback(() => {
    const biweekly = Number.parseFloat(biweeklyPay)

    if (!biweeklyPay) {
      setResult(null)
      setError(null)
      return
    }

    if (isNaN(biweekly) || biweekly <= 0) {
      setError("Please enter a valid bi-weekly pay amount greater than 0")
      setResult(null)
      return
    }

    setError(null)
    setResult({
      annual: biweeklyToAnnual(biweekly),
      monthly: biweeklyToMonthly(biweekly),
    })
  }, [biweeklyPay])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border-border">
        <CardHeader className="border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-card-foreground">Bi-Weekly to Annual Calculator</CardTitle>
              <CardDescription>Convert your bi-weekly paycheck to annual salary</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="max-w-md">
            <Label htmlFor="biweeklyPay" className="text-foreground">
              Bi-Weekly Pay ($)
            </Label>
            <div className="relative mt-2">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="biweeklyPay"
                type="number"
                step="100"
                min="0"
                placeholder="2000"
                value={biweeklyPay}
                onChange={(e) => setBiweeklyPay(e.target.value)}
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
              Your Annual Salary
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-2">Annual Salary</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(result.annual)}</p>
              <p className="text-xs text-muted-foreground mt-2">26 pay periods × bi-weekly amount</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-2">Monthly Equivalent</p>
              <p className="text-3xl font-bold text-foreground">{formatCurrency(result.monthly)}</p>
              <p className="text-xs text-muted-foreground mt-2">annual ÷ 12 months</p>
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
            <p>Annual Salary = Bi-Weekly Pay × 26</p>
            <p>Monthly Salary = Annual Salary ÷ 12</p>
          </div>
          <p className="mt-4 text-muted-foreground text-sm">
            There are 26 bi-weekly pay periods in a year (52 weeks ÷ 2).
          </p>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Example Calculation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="font-medium text-foreground mb-2">If your bi-weekly paycheck is $2,000:</p>
            <div className="space-y-1 text-muted-foreground">
              <p>
                Annual: $2,000 × 26 = <span className="font-bold text-primary">$52,000.00</span>
              </p>
              <p>
                Monthly: $52,000 ÷ 12 = <span className="font-bold text-foreground">$4,333.33</span>
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
              <AccordionTrigger className="text-foreground">Why 26 pay periods and not 24?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Bi-weekly means every two weeks, which results in 26 pay periods per year (52 weeks ÷ 2 = 26).
                Semi-monthly pay (twice per month) has 24 pay periods.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-foreground">Will I get 3 paychecks some months?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! With bi-weekly pay, you'll receive 3 paychecks in 2 months each year instead of the usual 2. This
                can be great for extra savings or paying down debt.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
