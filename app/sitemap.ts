import type { MetadataRoute } from "next"
import { getPublishedBlogs } from "@/lib/supabase/server"
import { STATE_TAX_DATA } from "@/lib/state-tax-data"

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

const staticRoutes = [
  "/",
  "/blog",
  "/contact",
  "/tax-brackets",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/calculators/payroll-tax",
  "/calculators/customs-import-duty",
  "/calculators/texas-paycheck",
  "/calculators/amt",
  "/calculators/ca-capital-gains",
  "/calculators/real-estate-capital-gains",
  "/calculators/self-employed-tax",
  "/calculators/mn-sales-tax",
  "/calculators/la-sales-tax",
  "/calculators/us-import-tax",
  "/calculators/hourly-to-salary",
  "/calculators/salary-to-hourly",
  "/calculators/monthly-to-yearly",
  "/calculators/biweekly-to-annual",
  "/calculators/overtime-pay",
  "/calculators/federal-tax",
  "/calculators/take-home-pay",
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

  const stateEntries: MetadataRoute.Sitemap = Object.keys(STATE_TAX_DATA).map((slug) => ({
    url: `${baseUrl}/calculators/state/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }))

  return [...staticEntries, ...stateEntries, ...blogEntries]
}

