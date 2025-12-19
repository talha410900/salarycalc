/**
 * Calculator Permalink Optimization
 * 
 * Maps old URLs to new SEO-optimized URLs that include "calculator" in the permalink
 * to match the page headings and focus keywords.
 */

export const CALCULATOR_PERMALINK_MAP: Record<string, string> = {
  // Tax Calculators
  '/calculators/payroll-tax': '/calculators/payroll-tax-calculator',
  '/calculators/federal-tax': '/calculators/federal-tax-calculator',
  '/calculators/take-home-pay': '/calculators/take-home-pay-calculator',
  '/calculators/self-employed-tax': '/calculators/self-employed-tax-calculator',
  '/calculators/amt': '/calculators/amt-calculator',
  '/calculators/tax-return': '/calculators/tax-return-calculator',
  '/calculators/texas-paycheck': '/calculators/texas-paycheck-calculator',
  
  // Salary Calculators
  '/calculators/hourly-to-salary': '/calculators/hourly-to-salary-calculator',
  '/calculators/salary-to-hourly': '/calculators/salary-to-hourly-calculator',
  '/calculators/monthly-to-yearly': '/calculators/monthly-to-yearly-calculator',
  '/calculators/biweekly-to-annual': '/calculators/biweekly-to-annual-calculator',
  '/calculators/overtime-pay': '/calculators/overtime-pay-calculator',
  
  // Capital Gains Calculators
  '/calculators/nc-capital-gains': '/calculators/nc-capital-gains-calculator',
  '/calculators/rental-property-capital-gains': '/calculators/rental-property-capital-gains-calculator',
  '/calculators/real-estate-capital-gains': '/calculators/real-estate-capital-gains-calculator',
  '/calculators/ca-capital-gains': '/calculators/california-capital-gains-tax-calculator',
  
  // Property & Mortgage Calculators
  '/calculators/mortgage-tax': '/calculators/mortgage-tax-calculator',
  '/calculators/ny-mortgage-tax': '/calculators/ny-mortgage-tax-calculator',
  '/calculators/va-property-tax-car': '/calculators/va-property-tax-car-calculator',
  '/calculators/illinois-property-tax': '/calculators/illinois-property-tax-calculator',
  
  // Sales Tax Calculators
  '/calculators/la-sales-tax': '/calculators/la-sales-tax-calculator',
  '/calculators/mn-sales-tax': '/calculators/mn-sales-tax-calculator',
  
  // Import & Customs Calculators
  '/calculators/customs-import-duty': '/calculators/customs-import-duty-calculator',
  '/calculators/us-import-tax': '/calculators/us-import-tax-calculator',
  
  // State Tax Calculators (already handled by state-calculator-types)
  '/calculators/arizona-tax': '/calculators/arizona-tax-calculator',
  '/calculators/new-york-tax': '/calculators/new-york-tax-calculator',
  '/calculators/north-carolina-tax': '/calculators/north-carolina-tax-calculator',
}

/**
 * Get optimized permalink for a calculator
 */
export function getOptimizedCalculatorPermalink(oldPath: string): string {
  return CALCULATOR_PERMALINK_MAP[oldPath] || oldPath
}

/**
 * Get all redirect mappings
 */
export function getCalculatorRedirectMappings(): Array<{ old: string; new: string }> {
  return Object.entries(CALCULATOR_PERMALINK_MAP).map(([old, newUrl]) => ({
    old,
    new: newUrl,
  }))
}

