import type React from "react"
import type { Metadata } from "next"
import { Nunito, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from "@next/third-parties/google"
import { CookieConsent } from "@/components/cookie-consent"
import { Toaster } from "@/components/ui/sonner"
import { DevSEOWidget } from "@/components/dev-seo-widget"
import { OneSignalProvider } from "@/components/one-signal-provider"
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
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.ico' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TaxSal',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Salary and Tax Estimator USA | Free State-Wise Calculator – TaxSal",
    description: "Use TaxSal free salary and tax estimator USA to calculate income tax and take-home pay for every U.S. state. Fast, accurate & easy.",
    type: "website",
    siteName: "TaxSal",
    locale: "en_US",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "TaxSal - Free Tool to Estimate Salary and Taxes in the USA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary and Tax Estimator USA | Free State-Wise Calculator – TaxSal",
    description: "Use TaxSal free salary and tax estimator USA to calculate income tax and take-home pay for every U.S. state. Fast, accurate & easy.",
    images: ["/images/logo.png"],
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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TaxSal',
    description: 'Free Tool to Estimate Salary and Taxes in the USA',
    url: 'https://taxsal.com',
    logo: 'https://taxsal.com/images/logo.png',
    sameAs: [],
  }

  return (
    <html lang="en">
      <head>
        {/* Google AdSense - Required in head for ownership verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6279801914353696"
          crossOrigin="anonymous"
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6279801914353696"
     crossOrigin="anonymous"></script>
      </head>
      <body className={`${nunito.variable} ${geistMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-7PK3P58RGV" />
        <OneSignalProvider appId="d191fe31-bca3-4e5d-9021-040017f14e4c" />
        <CookieConsent />
        <Toaster />
        <DevSEOWidget />
      </body>
    </html>
  )
}
