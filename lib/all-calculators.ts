import {
  Calculator,
  Package,
  MapPin,
  TrendingUp,
  Home,
  Briefcase,
  ShoppingCart,
  Receipt,
  DollarSign,
  Clock,
  Landmark,
  Wallet,
  Timer,
  CalendarDays,
  Car,
} from "lucide-react"
import { ALL_STATES } from "@/lib/state-tax-data"
import { STATE_CALCULATOR_CONFIG, STATE_WITHHOLDING_KEYWORDS, getStateCalculatorUrl, type StateCalculatorType } from "@/lib/state-calculator-types"

export interface CalculatorItem {
  name: string
  href: string
  category: string
  icon: typeof Calculator
  description?: string
  keywords: string[] // For search matching
}

// General Tax Calculators
const taxCalculators: CalculatorItem[] = [
  {
    name: "Payroll Tax Calculator",
    href: "/calculators/payroll-tax-calculator",
    category: "Tax Calculators",
    icon: Calculator,
    description: "Calculate net pay after all taxes",
    keywords: ["payroll", "tax", "net pay", "deductions", "withholding"],
  },
  {
    name: "Federal Tax Calculator",
    href: "/calculators/federal-tax-calculator",
    category: "Tax Calculators",
    icon: Landmark,
    description: "Federal income tax calculator",
    keywords: ["federal", "tax", "income tax", "irs"],
  },
  {
    name: "Take-Home Pay Calculator",
    href: "/calculators/take-home-pay-calculator",
    category: "Tax Calculators",
    icon: Wallet,
    description: "Net pay after deductions",
    keywords: ["take home", "net pay", "after tax", "paycheck"],
  },
  {
    name: "Self-Employed Tax Calculator",
    href: "/calculators/self-employed-tax-calculator",
    category: "Tax Calculators",
    icon: Briefcase,
    description: "SE tax calculator for freelancers",
    keywords: ["self employed", "freelancer", "1099", "se tax", "independent contractor"],
  },
  {
    name: "AMT Calculator",
    href: "/calculators/amt-calculator",
    category: "Tax Calculators",
    icon: Calculator,
    description: "Alternative Minimum Tax",
    keywords: ["amt", "alternative minimum tax", "minimum tax"],
  },
  {
    name: "Tax Return and Refund Calculator",
    href: "/calculators/tax-return-calculator",
    category: "Tax Calculators",
    icon: Receipt,
    description: "Estimate tax refund or amount owed",
    keywords: ["tax return", "refund", "tax refund", "owed", "tax owed"],
  },
  {
    name: "Texas Paycheck Calculator",
    href: "/calculators/texas-paycheck-calculator",
    category: "Tax Calculators",
    icon: MapPin,
    description: "No state tax calculator for Texas",
    keywords: ["texas", "tx", "paycheck", "texas paycheck", "no state tax"],
  },
]

// Salary Calculators
const salaryCalculators: CalculatorItem[] = [
  {
    name: "Hourly to Salary Calculator",
    href: "/calculators/hourly-to-salary-calculator",
    category: "Salary Calculators",
    icon: Clock,
    description: "Convert hourly wage to annual salary",
    keywords: ["hourly", "salary", "wage", "convert", "annual"],
  },
  {
    name: "Salary to Hourly Calculator",
    href: "/calculators/salary-to-hourly-calculator",
    category: "Salary Calculators",
    icon: DollarSign,
    description: "Find your equivalent hourly rate",
    keywords: ["salary", "hourly", "rate", "convert", "wage"],
  },
  {
    name: "Monthly to Yearly Calculator",
    href: "/calculators/monthly-to-yearly-calculator",
    category: "Salary Calculators",
    icon: CalendarDays,
    description: "Convert monthly to annual salary",
    keywords: ["monthly", "yearly", "annual", "convert", "salary"],
  },
  {
    name: "Bi-Weekly to Annual Calculator",
    href: "/calculators/biweekly-to-annual-calculator",
    category: "Salary Calculators",
    icon: Calculator,
    description: "Convert bi-weekly paycheck",
    keywords: ["biweekly", "bi weekly", "annual", "paycheck", "convert"],
  },
  {
    name: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay-calculator",
    category: "Salary Calculators",
    icon: Timer,
    description: "Calculate overtime earnings",
    keywords: ["overtime", "ot", "time and half", "1.5x"],
  },
]

