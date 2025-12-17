import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MessageSquare, Send } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | SalaryCalc',
  description: 'Have questions about our salary and tax calculators? Contact us for support, feedback, or inquiries. We\'re here to help!',
  keywords: 'contact, support, help, feedback, salary calculator support',
  openGraph: {
    title: 'Contact Us - Get in Touch | SalaryCalc',
    description: 'Have questions about our salary and tax calculators? Contact us for support, feedback, or inquiries.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or need support? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Email Us</CardTitle>
                  </div>
                  <CardDescription>
                    Send us an email and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:support@salarycalc.com"
                    className="text-primary hover:underline font-medium"
                  >
                    support@salarycalc.com
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Response Time</CardTitle>
                  </div>
                  <CardDescription>
                    We typically respond within 24-48 hours during business days.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9 AM - 5 PM EST
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Send className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Quick Links</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a
                    href="/tax-brackets"
                    className="block text-sm text-primary hover:underline"
                  >
                    View Tax Brackets
                  </a>
                  <a
                    href="/blog"
                    className="block text-sm text-primary hover:underline"
                  >
                    Read Our Blog
                  </a>
                  <a
                    href="/#calculators"
                    className="block text-sm text-primary hover:underline"
                  >
                    Browse Calculators
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Before contacting us, you might find the answer to your question here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    How accurate are the tax calculations?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our calculators use the latest IRS tax brackets and state-specific tax rates for 2025-2026. 
                    However, these are estimates and should not replace professional tax advice for complex situations.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Do you store my personal information?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    No, all calculations are performed locally in your browser. We never store or share 
                    your personal financial information.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    How often is the tax data updated?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We update our tax brackets and rates whenever new tax legislation is passed. 
                    Federal tax brackets are typically updated annually, and state tax rates are updated as changes occur.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Can I use these calculators for tax filing?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our calculators provide estimates for planning purposes. For actual tax filing, 
                    we recommend consulting with a tax professional or using official IRS tax software.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

