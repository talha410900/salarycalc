/**
 * State Calculator Types Configuration
 * 
 * This file defines available calculator types for each state.
 * Each state can have multiple calculator types (withholding, sales-tax, vehicle-tax, property-tax).
 */

export type StateCalculatorType = 
  | "income-tax"      // Default state income tax (always available)
  | "withholding"     // Payroll/Withholding tax
  | "sales-tax"       // Sales tax
  | "vehicle-tax"     // Vehicle/Auto sales tax
  | "property-tax"    // Property tax

export interface StateCalculatorConfig {
  stateSlug: string
  stateName: string
  availableCalculators: StateCalculatorType[]
}

/**
 * Configuration for which calculators are available per state
 * This can be expanded as calculators are added
 */
/**
 * Keyword mapping for exact SEO keywords per state
 * Based on priority list: "withholding tax calculator", "paycheck tax calculator", "payroll tax calculator"
 */
export const STATE_WITHHOLDING_KEYWORDS: Record<string, string> = {
  "maryland": "withholding tax calculator",
  "minnesota": "paycheck tax calculator",
  "virginia": "payroll tax calculator",
  "louisiana": "payroll tax calculator",
  "oregon": "payroll tax calculator",
  "south-carolina": "payroll tax calculator",
  "pennsylvania": "paycheck tax calculator",
  "michigan": "paycheck tax calculator",
  "nevada": "paycheck tax calculator",
}

/**
 * Keyword mapping for sales tax calculators - exact keywords from priority list
 */
export const STATE_SALES_TAX_KEYWORDS: Record<string, string> = {
  "tennessee": "car sales tax calculator", // tn car sales tax calculator
  "maryland": "sales tax calculator", // md sales tax calculator
  "nebraska": "car sales tax calculator", // nebraska car sales tax calculator
  "texas": "auto sales tax calculator", // tx auto sales tax calculator
}

/**
 * Keyword mapping for vehicle tax calculators - exact keywords from priority list
 */
export const STATE_VEHICLE_TAX_KEYWORDS: Record<string, string> = {
  "virginia": "vehicle tax calculator", // virginia vehicle tax calculator
  "west-virginia": "vehicle tax calculator", // wv vehicle tax calculator
}

export const STATE_CALCULATOR_CONFIG: Record<string, StateCalculatorConfig> = {
  // MN paycheck tax calculator
  "minnesota": {
    stateSlug: "minnesota",
    stateName: "Minnesota",
    availableCalculators: ["income-tax", "withholding", "sales-tax"],
  },
  // Virginia payroll tax calculator / Virginia vehicle tax calculator
  "virginia": {
    stateSlug: "virginia",
    stateName: "Virginia",
    availableCalculators: ["income-tax", "withholding", "vehicle-tax"],
  },
  // Louisiana payroll tax calculator
  "louisiana": {
    stateSlug: "louisiana",
    stateName: "Louisiana",
    availableCalculators: ["income-tax", "withholding", "sales-tax"],
  },
  // Oregon payroll tax calculator
  "oregon": {
    stateSlug: "oregon",
    stateName: "Oregon",
    availableCalculators: ["income-tax", "withholding"],
  },
  // South Carolina payroll tax calculator
  "south-carolina": {
    stateSlug: "south-carolina",
    stateName: "South Carolina",
    availableCalculators: ["income-tax", "withholding"],
  },
  // PA paycheck tax calculator
  "pennsylvania": {
    stateSlug: "pennsylvania",
    stateName: "Pennsylvania",
    availableCalculators: ["income-tax", "withholding"],
  },
  // Michigan paycheck tax calculator
  "michigan": {
    stateSlug: "michigan",
    stateName: "Michigan",
    availableCalculators: ["income-tax", "withholding"],
  },
  // Paycheck tax calculator Nevada
  "nevada": {
    stateSlug: "nevada",
    stateName: "Nevada",
    availableCalculators: ["income-tax", "withholding"],
  },
  // TN car sales tax calculator / TN sales tax calculator auto
  "tennessee": {
    stateSlug: "tennessee",
    stateName: "Tennessee",
    availableCalculators: ["income-tax", "sales-tax"],
  },
  // Nebraska car sales tax calculator
  "nebraska": {
    stateSlug: "nebraska",
    stateName: "Nebraska",
    availableCalculators: ["income-tax", "sales-tax"],
  },
  // TX auto sales tax calculator
  "texas": {
    stateSlug: "texas",
    stateName: "Texas",
    availableCalculators: ["income-tax", "sales-tax"],
  },
  // MD sales tax calculator
  "maryland": {
    stateSlug: "maryland",
    stateName: "Maryland",
    availableCalculators: ["income-tax", "withholding", "sales-tax"],
  },
  // WV vehicle tax calculator
  "west-virginia": {
    stateSlug: "west-virginia",
    stateName: "West Virginia",
    availableCalculators: ["income-tax", "vehicle-tax"],
  },
  // State of Maine excise tax calculator
  "maine": {
    stateSlug: "maine",
    stateName: "Maine",
    availableCalculators: ["income-tax", "sales-tax"], // Excise tax will be a special page
  },
}

