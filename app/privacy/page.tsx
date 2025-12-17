import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Privacy Policy - TaxSal',
  description: 'Read our privacy policy to understand how we collect, use, and protect your information when using our salary and tax calculators.',
  openGraph: {
    title: 'Privacy Policy - TaxSal',
    description: 'Read our privacy policy to understand how we collect, use, and protect your information.',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-8 prose prose-sm max-w-none">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Welcome to TaxSal ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By using our website, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Information You Provide</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may collect information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Use our salary and tax calculators</li>
                  <li>Contact us through our contact form</li>
                  <li>Subscribe to our newsletter or blog updates</li>
                  <li>Participate in surveys or feedback forms</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This information may include your name, email address, and any other information you choose to provide.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3">2.2 Automatically Collected Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you visit our website, we may automatically collect certain information about your device and usage patterns, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To process and respond to your inquiries and requests</li>
                  <li>To send you newsletters, updates, and promotional materials (with your consent)</li>
                  <li>To analyze usage patterns and improve user experience</li>
                  <li>To detect, prevent, and address technical issues</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Storage and Security</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">Important:</strong> All calculations performed on our website are processed locally in your browser. We do not store, transmit, or have access to the financial information you enter into our calculators.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may use third-party services that collect, monitor, and analyze information to help us improve our services. These third parties may have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Examples of third-party services we may use include analytics providers, hosting services, and email service providers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>The right to access your personal information</li>
                  <li>The right to correct inaccurate information</li>
                  <li>The right to request deletion of your information</li>
                  <li>The right to object to processing of your information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-muted-foreground mb-2">
                    <strong className="text-foreground">Email:</strong> privacy@taxsal.com
                  </p>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Website:</strong>{' '}
                    <a href="/contact" className="text-primary hover:underline">
                      Contact Page
                    </a>
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

