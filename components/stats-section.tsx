import { Users, Calculator, TrendingUp, Award } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '100K+',
    label: 'Users Trust Us',
    description: 'Calculations completed monthly',
  },
  {
    icon: Calculator,
    value: '50+',
    label: 'State Calculators',
    description: 'Covering all US states',
  },
  {
    icon: TrendingUp,
    value: '99.9%',
    label: 'Accuracy Rate',
    description: 'Based on latest tax data',
  },
  {
    icon: Award,
    value: '24/7',
    label: 'Always Available',
    description: 'Free access anytime',
  },
]

export function StatsSection() {
  return (
    <section className="py-8 bg-primary/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-0.5">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-foreground mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

