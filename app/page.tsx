import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CalculatorGrid } from "@/components/calculator-grid"
import { StateTaxSection } from "@/components/state-tax-section"
import { BlogSection } from "@/components/blog-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { StatsSection } from "@/components/stats-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Footer } from "@/components/footer"
import { getPublishedBlogs } from "@/lib/supabase/server"

export default async function Home() {
  const blogs = await getPublishedBlogs()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <CalculatorGrid />
        <StateTaxSection />
        <FeaturesSection />
        <HowItWorksSection />
        <BlogSection blogs={blogs} />
        <FAQSection />
        <NewsletterSignup />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
