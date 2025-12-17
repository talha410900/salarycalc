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
import { STATE_CALCULATOR_CONFIG, getStateCalculatorUrl, type StateCalculatorType } from "@/lib/state-calculator-types"

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
    href: "/calculators/payroll-tax",
    category: "Tax Calculators",
    icon: Calculator,
    description: "Calculate net pay after all taxes",
    keywords: ["payroll", "tax", "net pay", "deductions", "withholding"],
  },
  {
    name: "Federal Tax Calculator",
    href: "/calculators/federal-tax",
    category: "Tax Calculators",
    icon: Landmark,
    description: "Federal income tax calculator",
    keywords: ["federal", "tax", "income tax", "irs"],
  },
  {
    name: "Take-Home Pay Calculator",
    href: "/calculators/take-home-pay",
    category: "Tax Calculators",
    icon: Wallet,
    description: "Net pay after deductions",
    keywords: ["take home", "net pay", "after tax", "paycheck"],
  },
  {
    name: "Self-Employed Tax Calculator",
    href: "/calculators/self-employed-tax",
    category: "Tax Calculators",
    icon: Briefcase,
    description: "SE tax calculator for freelancers",
    keywords: ["self employed", "freelancer", "1099", "se tax", "independent contractor"],
  },
  {
    name: "AMT Calculator",
    href: "/calculators/amt",
    category: "Tax Calculators",
    icon: Calculator,
    description: "Alternative Minimum Tax",
    keywords: ["amt", "alternative minimum tax", "minimum tax"],
  },
  {
    name: "Tax Return & Refund Calculator",
    href: "/calculators/tax-return",
    category: "Tax Calculators",
    icon: Receipt,
    description: "Estimate tax refund or amount owed",
    keywords: ["tax return", "refund", "tax refund", "owed", "tax owed"],
  },
  {
    name: "Texas Paycheck Calculator",
    href: "/calculators/texas-paycheck",
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
    href: "/calculators/hourly-to-salary",
    category: "Salary Calculators",
    icon: Clock,
    description: "Convert hourly wage to annual salary",
    keywords: ["hourly", "salary", "wage", "convert", "annual"],
  },
  {
    name: "Salary to Hourly Calculator",
    href: "/calculators/salary-to-hourly",
    category: "Salary Calculators",
    icon: DollarSign,
    description: "Find your equivalent hourly rate",
    keywords: ["salary", "hourly", "rate", "convert", "wage"],
  },
  {
    name: "Monthly to Yearly Calculator",
    href: "/calculators/monthly-to-yearly",
    category: "Salary Calculators",
    icon: CalendarDays,
    description: "Convert monthly to annual salary",
    keywords: ["monthly", "yearly", "annual", "convert", "salary"],
  },
  {
    name: "Bi-Weekly to Annual Calculator",
    href: "/calculators/biweekly-to-annual",
    category: "Salary Calculators",
    icon: Calculator,
    description: "Convert bi-weekly paycheck",
    keywords: ["biweekly", "bi weekly", "annual", "paycheck", "convert"],
  },
  {
    name: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    category: "Salary Calculators",
    icon: Timer,
    description: "Calculate overtime earnings",
    keywords: ["overtime", "ot", "time and half", "1.5x"],
  },
]

// Capital Gains Calculators
const capitalGainsCalculators: CalculatorItem[] = [
  {
    name: "California Capital Gains Tax Calculator",
    href: "/calculators/ca-capital-gains",
    category: "Capital Gains",
    icon: TrendingUp,
    description: "California capital gains tax",
    keywords: ["california", "ca", "capital gains", "capital gains tax", "investment"],
  },
  {
    name: "North Carolina Capital Gains Tax Calculator",
    href: "/calculators/nc-capital-gains",
    category: "Capital Gains",
    icon: TrendingUp,
    description: "NC capital gains tax",
    keywords: ["north carolina", "nc", "capital gains", "capital gains tax", "investment"],
  },
  {
    name: "Real Estate Capital Gains Calculator",
    href: "/calculators/real-estate-capital-gains",
    category: "Capital Gains",
    icon: Home,
    description: "Home sale capital gains calculator",
    keywords: ["real estate", "home sale", "property sale", "capital gains", "primary residence"],
  },
  {
    name: "Rental Property Capital Gains Calculator",
    href: "/calculators/rental-property-capital-gains",
    category: "Capital Gains",
    icon: Home,
    description: "Capital gains tax on rental property",
    keywords: ["rental property", "rental", "investment property", "capital gains", "depreciation"],
  },
]

// Property & Mortgage Calculators
const propertyMortgageCalculators: CalculatorItem[] = [
  {
    name: "Mortgage Tax Calculator",
    href: "/calculators/mortgage-tax",
    category: "Property & Mortgage",
    icon: Home,
    description: "Calculate mortgage recording tax",
    keywords: ["mortgage", "mortgage tax", "recording tax", "loan"],
  },
  {
    name: "NY Mortgage Tax Calculator",
    href: "/calculators/ny-mortgage-tax",
    category: "Property & Mortgage",
    icon: Home,
    description: "New York mortgage recording tax",
    keywords: ["new york", "ny", "nyc", "mortgage tax", "mortgage"],
  },
  {
    name: "VA Property Tax Car Calculator",
    href: "/calculators/va-property-tax-car",
    category: "Property & Mortgage",
    icon: Car,
    description: "Virginia vehicle property tax",
    keywords: ["virginia", "va", "property tax", "car", "vehicle", "auto"],
  },
  {
    name: "Illinois Property Tax Calculator",
    href: "/calculators/illinois-property-tax",
    category: "Property & Mortgage",
    icon: Home,
    description: "Property tax for Illinois real estate",
    keywords: ["illinois", "il", "property tax", "real estate", "home"],
  },
]

