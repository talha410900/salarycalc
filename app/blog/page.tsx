import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import { getPublishedBlogs } from '@/lib/supabase/server'
import { Blog } from '@/lib/supabase/types'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BlogFilters } from '@/components/blog-filters'
import { BlogPagination } from '@/components/blog-pagination'

export const metadata: Metadata = {
  title: 'Blog - Tax & Salary Articles | TaxSal',
  description: 'Expert articles on salary calculations, tax planning, and financial advice. Learn about income taxes, take-home pay, and more.',
  keywords: 'salary blog, tax articles, financial planning, income tax advice',
  openGraph: {
    title: 'Blog - Tax and Salary Articles | TaxSal',
    description: 'Expert articles on salary calculations, tax planning, and financial advice.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Tax and Salary Articles | TaxSal',
    description: 'Expert articles on salary calculations, tax planning, and financial advice.',
  },
}

interface BlogPageProps {
  searchParams: Promise<{ category?: string; tag?: string; page?: string }>
}

const BLOGS_PER_PAGE = 9

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const blogs = await getPublishedBlogs()
  const params = await searchParams
  const selectedCategory = params.category
  const selectedTag = params.tag
  const currentPage = Math.max(1, parseInt(params.page || '1', 10))

  // Filter blogs based on search params
  const filteredBlogs = blogs.filter((blog) => {
    if (selectedCategory && blog.category !== selectedCategory) return false
    if (selectedTag && !blog.tags?.includes(selectedTag)) return false
    return true
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE)
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE
  const endIndex = startIndex + BLOGS_PER_PAGE
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex)

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

          {/* Filters */}
          <BlogFilters blogs={blogs} />

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                {blogs.length === 0
                  ? "No blog posts available yet. Check back soon!"
                  : "No blog posts match your filters. Try adjusting your selection."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedBlogs.map((blog) => (
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
                        <div className="flex items-center justify-end gap-2 mb-3">
                          {blog.category && (
                            <Badge variant="secondary" className="text-xs">
                              {blog.category}
                            </Badge>
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
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {blog.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {blog.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{blog.tags.length - 3}
                              </Badge>
                            )}
                          </div>
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

              {totalPages > 1 && (
                <div className="mt-12">
                  <Suspense fallback={<div className="h-10" />}>
                    <BlogPagination currentPage={currentPage} totalPages={totalPages} />
                  </Suspense>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

