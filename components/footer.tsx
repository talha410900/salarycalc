import Link from "next/link"
import { Logo } from "@/components/logo"
import { getOptimizedStateCalculatorUrl, getMaineExciseTaxCalculatorSlug } from "@/lib/seo-slugs"

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <Logo size="md" variant="footer" />
            </Link>
            <p className="text-background/60 text-sm leading-relaxed mb-4">
              Free tax and salary calculators for the United States. Calculate payroll taxes, state taxes, 
              capital gains, property taxes, and more with our comprehensive suite of financial tools.
            </p>
            <p className="text-background/50 text-xs leading-relaxed">
              Accurate calculations for 2025-2026 tax year. All calculators are free to use and updated regularly 
              with the latest tax rates and brackets.
            </p>
          </div>

          {/* Tax Calculators */}
          <div>
            <h3 className="font-semibold text-background mb-3 text-sm">Tax Calculators</h3>
            <ul className="space-y-2">
              {[
                { name: "Payroll Tax", href: "/calculators/payroll-tax-calculator" },
                { name: "Federal Tax", href: "/calculators/federal-tax-calculator" },
                { name: "Take-Home Pay", href: "/calculators/take-home-pay-calculator" },
                { name: "Self-Employed Tax", href: "/calculators/self-employed-tax-calculator" },
                { name: "AMT Calculator", href: "/calculators/amt-calculator" },
                { name: "Tax Return and Refund", href: "/calculators/tax-return-calculator" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-background/60 hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* State Tax Calculators */}
          <div>
            <h3 className="font-semibold text-background mb-3 text-sm">State Tax Calculators</h3>
            <ul className="space-y-2">
              {[
                { name: "All State Taxes", href: "/#states" },
                { name: "MD Withholding", href: getOptimizedStateCalculatorUrl("maryland", "withholding") },
                { name: "MN Paycheck", href: getOptimizedStateCalculatorUrl("minnesota", "withholding") },
                { name: "VA Payroll", href: getOptimizedStateCalculatorUrl("virginia", "withholding") },
                { name: "TX Paycheck", href: "/calculators/texas-paycheck-calculator" },
                { name: "More States...", href: "/#states" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-background/60 hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sales and Vehicle Tax */}
          <div>
            <h3 className="font-semibold text-background mb-3 text-sm">Sales and Vehicle Tax</h3>
            <ul className="space-y-2">
              {[
                { name: "TN Car Sales Tax", href: getOptimizedStateCalculatorUrl("tennessee", "sales-tax") },
                { name: "MD Sales Tax", href: getOptimizedStateCalculatorUrl("maryland", "sales-tax") },
                { name: "TX Auto Sales Tax", href: getOptimizedStateCalculatorUrl("texas", "sales-tax") },
                { name: "VA Vehicle Tax", href: getOptimizedStateCalculatorUrl("virginia", "vehicle-tax") },
                { name: "WV Vehicle Tax", href: getOptimizedStateCalculatorUrl("west-virginia", "vehicle-tax") },
                { name: "ME Excise Tax", href: `/calculators/${getMaineExciseTaxCalculatorSlug()}` },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-background/60 hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property and Mortgage */}
          <div>
            <h3 className="font-semibold text-background mb-3 text-sm">Property and Mortgage</h3>
            <ul className="space-y-2">
              {[
                { name: "Mortgage Tax", href: "/calculators/mortgage-tax-calculator" },
                { name: "NY Mortgage Tax", href: "/calculators/ny-mortgage-tax-calculator" },
                { name: "VA Property Tax Car", href: "/calculators/va-property-tax-car-calculator" },
                { name: "IL Property Tax", href: "/calculators/illinois-property-tax-calculator" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-background/60 hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capital Gains and Investment */}
          <div>
            <h3 className="font-semibold text-background mb-3 text-sm">Capital Gains</h3>
            <ul className="space-y-2">
              {[
                { name: "CA Capital Gains", href: "/calculators/california-capital-gains-tax-calculator" },
                { name: "NC Capital Gains", href: "/calculators/nc-capital-gains-calculator" },
                { name: "Real Estate Gains", href: "/calculators/real-estate-capital-gains-calculator" },
                { name: "Rental Property", href: "/calculators/rental-property-capital-gains-calculator" },
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

        {/* Additional Links Row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          {/* Empty column to align with first row */}
          <div></div>
          
          {/* Salary Calculators */}
          <div>
            <h3 className="font-semibold text-background mb-3 text-sm">Salary Calculators</h3>
            <ul className="space-y-2">
              {[
                { name: "Hourly to Salary", href: "/calculators/hourly-to-salary-calculator" },
                { name: "Salary to Hourly", href: "/calculators/salary-to-hourly-calculator" },
                { name: "Monthly to Yearly", href: "/calculators/monthly-to-yearly-calculator" },
                { name: "Bi-Weekly to Annual", href: "/calculators/biweekly-to-annual-calculator" },
                { name: "Overtime Pay", href: "/calculators/overtime-pay-calculator" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-background/60 hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Import and Customs */}
          <div>
            <h3 className="font-semibold text-background mb-3 text-sm">Import and Customs</h3>
            <ul className="space-y-2">
              {[
                { name: "Customs and Import Duty", href: "/calculators/customs-import-duty-calculator" },
                { name: "US Import Tax", href: "/calculators/us-import-tax-calculator" },
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
                { name: "Blog", href: "/blog" },
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

          {/* Empty columns for alignment */}
          <div></div>
          <div></div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 pt-6">
            <p className="text-xs text-background/50 text-center">
              © {new Date().getFullYear()} TaxSal. All rights reserved. For informational purposes only.
            </p>
        </div>
      </div>
    </footer>
  )
}
