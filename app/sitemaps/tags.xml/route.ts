import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/server"

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

function wrapUrl(loc: string) {
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
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
  const { data: tags, error } = await supabase
    .from("tags")
    .select("slug")
    .order("name", { ascending: true })

  if (error) {
    console.error("Error fetching tags for sitemap:", error.message)
  }

  const urls = (tags || [])
    .filter((t) => t.slug)
    .map((t) => wrapUrl(`${baseUrl}/blog?tag=${encodeURIComponent(t.slug)}`))
    .join("\n")

  const xml = generateXml(urls)
  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  })
}