// Capital Gains / Investment Calculators - EXACT keywords from priority list
const capitalGainsCalculators: CalculatorItem[] = [
  {
    name: "California Capital Gains Tax Calculator",
    href: "/calculators/california-capital-gains-tax-calculator",
    category: "Capital Gains / Investment",
    icon: TrendingUp,
    description: "California capital gains tax calculator",
    keywords: ["california capital gains tax calculator", "california", "ca", "capital gains", "capital gains tax", "investment"],
  },
  {
    name: "Capital Gains Tax Calculator on Rental Property",
    href: "/calculators/rental-property-capital-gains-calculator",
    category: "Capital Gains / Investment",
    icon: Home,
    description: "Capital gains tax calculator on rental property",
    keywords: ["capital gains tax calculator on rental property", "rental property capital gains", "rental property", "rental", "investment property", "capital gains"],
  },
  {
    name: "Real Estate Capital Gains Tax Calculator",
    href: "/calculators/real-estate-capital-gains-calculator",
    category: "Capital Gains / Investment",
    icon: Home,
    description: "Real estate capital gains tax calculator",
    keywords: ["real estate capital gains tax calculator", "real estate", "home sale", "property sale", "capital gains", "primary residence"],
  },
  {
    name: "North Carolina Capital Gains Tax Calculator",
    href: "/calculators/nc-capital-gains-calculator",
    category: "Capital Gains / Investment",
    icon: TrendingUp,
    description: "North Carolina capital gains tax calculator",
    keywords: ["north carolina capital gains tax calculator", "north carolina", "nc", "capital gains", "capital gains tax", "investment"],
  },
]

// Property and Mortgage Calculators - EXACT keywords from priority list
const propertyMortgageCalculators: CalculatorItem[] = [
  {
    name: "Tax Mortgage Calculator",
    href: "/calculators/mortgage-tax-calculator",
    category: "Property / Mortgage",
    icon: Home,
    description: "Tax mortgage calculator",
    keywords: ["tax mortgage calculator", "mortgage tax", "recording tax", "loan"],
  },
  {
    name: "NY Mortgage Tax Calculator",
    href: "/calculators/ny-mortgage-tax-calculator",
    category: "Property / Mortgage",
    icon: Home,
    description: "NY mortgage tax calculator",
    keywords: ["ny mortgage tax calculator", "new york mortgage tax", "new york", "ny", "nyc", "mortgage tax"],
  },
  {
    name: "VA Property Tax Car Calculator",
    href: "/calculators/va-property-tax-car-calculator",
    category: "Property / Mortgage",
    icon: Car,
    description: "VA property tax car calculator",
    keywords: ["va property tax car calculator", "virginia property tax car", "virginia", "va", "property tax", "car", "vehicle"],
  },
  {
    name: "Property Tax in Illinois Calculator",
    href: "/calculators/illinois-property-tax-calculator",
    category: "Property / Mortgage",
    icon: Home,
    description: "Property tax in Illinois calculator",
    keywords: ["property tax in illinois calculator", "illinois property tax", "illinois", "il", "property tax", "real estate"],
  },
]

