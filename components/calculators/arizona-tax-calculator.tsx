"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Building2, DollarSign, Info, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { calculateArizonaTax, ARIZONA_TAX_RATES } from "@/lib/tax"

export function ArizonaTaxCalculator() {
  const [grossPay, setGrossPay] = useState("")
  const [selectedRate, setSelectedRate] = useState("2.5")
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback(() => {
    const gross = Number.parseFloat(grossPay)
    const rate = Number.parseFloat(selectedRate)

    if (!grossPay) {
      setResult(null)
      setError(null)
      return
    }

    if (isNaN(gross) || gross <= 0) {
      setError("Please enter a valid gross pay greater than 0")
      setResult(null)
      return
    }

    setError(null)
    setResult(calculateArizonaTax(gross, rate))
  }, [grossPay, selectedRate])

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
              <CardTitle className="text-card-foreground">Arizona State Tax Calculator</CardTitle>
              <CardDescription>Calculate your Arizona state income tax withholding</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="grossPay" className="text-foreground">
                Gross Pay ($)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="grossPay"
                  type="number"
                  step="100"
                  min="0"
                  placeholder="5000"
                  value={grossPay}
                  onChange={(e) => setGrossPay(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate" className="text-foreground">
                Withholding Percentage
              </Label>
              <Select value={selectedRate} onValueChange={setSelectedRate}>
                <SelectTrigger id="taxRate" className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ARIZONA_TAX_RATES.map((rate) => (
                    <SelectItem key={rate} value={rate.toString()}>
                      {rate}%
                    </SelectItem>
                  ))}
                  <SelectItem value="2.5">2.5% (Flat rate 2023+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary/50 text-sm text-muted-foreground">
            <p>Arizona has a flat 2.5% income tax rate as of 2023. Previous rates shown for historical calculations.</p>
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
              Arizona Tax Withholding
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-2">State Tax Withheld</p>
              <p className="text-3xl font-bold text-destructive">{formatCurrency(result)}</p>
              <p className="text-xs text-muted-foreground mt-2">at {selectedRate}% rate</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">After State Tax</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(Number.parseFloat(grossPay) - result)}</p>
              <p className="text-xs text-muted-foreground mt-2">before federal taxes</p>
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
            Arizona State Tax = Gross Pay × (Selected Percentage ÷ 100)
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Example Calculation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="font-medium text-foreground mb-2">If your gross pay is $5,000 at 2.5%:</p>
            <p className="text-muted-foreground">
              $5,000 × 0.025 = <span className="font-bold text-primary">$125.00</span> Arizona state tax
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
              <AccordionTrigger className="text-foreground">Why can I select different rates?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Arizona allows employees to elect a withholding percentage on Form A-4. While the flat rate is 2.5%,
                some may have elected a different percentage in the past.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-foreground">
                Is Arizona tax in addition to federal tax?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, Arizona state tax is separate from and in addition to federal income tax. Use our Federal Tax
                Calculator to estimate your total tax burden.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
