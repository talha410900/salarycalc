import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { FEDERAL_TAX_BRACKETS_2025, STANDARD_DEDUCTIONS_2025 } from '@/lib/tax'
import { STATE_TAX_DATA, ALL_STATES } from '@/lib/state-tax-data'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const metadata: Metadata = {
  title: '2025 Tax Brackets - Federal & State Income Tax Rates | SalaryCalc',
  description: 'Complete guide to 2025 federal and state income tax brackets. View tax rates for all 50 states, filing statuses, and income thresholds.',
  keywords: 'tax brackets 2025, federal tax brackets, state tax brackets, income tax rates, tax calculator',
  openGraph: {
    title: '2025 Tax Brackets - Federal & State Income Tax Rates',
    description: 'Complete guide to 2025 federal and state income tax brackets for all US states.',
    type: 'website',
  },
}

function formatCurrency(amount: number): string {
  if (amount === Number.POSITIVE_INFINITY) return '∞'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatPercent(rate: number): string {
  return `${(rate * 100).toFixed(2)}%`
}

export default function TaxBracketsPage() {
  const noTaxStates = ALL_STATES.filter((s) => s.type === 'None')
  const flatTaxStates = ALL_STATES.filter((s) => s.type === 'Flat')
  const graduatedTaxStates = ALL_STATES.filter((s) => s.type === 'Graduated')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
              2025 Tax Brackets
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Complete reference guide to federal and state income tax brackets, rates, and thresholds for 2025
            </p>
          </div>

          <Tabs defaultValue="federal" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="federal">Federal</TabsTrigger>
              <TabsTrigger value="states">All States</TabsTrigger>
              <TabsTrigger value="flat">Flat Tax States</TabsTrigger>
              <TabsTrigger value="no-tax">No Tax States</TabsTrigger>
            </TabsList>

            <TabsContent value="federal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Federal Income Tax Brackets 2025</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Standard Deduction: Single - {formatCurrency(STANDARD_DEDUCTIONS_2025.single)}, Married Filing Jointly - {formatCurrency(STANDARD_DEDUCTIONS_2025.married)}
                  </p>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="single" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="single">Single</TabsTrigger>
                      <TabsTrigger value="married">Married Filing Jointly</TabsTrigger>
                    </TabsList>
                    <TabsContent value="single">
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Taxable Income Range</TableHead>
                              <TableHead className="text-right">Tax Rate</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {FEDERAL_TAX_BRACKETS_2025.single.map((bracket, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {formatCurrency(bracket.min)} - {bracket.max === Number.POSITIVE_INFINITY ? 'Over' : formatCurrency(bracket.max)}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                  {formatPercent(bracket.rate)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    <TabsContent value="married">
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Taxable Income Range</TableHead>
                              <TableHead className="text-right">Tax Rate</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {FEDERAL_TAX_BRACKETS_2025.married.map((bracket, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {formatCurrency(bracket.min)} - {bracket.max === Number.POSITIVE_INFINITY ? 'Over' : formatCurrency(bracket.max)}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                  {formatPercent(bracket.rate)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="states" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ALL_STATES.sort((a, b) => a.name.localeCompare(b.name)).map((state) => (
                  <Card key={state.slug} className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{state.name}</CardTitle>
                        <Badge variant={state.type === 'None' ? 'outline' : state.type === 'Flat' ? 'secondary' : 'default'}>
                          {state.type === 'None' ? 'No Tax' : state.type === 'Flat' ? 'Flat' : 'Graduated'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {state.type === 'None' && (
                        <p className="text-sm text-muted-foreground">{state.notes}</p>
                      )}
                      {state.type === 'Flat' && state.rate !== undefined && (
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">
                            Flat Rate: {formatPercent(state.rate)}
                          </p>
                          {state.notes && (
                            <p className="text-xs text-muted-foreground">{state.notes}</p>
                          )}
                        </div>
                      )}
                      {state.type === 'Graduated' && state.brackets && (
                        <div className="space-y-2">
                          <Tabs defaultValue="single" className="w-full">
                            <TabsList className="w-full h-8">
                              <TabsTrigger value="single" className="text-xs">Single</TabsTrigger>
                              <TabsTrigger value="married" className="text-xs">Married</TabsTrigger>
                            </TabsList>
                            <TabsContent value="single" className="mt-2">
                              <div className="space-y-1 max-h-48 overflow-y-auto">
                                {state.brackets.single.map((bracket, idx) => {
                                  const nextThreshold = state.brackets!.single[idx + 1]?.threshold ?? Number.POSITIVE_INFINITY
                                  return (
                                    <div key={idx} className="text-xs flex justify-between py-1 border-b border-border/50 last:border-0">
                                      <span className="text-muted-foreground">
                                        {formatCurrency(bracket.threshold)}+
                                      </span>
                                      <span className="font-semibold">{formatPercent(bracket.rate)}</span>
                                    </div>
                                  )
                                })}
                              </div>
                            </TabsContent>
                            <TabsContent value="married" className="mt-2">
                              <div className="space-y-1 max-h-48 overflow-y-auto">
                                {state.brackets.married_joint.map((bracket, idx) => {
                                  const nextThreshold = state.brackets!.married_joint[idx + 1]?.threshold ?? Number.POSITIVE_INFINITY
                                  return (
                                    <div key={idx} className="text-xs flex justify-between py-1 border-b border-border/50 last:border-0">
                                      <span className="text-muted-foreground">
                                        {formatCurrency(bracket.threshold)}+
                                      </span>
                                      <span className="font-semibold">{formatPercent(bracket.rate)}</span>
                                    </div>
                                  )
                                })}
                              </div>
                            </TabsContent>
                          </Tabs>
                          {state.notes && (
                            <p className="text-xs text-muted-foreground mt-2">{state.notes}</p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="flat" className="space-y-4">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-foreground mb-2">Flat Tax States</h2>
                <p className="text-sm text-muted-foreground">
                  These states apply a single tax rate to all taxable income, regardless of income level.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flatTaxStates.map((state) => (
                  <Card key={state.slug}>
                    <CardHeader>
                      <CardTitle className="text-lg">{state.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary mb-2">
                        {state.rate !== undefined ? formatPercent(state.rate) : 'N/A'}
                      </div>
                      {state.notes && (
                        <p className="text-sm text-muted-foreground">{state.notes}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="no-tax" className="space-y-4">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-foreground mb-2">States with No Income Tax</h2>
                <p className="text-sm text-muted-foreground">
                  These states do not levy a state income tax on wages or earned income.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {noTaxStates.map((state) => (
                  <Card key={state.slug} className="border-emerald-500/20 bg-emerald-500/5">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{state.name}</CardTitle>
                        <Badge variant="outline" className="border-emerald-600/50 text-emerald-800 dark:text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30">
                          No Tax
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{state.notes}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