// Sales and Vehicle Tax Calculators - EXACT keywords from priority list
function getSalesVehicleCalculators(): CalculatorItem[] {
  const { getOptimizedStateCalculatorUrl, getMaineExciseTaxCalculatorSlug } = require("@/lib/seo-slugs")
  
  return [
  {
    name: "TN Car Sales Tax Calculator",
    href: getOptimizedStateCalculatorUrl("tennessee", "sales-tax"),
    category: "Sales / Vehicle / Excise (Golden)",
    icon: ShoppingCart,
    description: "TN car sales tax calculator",
    keywords: ["tn car sales tax calculator", "tennessee car sales tax", "tn sales tax calculator auto", "tennessee", "tn", "car sales tax", "auto sales tax"],
  },
  {
    name: "TN Sales Tax Calculator Auto",
    href: getOptimizedStateCalculatorUrl("tennessee", "sales-tax"),
    category: "Sales / Vehicle / Excise (Golden)",
    icon: ShoppingCart,
    description: "TN sales tax calculator auto",
    keywords: ["tn sales tax calculator auto", "tn car sales tax calculator", "tennessee", "tn", "sales tax", "auto"],
  },
  {
    name: "MD Sales Tax Calculator",
    href: getOptimizedStateCalculatorUrl("maryland", "sales-tax"),
    category: "Sales / Vehicle / Excise (Golden)",
    icon: ShoppingCart,
    description: "MD sales tax calculator",
    keywords: ["md sales tax calculator", "maryland sales tax", "maryland", "md", "sales tax"],
  },
  {
    name: "Nebraska Car Sales Tax Calculator",
    href: getOptimizedStateCalculatorUrl("nebraska", "sales-tax"),
    category: "Sales / Vehicle / Excise (Golden)",
    icon: ShoppingCart,
    description: "Nebraska car sales tax calculator",
    keywords: ["nebraska car sales tax calculator", "nebraska", "ne", "car sales tax", "auto sales tax"],
  },
  {
    name: "TX Auto Sales Tax Calculator",
    href: getOptimizedStateCalculatorUrl("texas", "sales-tax"),
    category: "Sales / Vehicle / Excise (Golden)",
    icon: ShoppingCart,
    description: "TX auto sales tax calculator",
    keywords: ["tx auto sales tax calculator", "texas auto sales tax", "texas", "tx", "auto sales tax", "car sales tax"],
  },
  {
    name: "Virginia Vehicle Tax Calculator",
    href: getOptimizedStateCalculatorUrl("virginia", "vehicle-tax"),
    category: "Sales / Vehicle / Excise (Golden)",
    icon: Car,
    description: "Virginia vehicle tax calculator",
    keywords: ["virginia vehicle tax calculator", "virginia", "va", "vehicle tax", "car tax", "auto tax"],
  },
  {
    name: "WV Vehicle Tax Calculator",
    href: getOptimizedStateCalculatorUrl("west-virginia", "vehicle-tax"),
    category: "Sales / Vehicle / Excise (Golden)",
    icon: Car,
    description: "WV vehicle tax calculator",
    keywords: ["wv vehicle tax calculator", "west virginia vehicle tax", "west virginia", "wv", "vehicle tax", "car tax"],
  },
  {
    name: "State of Maine Excise Tax Calculator",
    href: `/calculators/${getMaineExciseTaxCalculatorSlug()}`,
    category: "Sales / Vehicle / Excise (Golden)",
    icon: Receipt,
    description: "State of Maine excise tax calculator",
    keywords: ["state of maine excise tax calculator", "maine excise tax", "maine", "me", "excise tax", "vehicle excise"],
  },
  ]
}

const salesVehicleCalculators = getSalesVehicleCalculators()

// Import and Customs Calculators
const importCustomsCalculators: CalculatorItem[] = [
  {
    name: "Customs and Import Duty Calculator",
    href: "/calculators/customs-import-duty-calculator",
    category: "Import and Customs",
    icon: Package,
    description: "Estimate US import duties and fees",
    keywords: ["customs", "import", "duty", "import duty", "tariff"],
  },
  {
    name: "US Import Tax Calculator",
    href: "/calculators/us-import-tax-calculator",
    category: "Import and Customs",
    icon: Package,
    description: "General US import duty calculator",
    keywords: ["us import", "import tax", "customs", "duty"],
  },
]

