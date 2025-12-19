import { Calculator, Shield, Zap, TrendingUp, DollarSign, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: Calculator,
    title: 'Accurate Calculations',
    description: 'Precise tax and salary calculations based on the latest IRS tax brackets and state regulations.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get your calculations in seconds. No sign-up required, completely free to use.',
  },
  {
    icon: Shield,
    title: 'Secure and Private',
    description: 'All calculations are done locally in your browser. We never store your personal information.',
  },
  {
    icon: TrendingUp,
    title: 'Up-to-Date Data',
    description: 'Regularly updated with current tax rates, brackets, and regulations for all 50 states.',
  },
  {
    icon: DollarSign,
    title: 'Multiple Calculators',
    description: 'Comprehensive suite of tools for hourly, salary, tax, and take-home pay calculations.',
  },
  {
    icon: FileText,
    title: 'Expert Resources',
    description: 'Access our blog for tax tips, financial planning advice, and salary negotiation strategies.',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
            Why Choose Our Calculators?
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Professional-grade tools designed to help you make informed financial decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

