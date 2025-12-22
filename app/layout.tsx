import type React from "react"
import type { Metadata } from "next"
import { Nunito, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CookieConsent } from "@/components/cookie-consent"
import { Toaster } from "@/components/ui/sonner"
import { DevSEOWidget } from "@/components/dev-seo-widget"
import "./globals.css"

const nunito = Nunito({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-nunito',
})
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
    title: "Salary and Tax Estimator USA | Free State-Wise Calculator – TaxSal",
  description:
    "Use TaxSal free salary and tax estimator USA to calculate income tax and take-home pay for every U.S. state. Fast, accurate & easy.",
  keywords: "salary and tax estimator USA, tax calculator, salary calculator, tax withholding calculator, paycheck calculator, take home pay calculator, federal tax calculator, state tax calculator",
  generator: 'v0.app',
  openGraph: {
    title: "Salary and Tax Estimator USA | Free State-Wise Calculator – TaxSal",
    description: "Use TaxSal free salary and tax estimator USA to calculate income tax and take-home pay for every U.S. state. Fast, accurate & easy.",
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
      <body className={`${nunito.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <CookieConsent />
        <Toaster />
        <DevSEOWidget />
      </body>
    </html>
  )
}
