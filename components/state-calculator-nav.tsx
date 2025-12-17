/**
 * State Calculator Navigation Component
 * 
 * Displays available calculator types for a state with links to each calculator.
 * Use this component on the state income tax page to show other available calculators.
 */

"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getStateCalculators, getCalculatorTypeMetadata, getStateCalculatorUrl } from "@/lib/state-calculator-types"
import { Calculator, Receipt, ShoppingCart, Car, Home } from "lucide-react"

interface StateCalculatorNavProps {
  stateSlug: string
  stateName: string
  currentType?: string // Current calculator type to highlight
}

const calculatorIcons: Record<string, typeof Calculator> = {
  "income-tax": Calculator,
  "withholding": Receipt,
  "sales-tax": ShoppingCart,
  "vehicle-tax": Car,
  "property-tax": Home,
}

export function StateCalculatorNav({ stateSlug, stateName, currentType = "income-tax" }: StateCalculatorNavProps) {
  const availableCalculators = getStateCalculators(stateSlug)

  // Don't show if only income tax is available
  if (availableCalculators.length <= 1) {
    return null
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{stateName} Tax Calculators</CardTitle>
        <CardDescription>
          Choose a calculator type to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {availableCalculators.map((type) => {
            const metadata = getCalculatorTypeMetadata(type)
            const Icon = calculatorIcons[type] || Calculator
            const isActive = type === currentType
            const url = getStateCalculatorUrl(stateSlug, type)

            return (
              <Link
                key={type}
                href={url}
                className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                  isActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <div className="flex-1">
                  <div className={`font-semibold ${isActive ? "text-primary" : "text-foreground"}`}>
                    {metadata.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{metadata.description}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

