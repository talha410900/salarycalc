import Link from "next/link"
import { Calculator } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Calculator className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-background">SalaryCalc</span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed">
              Free salary and tax calculators for the United States.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="font-semibold text-background mb-3 text-sm">Calculators</h3>
            <ul className="space-y-2">
              {[
                { name: "Hourly to Salary", href: "/calculators/hourly-to-salary" },
                { name: "Salary to Hourly", href: "/calculators/salary-to-hourly" },
                { name: "Take-Home Pay", href: "/calculators/take-home-pay" },
                { name: "Federal Tax", href: "/calculators/federal-tax" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-background/60 hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-background mb-3 text-sm">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: "Guides", href: "#guides" },
                { name: "State Taxes", href: "#states" },
                { name: "Tax Brackets", href: "/tax-brackets" },
                { name: "FAQ", href: "/faq" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-background/60 hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-background mb-3 text-sm">Legal</h3>
            <ul className="space-y-2">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Disclaimer", href: "/disclaimer" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-background/60 hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 pt-6">
          <p className="text-xs text-background/50 text-center">
            © {new Date().getFullYear()} SalaryCalc. All rights reserved. For informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}
