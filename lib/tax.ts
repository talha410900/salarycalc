// 2025-2026 Federal Tax Brackets (Simplified)
export const FEDERAL_TAX_BRACKETS_2025 = {
  single: [
    { min: 0, max: 11925, rate: 0.1 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23850, rate: 0.1 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 751600, rate: 0.35 },
    { min: 751600, max: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
}

// Standard deductions 2025-2026
export const STANDARD_DEDUCTIONS_2025 = {
  single: 15000,
  married: 30000,
}

// FICA rates
export const SOCIAL_SECURITY_RATE = 0.062
export const MEDICARE_RATE = 0.0145
export const SOCIAL_SECURITY_WAGE_BASE_2025 = 176100

// Calculate federal tax using progressive brackets
export function calculateFederalTax(annualIncome: number, filingStatus: "single" | "married"): number {
  const brackets = FEDERAL_TAX_BRACKETS_2025[filingStatus]
  const standardDeduction = STANDARD_DEDUCTIONS_2025[filingStatus]
  const taxableIncome = Math.max(0, annualIncome - standardDeduction)

  let tax = 0
  let remainingIncome = taxableIncome

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
    tax += taxableInBracket * bracket.rate
    remainingIncome -= taxableInBracket
  }

  return tax
}

// Calculate Social Security tax
export function calculateSocialSecurity(annualIncome: number): number {
  const taxableIncome = Math.min(annualIncome, SOCIAL_SECURITY_WAGE_BASE_2025)
  return taxableIncome * SOCIAL_SECURITY_RATE
}

// Calculate Medicare tax
export function calculateMedicare(annualIncome: number): number {
  return annualIncome * MEDICARE_RATE
}

// Convert annual tax to pay period
export function convertToPayPeriod(annualAmount: number, payPeriod: "weekly" | "biweekly" | "monthly"): number {
  switch (payPeriod) {
    case "weekly":
      return annualAmount / 52
    case "biweekly":
      return annualAmount / 26
    case "monthly":
      return annualAmount / 12
    default:
      return annualAmount / 12
  }
}

// Arizona state tax percentages
export const ARIZONA_TAX_RATES = [0.5, 0.8, 1.3, 1.8, 2.3, 2.7, 3.5]

export function calculateArizonaTax(grossPay: number, selectedRate: number): number {
  return grossPay * (selectedRate / 100)
}

// New York state tax brackets (simplified 2025-2026)
export const NY_TAX_BRACKETS = {
  single: [
    { min: 0, max: 8500, rate: 0.04 },
    { min: 8500, max: 11700, rate: 0.045 },
    { min: 11700, max: 13900, rate: 0.0525 },
    { min: 13900, max: 80650, rate: 0.0585 },
    { min: 80650, max: 215400, rate: 0.0625 },
    { min: 215400, max: 1077550, rate: 0.0685 },
    { min: 1077550, max: Number.POSITIVE_INFINITY, rate: 0.1025 },
  ],
  married: [
    { min: 0, max: 17150, rate: 0.04 },
    { min: 17150, max: 23600, rate: 0.045 },
    { min: 23600, max: 27900, rate: 0.0525 },
    { min: 27900, max: 161550, rate: 0.0585 },
    { min: 161550, max: 323200, rate: 0.0625 },
    { min: 323200, max: 2155350, rate: 0.0685 },
    { min: 2155350, max: Number.POSITIVE_INFINITY, rate: 0.1025 },
  ],
}

export const NY_STANDARD_DEDUCTION = {
  single: 8000,
  married: 16050,
}

export function calculateNewYorkTax(grossIncome: number, filingStatus: "single" | "married"): number {
  const brackets = NY_TAX_BRACKETS[filingStatus]
  const standardDeduction = NY_STANDARD_DEDUCTION[filingStatus]
  const taxableIncome = Math.max(0, grossIncome - standardDeduction)

  let tax = 0
  let remainingIncome = taxableIncome

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
    tax += taxableInBracket * bracket.rate
    remainingIncome -= taxableInBracket
  }

  return tax
}

// North Carolina flat tax rate (2025-2026)
export const NC_TAX_RATE = 0.045

export function calculateNorthCarolinaTax(grossIncome: number, standardDeduction = 14500): number {
  const taxableIncome = Math.max(0, grossIncome - standardDeduction)
  return taxableIncome * NC_TAX_RATE
}

import { STATE_TAX_DATA } from './state-tax-data'

export function calculateStateTax(stateCode: string, income: number, filingStatus: 'single' | 'married'): number {
  const stateData = STATE_TAX_DATA[stateCode]
  if (!stateData) return 0

  if (stateData.type === 'None') return 0
  if (stateData.type === 'Flat') return income * (stateData.rate || 0)

  if (stateData.brackets) {
    const brackets = filingStatus === 'single' ? stateData.brackets.single : stateData.brackets.married_joint
    let tax = 0
    let remainingIncome = income
    
    // Simple bracket calculation without specific state deduction logic (approximation)
    // For a more accurate engine, we'd need deduction data for every state.
    // This is sufficient for estimates and comparison.
    
    // We calculate "taxable income" by just using gross for now as we lack standard deduction data for all 50 states in the interface
    // Ideally we would add 'standardDeduction' to the StateTaxData interface.
    // For now, calculating on gross (conservative estimate).
    
    let previousThreshold = 0
    for (let i = 0; i < brackets.length; i++) {
        const bracket = brackets[i]
        const nextBracket = brackets[i + 1]
        const min = bracket.threshold
        const max = nextBracket ? nextBracket.threshold : Infinity
        const rate = bracket.rate
        
        if (income > min) {
          const taxableAmount = Math.min(income, max) - min
          tax += taxableAmount * rate
        }
    }
    return tax
  }
  
  return 0
}
