'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { STATE_TAX_DATA } from '@/lib/state-tax-data'
import { calculateFederalTax, calculateSocialSecurity, calculateMedicare } from '@/lib/tax'
import { formatCurrency } from '@/lib/format'
import { AdUnit } from '@/components/ad-unit'
import { ShareResults } from '@/components/share-results'

export default function StateTaxComparisonClient() {
  const [salary, setSalary] = useState<number>(75000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [stateA, setStateA] = useState<string>('california')
  const [stateB, setStateB] = useState<string>('texas')

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "State Tax Comparison Tool",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "description": "Compare state income taxes and take-home pay between any two US states.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": "State tax comparison, Take-home pay calculation, Relocation savings estimator"
  }

  // Calculate taxes for a given state
  const calculateStateTax = (stateCode: string, income: number, status: 'single' | 'married') => {
    const stateData = STATE_TAX_DATA[stateCode]
    if (!stateData) return 0

    if (stateData.type === 'None') return 0
    if (stateData.type === 'Flat') return income * (stateData.rate || 0)
    
    if (stateData.brackets) {
      const brackets = status === 'single' ? stateData.brackets.single : stateData.brackets.married_joint
      
      // Generic Bracket Calculator
      let calculatedTax = 0
      for (let i = 0; i < brackets.length; i++) {
        const bracket = brackets[i]
        const nextBracket = brackets[i + 1]
        const min = bracket.threshold
        const max = nextBracket ? nextBracket.threshold : Infinity
        const rate = bracket.rate
        
        if (income > min) {
          const taxableAmount = Math.min(income, max) - min
          calculatedTax += taxableAmount * rate
        }
      }
      return calculatedTax
    }
    
    return 0
  }

  const federalTax = calculateFederalTax(salary, filingStatus)
  const ficaTax = calculateSocialSecurity(salary) + calculateMedicare(salary)
  
  const stateATax = calculateStateTax(stateA, salary, filingStatus)
  const stateBTax = calculateStateTax(stateB, salary, filingStatus)
  
  const takeHomeA = salary - federalTax - ficaTax - stateATax
  const takeHomeB = salary - federalTax - ficaTax - stateBTax
  
  const difference = takeHomeB - takeHomeA
  const betterState = difference > 0 ? STATE_TAX_DATA[stateB].name : STATE_TAX_DATA[stateA].name
  const savings = Math.abs(difference)

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
              State Tax Comparison Tool
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Thinking of moving? Compare state taxes side-by-side to see how much you could save (or lose).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Inputs */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Annual Salary</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                      <Input 
                        type="number" 
                        value={salary} 
                        onChange={(e) => setSalary(Number(e.target.value))} 
                        className="pl-7"
                      />
                    </div>
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
                    <Label>Current State</Label>
                    <Select value={stateA} onValueChange={setStateA}>
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

                  <div className="space-y-2">
                    <Label>Target State</Label>
                    <Select value={stateB} onValueChange={setStateB}>
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

              {/* Ad Unit - Sidebar */}
              <AdUnit slot="9876543210" format="rectangle" />
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">The Verdict</h2>
                    <p className="text-lg">
                      Checking potential savings...
                    </p>
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm inline-block">
                      <span className="text-gray-500">You would save</span>
                      <div className="text-4xl font-bold text-green-600 dark:text-green-400 my-1">
                        {formatCurrency(savings)}
                      </div>
                      <span className="text-gray-500">per year by living in <strong>{betterState}</strong></span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* State A Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>{STATE_TAX_DATA[stateA].name}</CardTitle>
                    <CardDescription>Current Location</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Gross Pay</span>
                      <span className="font-medium">{formatCurrency(salary)}</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                      <span>Federal Tax</span>
                      <span>-{formatCurrency(federalTax)}</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                      <span>FICA Tax</span>
                      <span>-{formatCurrency(ficaTax)}</span>
                    </div>
                    <div className="flex justify-between text-red-500 font-semibold bg-red-50 dark:bg-red-900/20 p-2 rounded">
                      <span>State Tax</span>
                      <span>-{formatCurrency(stateATax)}</span>
                    </div>
                    <div className="pt-3 border-t flex justify-between text-lg font-bold">
                      <span>Take Home</span>
                      <span className="text-primary">{formatCurrency(takeHomeA)}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* State B Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>{STATE_TAX_DATA[stateB].name}</CardTitle>
                    <CardDescription>Target Location</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Gross Pay</span>
                      <span className="font-medium">{formatCurrency(salary)}</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                      <span>Federal Tax</span>
                      <span>-{formatCurrency(federalTax)}</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                      <span>FICA Tax</span>
                      <span>-{formatCurrency(ficaTax)}</span>
                    </div>
                    <div className="flex justify-between text-red-500 font-semibold bg-red-50 dark:bg-red-900/20 p-2 rounded">
                      <span>State Tax</span>
                      <span>-{formatCurrency(stateBTax)}</span>
                    </div>
                    <div className="pt-3 border-t flex justify-between text-lg font-bold">
                      <span>Take Home</span>
                      <span className="text-primary">{formatCurrency(takeHomeB)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Share Results */}
                <ShareResults 
                  title={`State Tax Comparison: ${STATE_TAX_DATA[stateA].name} vs ${STATE_TAX_DATA[stateB].name}`}
                  resultSummary={`I calculated the tax difference between ${STATE_TAX_DATA[stateA].name} and ${STATE_TAX_DATA[stateB].name}. I could save ${formatCurrency(savings)} by moving! Check your own difference:`}
                />

              {/* Ad Unit - In Content */}
              <AdUnit slot="1234567890" format="horizontal" />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
