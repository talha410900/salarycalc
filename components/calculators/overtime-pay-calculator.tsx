"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DollarSign, Info, AlertCircle, Clock } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { calculateOvertimePay, calculateTotalWeeklyWithOvertime } from "@/lib/salary"

interface Results {
  overtimePay: number
  regularPay: number
  totalWeeklyPay: number
  effectiveHourlyRate: number
}

export function OvertimePayCalculator() {
  const [hourlyRate, setHourlyRate] = useState("")
  const [regularHours, setRegularHours] = useState("40")
  const [overtimeHours, setOvertimeHours] = useState("")
  const [multiplier, setMultiplier] = useState("1.5")
  const [result, setResult] = useState<Results | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback(() => {
    const rate = Number.parseFloat(hourlyRate)
    const regular = Number.parseFloat(regularHours)
    const overtime = Number.parseFloat(overtimeHours)
    const mult = Number.parseFloat(multiplier)

    if (!hourlyRate || !overtimeHours) {
      setResult(null)
      setError(null)
      return
    }

    if (isNaN(rate) || rate <= 0) {
      setError("Please enter a valid hourly rate greater than 0")
      setResult(null)
      return
    }

    if (isNaN(overtime) || overtime < 0) {
      setError("Please enter valid overtime hours")
      setResult(null)
      return
    }

    setError(null)
    const overtimePay = calculateOvertimePay(rate, overtime, mult)
    const regularPay = rate * regular
    const totalWeeklyPay = calculateTotalWeeklyWithOvertime(rate, regular, overtime, mult)
    const totalHours = regular + overtime
    const effectiveHourlyRate = totalHours > 0 ? totalWeeklyPay / totalHours : 0

    setResult({
      overtimePay,
      regularPay,
      totalWeeklyPay,
      effectiveHourlyRate,
    })
  }, [hourlyRate, regularHours, overtimeHours, multiplier])

  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border-border">
        <CardHeader className="border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-card-foreground">Calculate Overtime Pay</CardTitle>
              <CardDescription>Enter your hourly rate and overtime hours</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="hourlyRate" className="text-foreground">
                Regular Hourly Rate ($)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="hourlyRate"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="25.00"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="regularHours" className="text-foreground">
                Regular Hours per Week
              </Label>
              <Select value={regularHours} onValueChange={setRegularHours}>
                <SelectTrigger id="regularHours" className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="35">35 hours</SelectItem>
                  <SelectItem value="40">40 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="overtimeHours" className="text-foreground">
                Overtime Hours
              </Label>
              <Input
                id="overtimeHours"
                type="number"
                step="0.5"
                min="0"
                placeholder="10"
                value={overtimeHours}
                onChange={(e) => setOvertimeHours(e.target.value)}
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="multiplier" className="text-foreground">
                Overtime Multiplier
              </Label>
              <Select value={multiplier} onValueChange={setMultiplier}>
                <SelectTrigger id="multiplier" className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.5">1.5x (Time and a Half)</SelectItem>
                  <SelectItem value="2">2x (Double Time)</SelectItem>
                  <SelectItem value="2.5">2.5x (Double Time and a Half)</SelectItem>
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
              Your Pay Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Overtime Pay</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(result.overtimePay)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Regular Pay</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.regularPay)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Weekly Pay</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.totalWeeklyPay)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Effective Hourly</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.effectiveHourlyRate)}</p>
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
            <p>Overtime Pay = Hourly Rate × Overtime Multiplier × Overtime Hours</p>
            <p>Total Weekly Pay = (Regular Hours × Hourly Rate) + Overtime Pay</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Example Calculation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="font-medium text-foreground mb-2">If you earn $25/hour with 10 overtime hours at 1.5x:</p>
            <div className="space-y-1 text-muted-foreground">
              <p>
                Regular Pay: 40 × $25 = <span className="font-bold text-foreground">$1,000.00</span>
              </p>
              <p>
                Overtime Pay: $25 × 1.5 × 10 = <span className="font-bold text-primary">$375.00</span>
              </p>
              <p>
                Total Weekly: $1,000 + $375 = <span className="font-bold text-foreground">$1,375.00</span>
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
              <AccordionTrigger className="text-foreground">When does overtime kick in?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Under federal law (FLSA), overtime applies after 40 hours per week. Some states have daily overtime
                rules (e.g., California requires overtime after 8 hours in a day).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-foreground">What is double time?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Double time (2x) is sometimes paid for working holidays, weekends, or hours beyond a certain threshold.
                Check your employment agreement for specific rules.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
