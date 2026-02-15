'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { STATE_TAX_DATA } from '@/lib/state-tax-data'
import { calculateFederalTax, calculateSocialSecurity, calculateMedicare, calculateStateTax } from '@/lib/tax'
import { formatCurrency } from '@/lib/format'
import { AdUnit } from '@/components/ad-unit'
import { ShareResults } from '@/components/share-results'

export default function ReverseSalaryCalculatorClient() {
  const [targetTakeHome, setTargetTakeHome] = useState<number>(5000)
  const [frequency, setFrequency] = useState<'annual' | 'monthly' | 'biweekly'>('monthly')
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [state, setState] = useState<string>('california')
  const [requiredGross, setRequiredGross] = useState<number>(0)
  const [breakdown, setBreakdown] = useState({
    federal: 0,
    state: 0,
    fica: 0,
    totalTax: 0
  })

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Reverse Salary Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "description": "Calculate required gross salary from your desired take-home pay.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": "Reverse tax calculation, Goal-based salary estimation, Federal and State tax reverse"
  }

  // Conversion for input to annual
  const getAnnualTarget = () => {
    if (frequency === 'monthly') return targetTakeHome * 12
    if (frequency === 'biweekly') return targetTakeHome * 26
    return targetTakeHome
  }

  const calculateTaxesForGross = (gross: number) => {
    const federal = calculateFederalTax(gross, filingStatus)
    const fica = calculateSocialSecurity(gross) + calculateMedicare(gross)
    const stateTax = calculateStateTax(state, gross, filingStatus)
    return {
      federal,
      fica,
      state: stateTax,
      total: federal + fica + stateTax,
      takeHome: gross - (federal + fica + stateTax)
    }
  }

  useEffect(() => {
    // Binary Search to find required gross
    const targetAnnual = getAnnualTarget()
    
    let low = targetAnnual
    let high = targetAnnual * 2.5 // Rough upper bound estimate
    let mid = 0
    let iterations = 0
    
    // Safety break
    while (low <= high && iterations < 50) {
      mid = (low + high) / 2
      const result = calculateTaxesForGross(mid)
      
      if (Math.abs(result.takeHome - targetAnnual) < 1) {
        break // Found it within $1
      }
      
      if (result.takeHome < targetAnnual) {
        low = mid + 1 // Need more gross
      } else {
        high = mid - 1 // Need less gross
      }
      iterations++
    }
    
    const finalGross = mid
    const taxDetails = calculateTaxesForGross(finalGross)
    
    setRequiredGross(finalGross)
    setBreakdown({
      federal: taxDetails.federal,
      state: taxDetails.state,
      fica: taxDetails.fica,
      totalTax: taxDetails.total
    })
    
  }, [targetTakeHome, frequency, filingStatus, state])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Reverse Salary Calculator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find out exactly how much you need to earn to hit your take-home pay goal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar with Inputs & Ad */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Goal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Desired Take-Home Pay</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                      <Input 
                        type="number" 
                        value={targetTakeHome} 
                        onChange={(e) => setTargetTakeHome(Number(e.target.value))} 
                        className="pl-7"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select value={frequency} onValueChange={(v: any) => setFrequency(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Yearly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Filing Status</Label>
                    <Select value={filingStatus} onValueChange={(v: any) => setFilingStatus(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married Filing Jointly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>State</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(STATE_TAX_DATA).map(([key, data]) => (
                          <SelectItem key={key} value={key}>{data.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <AdUnit slot="5556667777" format="rectangle" />
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-8 pb-8 text-center">
                  <h2 className="text-2xl font-semibold mb-2 text-muted-foreground">You need an annual salary of</h2>
                  <div className="text-5xl md:text-6xl font-bold text-primary my-4">
                    {formatCurrency(requiredGross)}
                  </div>
                  <p className="text-lg text-muted-foreground">
                    To take home <strong>{formatCurrency(targetTakeHome)}</strong> {frequency} in {STATE_TAX_DATA[state].name}
                  </p>
                </CardContent>
              </Card>

              {/* Tax Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Where the money goes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Gross Salary Needed</span>
                      <span className="font-bold">{formatCurrency(requiredGross)}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-red-500">
                        <span>Federal Tax</span>
                        <span>-{formatCurrency(breakdown.federal)}</span>
                      </div>
                      <div className="flex justify-between text-red-500">
                        <span>FICA (Social Security + Medicare)</span>
                        <span>-{formatCurrency(breakdown.fica)}</span>
                      </div>
                      <div className="flex justify-between text-red-500">
                        <span>State Tax ({STATE_TAX_DATA[state].name})</span>
                        <span>-{formatCurrency(breakdown.state)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-2 border-t mt-4 bg-green-50 dark:bg-green-900/20 px-3 rounded">
                      <span className="font-bold text-lg">Net Pay (Annual)</span>
                      <span className="font-bold text-lg text-green-600 dark:text-green-400">
                        {formatCurrency(requiredGross - breakdown.totalTax)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ShareResults 
                title={`Reverse Salary Calculator: I need ${formatCurrency(requiredGross)}`}
                resultSummary={`To take home ${formatCurrency(targetTakeHome)} ${frequency}, I need a salary of ${formatCurrency(requiredGross)} in ${STATE_TAX_DATA[state].name}. Calculate your number:`}
              />
              
              <AdUnit slot="9988776655" format="horizontal" />
              
              <div className="prose dark:prose-invert max-w-none mt-8">
                <h3>How to calculate required salary?</h3>
                <p>
                  This tool works backward from your desired take-home pay. It accounts for Federal income tax brackets, 
                  FICA taxes (Social Security & Medicare), and State income taxes to find the exact gross salary number 
                  that nets you your goal amount.
                </p>
                <p>
                  Whether you're negotiating a new job offer or planning a budget, knowing the "Pre-Tax" number is crucial 
                  because taxes can take 20-40% of your paycheck depending on your state and income level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
