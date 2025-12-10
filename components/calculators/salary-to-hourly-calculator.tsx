"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calculator, DollarSign, Info, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { salaryToHourly } from "@/lib/salary"

export function SalaryToHourlyCalculator() {
  const [annualSalary, setAnnualSalary] = useState("")
  const [hoursPerWeek, setHoursPerWeek] = useState("40")
  const [weeksPerYear, setWeeksPerYear] = useState("52")
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback(() => {
    const salary = Number.parseFloat(annualSalary)
    const hours = Number.parseFloat(hoursPerWeek)
    const weeks = Number.parseFloat(weeksPerYear)

    if (!annualSalary) {
      setResult(null)
      setError(null)
      return
    }

    if (isNaN(salary) || salary <= 0) {
      setError("Please enter a valid annual salary greater than 0")
      setResult(null)
      return
    }

    setError(null)
    setResult(salaryToHourly(salary, hours, weeks))
  }, [annualSalary, hoursPerWeek, weeksPerYear])

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
              <CardTitle className="text-card-foreground">Calculate Your Hourly Rate</CardTitle>
              <CardDescription>Enter your annual salary and work schedule</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="annualSalary" className="text-foreground">
                Annual Salary ($)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="annualSalary"
                  type="number"
                  step="1000"
                  min="0"
                  placeholder="52000"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(e.target.value)}
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

      {result !== null && (
        <Card className="shadow-lg border-primary/20 bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Your Hourly Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-2">Equivalent Hourly Rate</p>
              <p className="text-4xl font-bold text-primary">{formatCurrency(result)}</p>
              <p className="text-sm text-muted-foreground mt-2">per hour</p>
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
          <div className="p-4 rounded-xl bg-secondary/50 font-mono text-sm text-foreground">
            Hourly Rate = Annual Salary ÷ (Hours per Week × Weeks per Year)
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Example Calculation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="font-medium text-foreground mb-2">
              If you earn $52,000/year working 40 hours/week for 52 weeks:
            </p>
            <p className="text-muted-foreground">
              $52,000 ÷ (40 × 52) = $52,000 ÷ 2,080 = <span className="font-bold text-primary">$25.00/hour</span>
            </p>
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
              <AccordionTrigger className="text-foreground">Why would I need to know my hourly rate?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Knowing your hourly rate helps you compare job offers, calculate overtime, negotiate freelance work, and
                understand the true value of your time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-foreground">
                Should I include benefits in my calculation?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                This calculator uses your base salary. For total compensation comparison, add the value of benefits
                (health insurance, 401k match, etc.) to your salary first.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
