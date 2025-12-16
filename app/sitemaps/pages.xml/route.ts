import { NextResponse } from "next/server"
import { heroCalculators } from "@/lib/calculators"

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
]

const otherCalculators = [
  "/calculators/hourly-to-salary",
  "/calculators/salary-to-hourly",
  "/calculators/monthly-to-yearly",
  "/calculators/biweekly-to-annual",
  "/calculators/overtime-pay",
  "/calculators/federal-tax",
  "/calculators/take-home-pay",
]

function wrapUrl(loc: string, priority = "0.7") {
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
}

function generateXml(urls: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

export const dynamic = "force-dynamic"

export async function GET() {
  const calculatorRoutes = heroCalculators.map((c) => c.href)
  const allRoutes = [...staticRoutes, ...calculatorRoutes, ...otherCalculators]

  const urls = Array.from(new Set(allRoutes))
    .map((path) => wrapUrl(`${baseUrl}${path}`))
    .join("\n")

  const xml = generateXml(urls)
  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  })
}

