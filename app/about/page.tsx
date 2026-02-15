import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Calculator, Shield, TrendingUp, Users, Award, Clock, Target, Heart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us - TaxSal | Free Salary & Tax Calculators for the USA',
  description:
    'Learn about TaxSal — the free, accurate salary and tax calculator trusted by thousands of Americans. Our mission is to make tax planning simple and accessible for everyone.',
  keywords:
    'about TaxSal, tax calculator about, salary calculator team, who we are, free tax tools',
  openGraph: {
    title: 'About Us - TaxSal | Free Salary & Tax Calculators for the USA',
    description:
      'Learn about TaxSal — the free, accurate salary and tax calculator trusted by thousands of Americans.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - TaxSal',
    description:
      'Learn about TaxSal — the free, accurate salary and tax calculator trusted by thousands of Americans.',
  },
}

const values = [
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'All calculations are performed locally in your browser. We never store, transmit, or have access to your financial data.',
  },
  {
    icon: TrendingUp,
    title: 'Always Up-to-Date',
    description:
      'Our tax brackets and rates are updated whenever new legislation is passed — federally and across all 50 states.',
  },
  {
    icon: Target,
    title: '99.9% Accuracy',
    description:
      'We use the latest IRS tax brackets and state-specific rates to deliver the most accurate estimates possible.',
  },
  {
    icon: Heart,
    title: '100% Free',
    description:
      'Every calculator on TaxSal is completely free. No sign-ups, no hidden fees, no premium tiers. Just answers.',
  },
]

const stats = [
  { value: '50+', label: 'Calculators', icon: Calculator },
  { value: '50', label: 'US States Covered', icon: Users },
  { value: '24/7', label: 'Always Available', icon: Clock },
  { value: '2025–2026', label: 'Tax Year Data', icon: Award },
]

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About TaxSal',
    description:
      'TaxSal is a free salary and tax calculator platform helping Americans understand their take-home pay, federal and state taxes, and more.',
    url: 'https://taxsal.com/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'TaxSal',
      url: 'https://taxsal.com',
      logo: 'https://taxsal.com/images/logo.png',
      description:
        'Free salary and tax calculator for the United States. Calculate payroll taxes, state taxes, capital gains, property taxes and more.',
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
        />

        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-6">
              <Calculator className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              About TaxSal
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're on a mission to make salary and tax calculations{' '}
              <strong className="text-foreground">simple, free, and accessible</strong> for every
              American.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card>
              <CardContent className="p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    TaxSal was born out of a simple frustration: understanding your paycheck shouldn't
                    require a degree in accounting. Too many Americans are left confused by tax
                    withholdings, state-specific rates, and the gap between gross salary and
                    take-home pay.
                  </p>
                  <p>
                    We built TaxSal to change that. Our suite of{' '}
                    <strong className="text-foreground">50+ free calculators</strong> covers
                    everything from federal and state income taxes to payroll deductions, capital
                    gains, property taxes, import duties, and salary conversions — all tailored to
                    every U.S. state.
                  </p>
                  <p>
                    Whether you're negotiating a new job offer, planning for tax season, or just
                    curious about how much of your paycheck actually makes it to your bank account,
                    TaxSal gives you clear, accurate answers in seconds.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="py-10 bg-primary/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
                What We Stand For
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                The principles that guide everything we build at TaxSal.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <Card key={value.title}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight text-center">
              What You Can Calculate
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Federal Income Tax',
                'State Income Tax (all 50 states)',
                'Take-Home Pay',
                'Payroll Tax',
                'Self-Employment Tax',
                'Capital Gains Tax',
                'Property Tax',
                'Mortgage Tax',
                'Sales & Vehicle Tax',
                'Import & Customs Duty',
                'Salary Conversions',
                'Overtime Pay',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/50"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <Calculator className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer & CTA */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-8 text-center">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  Important Disclaimer
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
                  TaxSal provides estimates for planning and informational purposes only. Our
                  calculators should not be used as a substitute for professional tax advice. For
                  actual tax filing, please consult a qualified tax professional or use official IRS
                  tax software. Tax laws change frequently and individual circumstances vary.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/#calculators">
                    <Button size="default">Explore Calculators</Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="default" variant="outline">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
