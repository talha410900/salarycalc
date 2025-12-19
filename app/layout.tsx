import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CookieConsent } from "@/components/cookie-consent"
import { Toaster } from "@/components/ui/sonner"
import { DevSEOWidget } from "@/components/dev-seo-widget"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
    title: "Tax Calculator | Free Tax and Salary Calculator 2025-2026 | TaxSal",
  description:
    "Free tax calculator and salary calculator for 2025-2026. Calculate take-home pay, federal tax withholding, state taxes, payroll taxes, and more. Fast, accurate tax calculators for every U.S. state.",
  keywords: "tax calculator, salary calculator, tax withholding calculator, paycheck calculator, take home pay calculator, federal tax calculator, state tax calculator",
  generator: 'v0.app',
  openGraph: {
    title: "Tax Calculator | Free Tax and Salary Calculator 2025-2026 | TaxSal",
    description: "Free tax calculator and salary calculator for 2025-2026. Calculate take-home pay, federal tax withholding, state taxes, and more.",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#0d9488",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <CookieConsent />
        <Toaster />
        <DevSEOWidget />
      </body>
    </html>
  )
}
