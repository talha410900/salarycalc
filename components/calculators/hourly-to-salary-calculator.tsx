"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSchema } from "@/components/faq-schema"
import { Calculator, DollarSign, Info, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { hourlyToAnnual, hourlyToMonthly, hourlyToWeekly, hourlyToDaily } from "@/lib/salary"

interface Results {
  annual: number
  monthly: number
  weekly: number
  daily: number
}

export function HourlyToSalaryCalculator() {
  const [hourlyRate, setHourlyRate] = useState("")
  const [hoursPerWeek, setHoursPerWeek] = useState("40")
  const [weeksPerYear, setWeeksPerYear] = useState("52")
  const [result, setResult] = useState<Results | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback(() => {
    const rate = Number.parseFloat(hourlyRate)
    const hours = Number.parseFloat(hoursPerWeek)
    const weeks = Number.parseFloat(weeksPerYear)

    // Validation
    if (!hourlyRate) {
      setResult(null)
      setError(null)
      return
    }

    if (isNaN(rate) || rate <= 0) {
      setError("Please enter a valid hourly rate greater than 0")
      setResult(null)
      return
    }

    if (isNaN(hours) || hours <= 0) {
      setError("Please select valid hours per week")
      setResult(null)
      return
    }

    if (isNaN(weeks) || weeks <= 0) {
      setError("Please select valid weeks per year")
      setResult(null)
      return
    }

    setError(null)
    setResult({
      annual: hourlyToAnnual(rate, hours, weeks),
      monthly: hourlyToMonthly(rate, hours, weeks),
      weekly: hourlyToWeekly(rate, hours),
      daily: hourlyToDaily(rate, hours),
    })
  }, [hourlyRate, hoursPerWeek, weeksPerYear])

  // Auto-calculate on input change
  useEffect(() => {
    calculate()
  }, [calculate])

  return (
    <div className="space-y-8">
      {/* Calculator Card */}
      <Card className="shadow-lg border-border">
        <CardHeader className="border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-card-foreground">Calculate Your Salary</CardTitle>
              <CardDescription>Enter your hourly rate and work schedule</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="hourlyRate" className="text-foreground">
                Hourly Rate ($)
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
              <Label htmlFor="hoursPerWeek" className="text-foreground">
                Hours Per Week
              </Label>
              <Select value={hoursPerWeek} onValueChange={setHoursPerWeek}>
                <SelectTrigger id="hoursPerWeek" className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20 hours</SelectItem>
                  <SelectItem value="30">30 hours</SelectItem>
                  <SelectItem value="35">35 hours</SelectItem>
                  <SelectItem value="40">40 hours</SelectItem>
                  <SelectItem value="45">45 hours</SelectItem>
                  <SelectItem value="50">50 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weeksPerYear" className="text-foreground">
                Weeks Per Year
              </Label>
              <Select value={weeksPerYear} onValueChange={setWeeksPerYear}>
                <SelectTrigger id="weeksPerYear" className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="48">48 weeks (4 weeks PTO)</SelectItem>
                  <SelectItem value="50">50 weeks (2 weeks PTO)</SelectItem>
                  <SelectItem value="52">52 weeks (no PTO)</SelectItem>
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

      {/* Results Card */}
      {result && (
        <Card className="shadow-lg border-primary/20 bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Your Salary Results
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Annual</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(result.annual)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Monthly</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.monthly)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Weekly</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.weekly)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Daily</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(result.daily)}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Formula Section */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Formula Used
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 rounded-xl bg-secondary/50 font-mono text-sm text-foreground space-y-2">
            <p>Annual Salary = Hourly Rate × Hours per Week × Weeks per Year</p>
            <p>Monthly Salary = Annual Salary ÷ 12</p>
            <p>Weekly Salary = Hourly Rate × Hours per Week</p>
            <p>Daily Salary = Weekly Salary ÷ 5</p>
          </div>
          <p className="text-muted-foreground text-sm">
            This formula calculates your gross annual salary before taxes and deductions.
          </p>
        </CardContent>
      </Card>

      {/* Example Calculation */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Example Calculation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="font-medium text-foreground mb-2">If you earn $25/hour working 40 hours/week for 52 weeks:</p>
            <div className="space-y-1 text-muted-foreground">
              <p>
                Annual: $25 × 40 × 52 = <span className="font-bold text-primary">$52,000.00</span>
              </p>
              <p>
                Monthly: $52,000 ÷ 12 = <span className="font-bold text-foreground">$4,333.33</span>
              </p>
              <p>
                Weekly: $25 × 40 = <span className="font-bold text-foreground">$1,000.00</span>
              </p>
              <p>
                Daily: $1,000 ÷ 5 = <span className="font-bold text-foreground">$200.00</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <FAQSchema faqs={[
            {
              question: 'Should I account for paid time off?',
              answer: 'Yes! If you receive paid time off (PTO), you\'re still earning during those weeks. Use 52 weeks if you have paid vacation, or subtract unpaid weeks from 52 if your employer doesn\'t offer paid leave.',
            },
            {
              question: 'How do I account for overtime?',
              answer: 'For overtime, use our Overtime Pay Calculator. Overtime is typically paid at 1.5x your regular rate.',
            },
            {
              question: 'Is this my take-home pay?',
              answer: 'No, this calculator shows your gross salary before taxes and deductions. Use our Take-Home Pay Calculator for net income.',
            },
          ]} />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-foreground">Should I account for paid time off?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! If you receive paid time off (PTO), you're still earning during those weeks. Use 52 weeks if you
                have paid vacation, or subtract unpaid weeks from 52 if your employer doesn't offer paid leave.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-foreground">How do I account for overtime?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                For overtime, use our Overtime Pay Calculator. Overtime is typically paid at 1.5x your regular rate.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-foreground">Is this my take-home pay?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No, this calculator shows your gross salary before taxes and deductions. Use our Take-Home Pay
                Calculator for net income.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
