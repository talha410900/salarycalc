'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'How accurate are the tax calculations?',
    answer: 'Our calculators use the latest IRS tax brackets and state-specific tax rates. We update our data regularly to ensure accuracy. However, these are estimates and should not replace professional tax advice for complex situations.',
  },
  {
    question: 'Do I need to create an account to use the calculators?',
    answer: 'No, all our calculators are completely free to use without requiring an account or sign-up. Your calculations are processed locally in your browser for privacy.',
  },
  {
    question: 'Are the calculations stored or shared?',
    answer: 'No, we never store or share your personal financial information. All calculations are performed locally in your browser, ensuring complete privacy and security.',
  },
  {
    question: 'How often is the tax data updated?',
    answer: 'We update our tax brackets and rates whenever new tax legislation is passed. Federal tax brackets are typically updated annually, and state tax rates are updated as changes occur.',
  },
  {
    question: 'Can I use these calculators for tax filing?',
    answer: 'Our calculators provide estimates for planning purposes. For actual tax filing, we recommend consulting with a tax professional or using official IRS tax software, as individual circumstances can vary significantly.',
  },
  {
    question: 'Do you support all US states?',
    answer: 'Yes, we provide tax calculators for all 50 US states plus Washington D.C. Each state calculator uses the most current state-specific tax rates and brackets.',
  },
]

export function FAQSection() {
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Everything you need to know about our calculators
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

