/**
 * SEO-Optimized Slug Generation
 * 
 * This file generates SEO-friendly permalinks that match focus keywords exactly.
 * Based on the principle: permalink should match the focus keyword as closely as possible.
 */

import { ALL_STATES } from "@/lib/state-tax-data"
import { STATE_WITHHOLDING_KEYWORDS, STATE_SALES_TAX_KEYWORDS, STATE_VEHICLE_TAX_KEYWORDS, STATE_CALCULATOR_CONFIG } from "@/lib/state-calculator-types"

/**
 * Convert a string to a URL-friendly slug
 */
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Generate optimized slug for state tax calculator
 * Pattern: {state}-tax-calculator
 * Example: delaware-tax-calculator
 */
export function getStateTaxCalculatorSlug(stateSlug: string): string {
  const state = ALL_STATES.find(s => s.slug === stateSlug)
  if (!state) return `${stateSlug}-tax-calculator`
  
  return `${stateSlug}-tax-calculator`
}

/**
 * Generate optimized slug for state withholding calculator
 * Pattern: {state}-{keyword}-calculator
 * Examples:
 * - maryland-withholding-tax-calculator
 * - minnesota-paycheck-tax-calculator
 * - virginia-payroll-tax-calculator
 */
export function getStateWithholdingCalculatorSlug(stateSlug: string): string {
  const keyword = STATE_WITHHOLDING_KEYWORDS[stateSlug] || "withholding-tax-calculator"
  
  // Convert keyword to slug format
  const keywordSlug = toSlug(keyword)
  
  // If keyword already includes "calculator", use it as-is
  if (keywordSlug.includes("calculator")) {
    return `${stateSlug}-${keywordSlug}`
  }
  
  // Otherwise add "calculator"
  return `${stateSlug}-${keywordSlug}-calculator`
}

/**
 * Generate optimized slug for state sales tax calculator
 * Pattern: {state}-{keyword}-calculator
 * Examples:
 * - tennessee-car-sales-tax-calculator
 * - maryland-sales-tax-calculator
 * - texas-auto-sales-tax-calculator
 */
export function getStateSalesTaxCalculatorSlug(stateSlug: string): string {
  const keyword = STATE_SALES_TAX_KEYWORDS[stateSlug] || "sales-tax-calculator"
  
  // Convert keyword to slug format
  const keywordSlug = toSlug(keyword)
  
  // If keyword already includes "calculator", use it as-is
  if (keywordSlug.includes("calculator")) {
    return `${stateSlug}-${keywordSlug}`
  }
  
  // Otherwise add "calculator"
  return `${stateSlug}-${keywordSlug}-calculator`
}

/**
 * Generate optimized slug for state vehicle tax calculator
 * Pattern: {state}-vehicle-tax-calculator
 * Example: virginia-vehicle-tax-calculator
 */
export function getStateVehicleTaxCalculatorSlug(stateSlug: string): string {
  return `${stateSlug}-vehicle-tax-calculator`
}

/**
 * Generate optimized slug for Maine excise tax calculator
 */
export function getMaineExciseTaxCalculatorSlug(): string {
  return "maine-excise-tax-calculator"
}

/**
 * Get the new optimized URL for a state calculator
 */
export function getOptimizedStateCalculatorUrl(
  stateSlug: string,
  type: "income-tax" | "withholding" | "sales-tax" | "vehicle-tax" = "income-tax"
): string {
  let slug: string
  
  switch (type) {
    case "income-tax":
      slug = getStateTaxCalculatorSlug(stateSlug)
      break
    case "withholding":
      slug = getStateWithholdingCalculatorSlug(stateSlug)
      break
    case "sales-tax":
      slug = getStateSalesTaxCalculatorSlug(stateSlug)
      break
    case "vehicle-tax":
      slug = getStateVehicleTaxCalculatorSlug(stateSlug)
      break
    default:
      slug = getStateTaxCalculatorSlug(stateSlug)
  }
  
  return `/calculators/${slug}`
}

/**
 * Get old URL for redirect mapping
 */
export function getOldStateCalculatorUrl(
  stateSlug: string,
  type: "income-tax" | "withholding" | "sales-tax" | "vehicle-tax" = "income-tax"
): string {
  const basePath = `/calculators/state/${stateSlug}`
  
  switch (type) {
    case "withholding":
      return `${basePath}/withholding`
    case "sales-tax":
      return `${basePath}/sales-tax`
    case "vehicle-tax":
      return `${basePath}/vehicle-tax`
    case "income-tax":
    default:
      return basePath
  }
}

/**
 * Generate all URL mappings for redirects
 */
export function generateUrlMappings(): Array<{ old: string; new: string }> {
  const mappings: Array<{ old: string; new: string }> = []
  
  ALL_STATES.forEach(state => {
    // Income tax (default)
    mappings.push({
      old: getOldStateCalculatorUrl(state.slug, "income-tax"),
      new: getOptimizedStateCalculatorUrl(state.slug, "income-tax"),
    })
    
    // Check for other calculator types
    const config = STATE_CALCULATOR_CONFIG[state.slug]
    if (config) {
      config.availableCalculators.forEach(calcType => {
        if (calcType !== "income-tax") {
          mappings.push({
            old: getOldStateCalculatorUrl(state.slug, calcType as any),
            new: getOptimizedStateCalculatorUrl(state.slug, calcType as any),
          })
        }
      })
    }
  })
  
  // Maine excise tax special case
  mappings.push({
    old: "/calculators/state/maine/excise-tax",
    new: "/calculators/maine-excise-tax-calculator",
  })
  
  return mappings
}