/**
 * Get available calculators for a state
 */
export function getStateCalculators(stateSlug: string): StateCalculatorType[] {
  const config = STATE_CALCULATOR_CONFIG[stateSlug]
  // Always include income-tax as default
  return config?.availableCalculators || ["income-tax"]
}

/**
 * Check if a calculator type is available for a state
 */
export function hasCalculatorType(stateSlug: string, type: StateCalculatorType): boolean {
  const calculators = getStateCalculators(stateSlug)
  return calculators.includes(type)
}

/**
 * Get calculator type metadata
 */
export function getCalculatorTypeMetadata(type: StateCalculatorType) {
  const metadata = {
    "income-tax": {
      name: "Income Tax",
      description: "Calculate state income tax",
      slug: "income-tax",
      path: "", // Empty for default (no sub-path)
    },
    "withholding": {
      name: "Withholding Tax",
      description: "Calculate payroll withholding tax",
      slug: "withholding",
      path: "/withholding",
    },
    "sales-tax": {
      name: "Sales Tax",
      description: "Calculate sales tax",
      slug: "sales-tax",
      path: "/sales-tax",
    },
    "vehicle-tax": {
      name: "Vehicle Tax",
      description: "Calculate vehicle/auto sales tax",
      slug: "vehicle-tax",
      path: "/vehicle-tax",
    },
    "property-tax": {
      name: "Property Tax",
      description: "Calculate property tax",
      slug: "property-tax",
      path: "/property-tax",
    },
  }
  return metadata[type]
}

/**
 * Generate URL for a state calculator
 * Now uses SEO-optimized URLs that match focus keywords
 */
export function getStateCalculatorUrl(stateSlug: string, type: StateCalculatorType = "income-tax"): string {
  // Import optimized URL generator
  const { getOptimizedStateCalculatorUrl } = require("@/lib/seo-slugs")
  
  // Map our calculator types to the optimized URL function
  if (type === "income-tax") {
    return getOptimizedStateCalculatorUrl(stateSlug, "income-tax")
  } else if (type === "withholding") {
    return getOptimizedStateCalculatorUrl(stateSlug, "withholding")
  } else if (type === "sales-tax") {
    return getOptimizedStateCalculatorUrl(stateSlug, "sales-tax")
  } else if (type === "vehicle-tax") {
    return getOptimizedStateCalculatorUrl(stateSlug, "vehicle-tax")
  }
  
  // Fallback to old structure if type not recognized
  const metadata = getCalculatorTypeMetadata(type)
  const basePath = `/calculators/state/${stateSlug}`
  return `${basePath}${metadata.path}`
}


