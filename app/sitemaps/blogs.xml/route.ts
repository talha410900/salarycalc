import { NextResponse } from "next/server"
import { getPublishedBlogs } from "@/lib/supabase/server"

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

function wrapUrl(loc: string, lastmod?: string | null) {
  const lm = lastmod || new Date().toISOString()
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lm}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
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
  const blogs = await getPublishedBlogs().catch(() => [])

  const urls = (blogs || [])
    .map((blog) =>
      wrapUrl(
        `${baseUrl}/blog/${blog.slug}`,
        blog.updated_at || blog.published_at || undefined,
      ),
    )
    .join("\n")

  const xml = generateXml(urls)
  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  })
}

