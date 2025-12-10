import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { getPublishedBlogs } from '@/lib/supabase/server'
import { Blog } from '@/lib/supabase/types'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Blog - Salary & Tax Articles | SalaryCalc',
  description: 'Expert articles on salary calculations, tax planning, and financial advice. Learn about income taxes, take-home pay, and more.',
  keywords: 'salary blog, tax articles, financial planning, income tax advice',
  openGraph: {
    title: 'Blog - Salary & Tax Articles | SalaryCalc',
    description: 'Expert articles on salary calculations, tax planning, and financial advice.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Salary & Tax Articles | SalaryCalc',
    description: 'Expert articles on salary calculations, tax planning, and financial advice.',
  },
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Expert insights on salary calculations, tax planning, and financial advice
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <Card className="group h-full overflow-hidden bg-card border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group-hover:-translate-y-1">
                    {blog.featured_image && (
                      <div className="relative w-full h-48 overflow-hidden bg-muted">
                        <Image
                          src={blog.featured_image}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      </div>
                    )}
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Calendar className="h-3 w-3" />
                        {blog.published_at && (
                          <time dateTime={blog.published_at}>
                            {format(new Date(blog.published_at), 'MMM d, yyyy')}
                          </time>
                        )}
                      </div>
                      <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-2">
                        {blog.title}
                      </h2>
                      {blog.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {blog.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        <span>Read article</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

