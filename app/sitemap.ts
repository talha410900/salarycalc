import type { MetadataRoute } from "next"
import { getPublishedBlogs } from "@/lib/supabase/server"
import { supabase } from "@/lib/supabase/server"
import { STATE_TAX_DATA, ALL_STATES } from "@/lib/state-tax-data"
import { hasCalculatorType } from "@/lib/state-calculator-types"

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://taxsal.com")

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

  // Fetch categories and tags
  const [{ data: categories }, { data: tags }] = await Promise.all([
    supabase.from("categories").select("slug, updated_at, created_at"),
    supabase.from("tags").select("slug, updated_at, created_at"),
  ]).catch(() => [{ data: [] }, { data: [] }])

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

  const categoryEntries: MetadataRoute.Sitemap =
    (categories || []).map((category) => ({
      url: `${baseUrl}/blog?category=${encodeURIComponent(category.slug)}`,
      lastModified: category.updated_at
        ? new Date(category.updated_at)
        : category.created_at
          ? new Date(category.created_at)
          : now,
      changeFrequency: "weekly",
      priority: 0.5,
    }))

  const tagEntries: MetadataRoute.Sitemap =
    (tags || []).map((tag) => ({
      url: `${baseUrl}/blog?tag=${encodeURIComponent(tag.slug)}`,
      lastModified: tag.updated_at
        ? new Date(tag.updated_at)
        : tag.created_at
          ? new Date(tag.created_at)
          : now,
      changeFrequency: "weekly",
      priority: 0.4,
    }))

  return [
    ...staticEntries,
    ...stateEntries,
    ...stateWithholdingEntries,
    ...stateSalesTaxEntries,
    ...stateVehicleTaxEntries,
    ...maineExciseTaxEntry,
    ...categoryEntries,
    ...tagEntries,
    ...blogEntries,
  ]
}

