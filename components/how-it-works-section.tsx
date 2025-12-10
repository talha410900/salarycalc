import { Search, Calculator, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Choose Your Calculator',
    description: 'Select from our range of salary and tax calculators based on your needs.',
  },
  {
    number: '02',
    icon: Calculator,
    title: 'Enter Your Information',
    description: 'Input your salary, hourly rate, or other relevant financial details.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Get Instant Results',
    description: 'Receive accurate calculations with detailed breakdowns and insights.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-10 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Get accurate financial calculations in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-border -z-10">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                  </div>
                )}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-3 relative z-10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary/20 mb-1">{step.number}</div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

