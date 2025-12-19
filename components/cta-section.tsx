import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calculator } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-10 bg-primary/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
            Ready to Calculate Your Salary and Taxes?
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get started with our free calculators and take control of your financial planning today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="#calculators">
              <Button size="default" className="w-full sm:w-auto">
                Explore Calculators
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="default" variant="outline" className="w-full sm:w-auto">
                Read Our Blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

