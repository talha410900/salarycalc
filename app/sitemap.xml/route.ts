import { NextResponse } from "next/server"

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

const sitemapPaths = [
  "/sitemaps/pages.xml",
  "/sitemaps/blogs.xml",
  "/sitemaps/categories.xml",
  "/sitemaps/tags.xml",
  "/sitemaps/states.xml",
]

function generateSitemapIndex(urls: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</sitemapindex>`
}

export const dynamic = "force-dynamic"

export async function GET() {
  const now = new Date().toISOString()

  const items = sitemapPaths
    .map((path) => {
      const loc = `${baseUrl}${path}`
      return `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
    })
    .join("\n")

  const xml = generateSitemapIndex(items)
  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  })
}

