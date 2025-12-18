"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Calculator, TrendingUp, type LucideIcon } from "lucide-react"

interface Step {
  number: string
  icon: string // Icon name as string (e.g., "Calculator", "Search", "TrendingUp")
  title: string
  description: string
}

interface HowItWorksCardProps {
  steps?: Step[]
  title?: string
  subtitle?: string
}

// Icon mapping - maps string names to actual icon components
const iconMap: Record<string, LucideIcon> = {
  Search,
  Calculator,
  TrendingUp,
}

const defaultSteps: Step[] = [
  {
    number: '01',
    icon: 'Search',
    title: 'Choose Your Calculator',
    description: 'Select from our range of tax and salary calculators based on your needs.',
  },
  {
    number: '02',
    icon: 'Calculator',
    title: 'Enter Your Information',
    description: 'Input your salary, hourly rate, or other relevant financial details.',
  },
  {
    number: '03',
    icon: 'TrendingUp',
    title: 'Get Instant Results',
    description: 'Receive accurate calculations with detailed breakdowns and insights.',
  },
]

export function HowItWorksCard({ 
  steps = defaultSteps, 
  title = "How It Works",
  subtitle = "Get accurate financial calculations in three simple steps"
}: HowItWorksCardProps) {
  return (
    <Card className="mt-12 border-2">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {title}
        </CardTitle>
        {subtitle && (
          <p className="text-muted-foreground text-sm md:text-base">
            {subtitle}
          </p>
        )}
      </CardHeader>
      <CardContent className="px-6 pb-8">
        <div className="relative">
          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon] || Calculator // Fallback to Calculator if icon not found
              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step Icon Circle */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 shadow-sm">
                      <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="space-y-2 max-w-xs mx-auto">
                    <h3 className="text-lg font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