// State-specific calculators (withholding, etc.) - EXACT keywords from priority list
function getStateCalculators(): CalculatorItem[] {
  const stateCalcs: CalculatorItem[] = []
  
  // Import keyword mappings
  const { STATE_WITHHOLDING_KEYWORDS } = require("@/lib/state-calculator-types")
  
  // Import optimized URL generator
  const { getOptimizedStateCalculatorUrl } = require("@/lib/seo-slugs")
  
  ALL_STATES.forEach((state) => {
    // State income tax (always available) - use optimized URL
    stateCalcs.push({
      name: `${state.name} Tax Calculator`,
      href: getOptimizedStateCalculatorUrl(state.slug, "income-tax"),
      category: "State Tax Calculators",
      icon: MapPin,
      description: `${state.name} state income tax`,
      keywords: [state.name.toLowerCase(), state.code.toLowerCase(), "state tax", "income tax", state.slug, `${state.name.toLowerCase()} tax calculator`],
    })

    // Other state calculators with EXACT keyword matching
    const config = STATE_CALCULATOR_CONFIG[state.slug]
    if (config) {
      config.availableCalculators.forEach((calcType) => {
        if (calcType !== "income-tax") {
          // Use optimized URL
          const url = getOptimizedStateCalculatorUrl(state.slug, calcType as any)
          
          // Use exact keywords from priority list
          if (calcType === "withholding") {
            const exactKeyword = STATE_WITHHOLDING_KEYWORDS[state.slug] || "withholding tax calculator"
            let exactName = ""
            let exactKeywords: string[] = []
            
            if (exactKeyword === "paycheck tax calculator") {
              if (state.slug === "nevada") {
                exactName = "Paycheck Tax Calculator Nevada"
                exactKeywords = ["paycheck tax calculator nevada", "nevada paycheck tax", "nv paycheck tax"]
              } else if (state.slug === "minnesota") {
                exactName = "MN Paycheck Tax Calculator"
                exactKeywords = ["mn paycheck tax calculator", "minnesota paycheck tax", "mn paycheck tax"]
              } else if (state.slug === "pennsylvania") {
                exactName = "PA Paycheck Tax Calculator"
                exactKeywords = ["pa paycheck tax calculator", "pennsylvania paycheck tax", "pa paycheck tax"]
              } else if (state.slug === "michigan") {
                exactName = "Michigan Paycheck Tax Calculator"
                exactKeywords = ["michigan paycheck tax calculator", "michigan paycheck tax", "mi paycheck tax"]
              } else {
                exactName = `${state.name} Paycheck Tax Calculator`
                exactKeywords = [`${state.name.toLowerCase()} paycheck tax calculator`, `${state.code.toLowerCase()} paycheck tax calculator`]
              }
            } else if (exactKeyword === "payroll tax calculator") {
              exactName = `${state.name} Payroll Tax Calculator`
              exactKeywords = [`${state.name.toLowerCase()} payroll tax calculator`, `${state.code.toLowerCase()} payroll tax calculator`]
            } else {
              // Maryland: "withholding tax calculator"
              exactName = `${state.name} Withholding Tax Calculator`
              exactKeywords = [`${state.name.toLowerCase()} withholding tax calculator`, `${state.code.toLowerCase()} withholding tax calculator`]
            }
            
            stateCalcs.push({
              name: exactName,
              href: url,
              category: "Payroll / Paycheck / Withholding",
              icon: Receipt,
              description: exactName.toLowerCase(),
              keywords: [...exactKeywords, state.name.toLowerCase(), state.code.toLowerCase(), "withholding", "payroll", "paycheck"],
            })
          } else {
            // For other calculator types, use standard naming
            const typeNames: Record<string, string> = {
              "sales-tax": "Sales Tax",
              "vehicle-tax": "Vehicle Tax",
              "property-tax": "Property Tax",
            }
            
            stateCalcs.push({
              name: `${state.name} ${typeNames[calcType]} Calculator`,
              href: url,
              category: "State Tax Calculators",
              icon: calcType === "sales-tax" ? ShoppingCart : calcType === "vehicle-tax" ? Car : Home,
              description: `${state.name} ${typeNames[calcType]}`,
              keywords: [state.name.toLowerCase(), state.code.toLowerCase(), calcType, typeNames[calcType].toLowerCase()],
            })
          }
        }
      })
    }
  })

  return stateCalcs
}

// Combine all calculators
export const allCalculators: CalculatorItem[] = [
  ...taxCalculators,
  ...salaryCalculators,
  ...capitalGainsCalculators,
  ...propertyMortgageCalculators,
  ...salesVehicleCalculators,
  ...importCustomsCalculators,
  ...getStateCalculators(),
]

// Search function
export function searchCalculators(query: string): Record<string, CalculatorItem[]> {
  if (!query.trim()) return {}

  const searchTerm = query.toLowerCase().trim()
  const results: Record<string, CalculatorItem[]> = {}

  allCalculators.forEach((calc) => {
    // Check if calculator matches search
    const matchesName = calc.name.toLowerCase().includes(searchTerm)
    const matchesKeywords = calc.keywords.some((keyword) => keyword.includes(searchTerm))
    const matchesDescription = calc.description?.toLowerCase().includes(searchTerm)

    if (matchesName || matchesKeywords || matchesDescription) {
      if (!results[calc.category]) {
        results[calc.category] = []
      }
      results[calc.category].push(calc)
    }
  })

  // Don't limit results - show all matching calculators for better SEO
  return results
}

