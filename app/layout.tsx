import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CookieConsent } from "@/components/cookie-consent"
import { Toaster } from "@/components/ui/sonner"
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
  title: "TaxSal - Free Tax & Salary Calculator",
  description:
    "Fast, accurate tax & salary calculators for every U.S. state. Calculate your take-home pay, federal tax withholding, state taxes, and more.",
    generator: 'v0.app'
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
      </body>
    </html>
  )
}
