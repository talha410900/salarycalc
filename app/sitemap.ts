import type { MetadataRoute } from "next"
import { getPublishedBlogs } from "@/lib/supabase/server"
import { STATE_TAX_DATA, ALL_STATES } from "@/lib/state-tax-data"
import { hasCalculatorType } from "@/lib/state-calculator-types"
import { BIWEEKLY_SEO_AMOUNTS, getBiweeklyAmountPath } from "@/lib/seo-amount-pages"

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://www.taxsal.com"

const staticRoutes = [
  "/",
  "/about",
  "/blog",
  "/contact",
  "/tax-brackets",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/calculators/payroll-tax-calculator",
  "/calculators/customs-import-duty-calculator",
  "/calculators/texas-paycheck-calculator",
  "/calculators/amt-calculator",
  "/calculators/california-capital-gains-tax-calculator",
  "/calculators/real-estate-capital-gains-calculator",
  "/calculators/self-employed-tax-calculator",
  "/calculators/mn-sales-tax-calculator",
  "/calculators/la-sales-tax-calculator",
  "/calculators/us-import-tax-calculator",
  "/calculators/tax-return-calculator",
  "/calculators/medicare-tax-calculator",
  "/calculators/mortgage-tax-calculator",
  "/calculators/ny-mortgage-tax-calculator",
  "/calculators/va-property-tax-car-calculator",
  "/calculators/illinois-property-tax-calculator",
  "/calculators/rental-property-capital-gains-calculator",
  "/calculators/nc-capital-gains-calculator",
  "/calculators/hourly-to-salary-calculator",
  "/calculators/salary-to-hourly-calculator",
  "/calculators/monthly-to-yearly-calculator",
  "/calculators/biweekly-to-annual-calculator",
  "/calculators/overtime-pay-calculator",
  "/calculators/federal-tax-calculator",
  "/calculators/take-home-pay-calculator",
  "/calculators/state-tax-comparison",
  "/calculators/reverse-salary-calculator",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Fetch all published blogs for dynamic sitemap entries
  const blogs = await getPublishedBlogs().catch(() => [])

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const blogEntries: MetadataRoute.Sitemap = (blogs || []).map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updated_at ? new Date(blog.updated_at) : now,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  // State income tax calculators (default)
  const stateEntries: MetadataRoute.Sitemap = Object.keys(STATE_TAX_DATA).map((slug) => ({
    url: `${baseUrl}/calculators/state/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }))

  // State withholding calculators
  const stateWithholdingEntries: MetadataRoute.Sitemap = ALL_STATES.filter((state) =>
    hasCalculatorType(state.slug, "withholding")
  ).map((state) => ({
    url: `${baseUrl}/calculators/state/${state.slug}/withholding`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }))

  // State sales tax calculators
  const stateSalesTaxEntries: MetadataRoute.Sitemap = ALL_STATES.filter((state) =>
    hasCalculatorType(state.slug, "sales-tax")
  ).map((state) => ({
    url: `${baseUrl}/calculators/state/${state.slug}/sales-tax`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }))

  // State vehicle tax calculators
  const stateVehicleTaxEntries: MetadataRoute.Sitemap = ALL_STATES.filter((state) =>
    hasCalculatorType(state.slug, "vehicle-tax")
  ).map((state) => ({
    url: `${baseUrl}/calculators/state/${state.slug}/vehicle-tax`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }))

  // Maine excise tax calculator (special route)
  const maineExciseTaxEntry: MetadataRoute.Sitemap = [{
    url: `${baseUrl}/calculators/state/maine/excise-tax`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }]

  const biweeklyAmountEntries: MetadataRoute.Sitemap = BIWEEKLY_SEO_AMOUNTS.map((amount) => ({
    url: `${baseUrl}${getBiweeklyAmountPath(amount)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  return [
    ...staticEntries,
    ...stateEntries,
    ...stateWithholdingEntries,
    ...stateSalesTaxEntries,
    ...stateVehicleTaxEntries,
    ...maineExciseTaxEntry,
    ...biweeklyAmountEntries,
    ...blogEntries,
  ]
}