// Sales & Vehicle Tax Calculators
const salesVehicleCalculators: CalculatorItem[] = [
  {
    name: "Tennessee Car Sales Tax Calculator",
    href: "/calculators/state/tennessee/sales-tax",
    category: "Sales & Vehicle Tax",
    icon: ShoppingCart,
    description: "TN car sales tax",
    keywords: ["tennessee", "tn", "car sales tax", "auto sales tax", "sales tax"],
  },
  {
    name: "Maryland Sales Tax Calculator",
    href: "/calculators/state/maryland/sales-tax",
    category: "Sales & Vehicle Tax",
    icon: ShoppingCart,
    description: "MD sales tax calculator",
    keywords: ["maryland", "md", "sales tax"],
  },
  {
    name: "Texas Auto Sales Tax Calculator",
    href: "/calculators/state/texas/sales-tax",
    category: "Sales & Vehicle Tax",
    icon: ShoppingCart,
    description: "TX auto sales tax",
    keywords: ["texas", "tx", "auto sales tax", "car sales tax", "sales tax"],
  },
  {
    name: "Nebraska Car Sales Tax Calculator",
    href: "/calculators/state/nebraska/sales-tax",
    category: "Sales & Vehicle Tax",
    icon: ShoppingCart,
    description: "NE car sales tax",
    keywords: ["nebraska", "ne", "car sales tax", "auto sales tax", "sales tax"],
  },
  {
    name: "Virginia Vehicle Tax Calculator",
    href: "/calculators/state/virginia/vehicle-tax",
    category: "Sales & Vehicle Tax",
    icon: Car,
    description: "VA vehicle tax",
    keywords: ["virginia", "va", "vehicle tax", "car tax", "auto tax"],
  },
  {
    name: "West Virginia Vehicle Tax Calculator",
    href: "/calculators/state/west-virginia/vehicle-tax",
    category: "Sales & Vehicle Tax",
    icon: Car,
    description: "WV vehicle tax",
    keywords: ["west virginia", "wv", "vehicle tax", "car tax"],
  },
  {
    name: "Maine Excise Tax Calculator",
    href: "/calculators/state/maine/excise-tax",
    category: "Sales & Vehicle Tax",
    icon: Receipt,
    description: "State of Maine excise tax",
    keywords: ["maine", "me", "excise tax", "vehicle excise"],
  },
  {
    name: "Minnesota Sales Tax Calculator",
    href: "/calculators/mn-sales-tax",
    category: "Sales & Vehicle Tax",
    icon: ShoppingCart,
    description: "MN sales tax calculator",
    keywords: ["minnesota", "mn", "sales tax"],
  },
  {
    name: "Louisiana Sales Tax Calculator",
    href: "/calculators/la-sales-tax",
    category: "Sales & Vehicle Tax",
    icon: ShoppingCart,
    description: "LA sales tax calculator",
    keywords: ["louisiana", "la", "sales tax"],
  },
]

// Import & Customs Calculators
const importCustomsCalculators: CalculatorItem[] = [
  {
    name: "Customs & Import Duty Calculator",
    href: "/calculators/customs-import-duty",
    category: "Import & Customs",
    icon: Package,
    description: "Estimate US import duties and fees",
    keywords: ["customs", "import", "duty", "import duty", "tariff"],
  },
  {
    name: "US Import Tax Calculator",
    href: "/calculators/us-import-tax",
    category: "Import & Customs",
    icon: Package,
    description: "General US import duty calculator",
    keywords: ["us import", "import tax", "customs", "duty"],
  },
]

// State-specific calculators (withholding, etc.)
function getStateCalculators(): CalculatorItem[] {
  const stateCalcs: CalculatorItem[] = []
  
  ALL_STATES.forEach((state) => {
    // State income tax (always available)
    stateCalcs.push({
      name: `${state.name} State Tax Calculator`,
      href: `/calculators/state/${state.slug}`,
      category: "State Tax Calculators",
      icon: MapPin,
      description: `${state.name} state income tax`,
      keywords: [state.name.toLowerCase(), state.code.toLowerCase(), "state tax", "income tax", state.slug],
    })

    // Other state calculators
    const config = STATE_CALCULATOR_CONFIG[state.slug]
    if (config) {
      config.availableCalculators.forEach((calcType) => {
        if (calcType !== "income-tax") {
          const url = getStateCalculatorUrl(state.slug, calcType)
          const typeNames: Record<string, string> = {
            withholding: "Withholding Tax",
            "sales-tax": "Sales Tax",
            "vehicle-tax": "Vehicle Tax",
            "property-tax": "Property Tax",
          }
          
          stateCalcs.push({
            name: `${state.name} ${typeNames[calcType]} Calculator`,
            href: url,
            category: "State Tax Calculators",
            icon: calcType === "withholding" ? Receipt : calcType === "sales-tax" ? ShoppingCart : calcType === "vehicle-tax" ? Car : Home,
            description: `${state.name} ${typeNames[calcType]}`,
            keywords: [state.name.toLowerCase(), state.code.toLowerCase(), calcType, typeNames[calcType].toLowerCase()],
          })
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

  // Limit results per category
  Object.keys(results).forEach((category) => {
    results[category] = results[category].slice(0, 5) // Max 5 per category
  })

  return results
}

