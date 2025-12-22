import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { generateUrlMappings } from './lib/seo-slugs'
import { CALCULATOR_PERMALINK_MAP } from './lib/calculator-permalinks'

// Generate redirect mappings for state calculators
const stateRedirectMappings = generateUrlMappings()
const stateRedirectMap = new Map<string, string>()

// Build redirect map for fast lookup
stateRedirectMappings.forEach(({ old, new: newUrl }) => {
  stateRedirectMap.set(old, newUrl)
})

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check calculator permalink redirects first
  if (CALCULATOR_PERMALINK_MAP[pathname]) {
    const url = request.nextUrl.clone()
    url.pathname = CALCULATOR_PERMALINK_MAP[pathname]
    return NextResponse.redirect(url, 308) // Permanent redirect for SEO
  }

  // Check state calculator redirects
  const redirectTo = stateRedirectMap.get(pathname)
  
  if (redirectTo) {
    const url = request.nextUrl.clone()
    url.pathname = redirectTo
    return NextResponse.redirect(url, 308) // Permanent redirect for SEO
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/calculators/state/:path*',
    '/calculators/:path*',
  ],
}

