import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Tag, ArrowLeft } from 'lucide-react'
import {
  getBlogBySlug,
  getRelatedBlogs,
  getRecentBlogs,
  getAllCategories,
  getAllTags,
} from '@/lib/supabase/server'
import { Blog } from '@/lib/supabase/types'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FAQSchema } from '@/components/faq-schema'
import { BlogSidebar } from '@/components/blog-sidebar'
import { BlogShareButtons } from '@/components/blog-share-buttons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  const title = blog.meta_title || blog.og_title || blog.title
  const description = blog.meta_description || blog.og_description || blog.excerpt || blog.title
  const image = blog.og_image || blog.twitter_image || blog.featured_image
  const canonicalUrl = blog.canonical_url || `https://taxsal.com/blog/${blog.slug}`

  const metadata: Metadata = {
    title,
    description,
    keywords: blog.meta_keywords || undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: blog.robots_meta || undefined,
    openGraph: {
      title: blog.og_title || title,
      description: blog.og_description || description,
      images: image ? [{ url: image }] : undefined,
      type: 'article',
      publishedTime: blog.published_at || undefined,
      modifiedTime: blog.updated_at || undefined,
    },
    twitter: {
      card: (blog.twitter_card as 'summary' | 'summary_large_image') || 'summary_large_image',
      title: blog.twitter_title || title,
      description: blog.twitter_description || description,
      images: blog.twitter_image ? [blog.twitter_image] : undefined,
    },
  }

  return metadata
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = blog.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  // Fetch related content
  const [relatedBlogs, recentBlogs, categories, tags] = await Promise.all([
    getRelatedBlogs(blog.id, blog.category, blog.tags || [], 3),
    getRecentBlogs(5),
    getAllCategories(),
    getAllTags(),
  ])

  return (
    <>
      {/* Schema Markup */}
      {blog.schema_markup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: blog.schema_markup }}
        />
      )}

      {/* FAQ Schema Markup */}
      {blog.faqs && blog.faqs.length > 0 && (
        <FAQSchema faqs={blog.faqs} />
      )}

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <article className="py-8 md:py-12">
            <div className="container mx-auto px-4 max-w-7xl">
              {/* Back Button */}
              <div className="mb-6">
                <Link href="/blog">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  {/* Header */}
                  <header className="mb-8">
                    {blog.category && (
                      <Link href={`/blog?category=${encodeURIComponent(blog.category)}`}>
                        <Badge
                          variant="secondary"
                          className="mb-4 cursor-pointer hover:bg-secondary/80"
                        >
                          {blog.category}
                        </Badge>
                      </Link>
                    )}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
                      {blog.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{readingTime} min read</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        {blog.tags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/blog?tag=${encodeURIComponent(tag)}`}
                          >
                            <Badge
                              variant="outline"
                              className="cursor-pointer hover:bg-accent transition-colors"
                            >
                              {tag}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Featured Image */}
                    {blog.featured_image && (
                      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl bg-muted mb-8 shadow-lg">
                        <Image
                          src={blog.featured_image}
                          alt={blog.featured_image_alt || blog.title}
                          fill
                          className="object-cover"
                          priority
                          unoptimized
                        />
                      </div>
                    )}

                    {/* Excerpt */}
                    {blog.excerpt && (
                      <div className="bg-muted/50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
                        <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
                          {blog.excerpt}
                        </p>
                      </div>
                    )}
                  </header>

                  {/* Content */}
                  <div
                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-lg prose-img:mx-auto prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  {/* Share Section */}
                  <div className="mt-12 pt-8 border-t">
                    <BlogShareButtons
                      title={blog.title}
                      url={`https://taxsal.com/blog/${blog.slug}`}
                    />
                  </div>

                  {/* FAQs Section */}
                  {blog.faqs && blog.faqs.length > 0 && (
                    <div className="mt-12 pt-12 border-t">
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
                        Frequently Asked Questions
                      </h2>
                      <Accordion type="single" collapsible className="w-full">
                        {blog.faqs.map((faq, index) => (
                          <AccordionItem
                            key={index}
                            value={`faq-${index}`}
                            className="border-b"
                          >
                            <AccordionTrigger className="text-left font-semibold hover:no-underline">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}

                  {/* Related Posts Section (Mobile/Tablet) */}
                  {relatedBlogs.length > 0 && (
                    <div className="mt-12 lg:hidden">
                      <h2 className="text-2xl font-bold text-foreground mb-6">
                        Related Articles
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {relatedBlogs.map((relatedBlog) => (
                          <Link
                            key={relatedBlog.id}
                            href={`/blog/${relatedBlog.slug}`}
                            className="group"
                          >
                            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                              {relatedBlog.featured_image && (
                                <div className="relative w-full h-40 overflow-hidden bg-muted">
                                  <Image
                                    src={relatedBlog.featured_image}
                                    alt={relatedBlog.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    unoptimized
                                  />
                                </div>
                              )}
                              <CardContent className="p-4">
                                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                                  {relatedBlog.title}
                                </h3>
                                {relatedBlog.excerpt && (
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {relatedBlog.excerpt}
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                  <div className="sticky top-18">
                    <BlogSidebar
                      relatedBlogs={relatedBlogs}
                      recentBlogs={recentBlogs}
                      categories={categories}
                      tags={tags}
                      currentCategory={blog.category}
                      currentTags={blog.tags || []}
                    />
                  </div>
                </aside>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  )
}

