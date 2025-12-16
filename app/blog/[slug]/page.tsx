import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { Calendar, Clock, Tag } from 'lucide-react'
import { getBlogBySlug, getPublishedBlogs } from '@/lib/supabase/server'
import { Blog } from '@/lib/supabase/types'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs()
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
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
  const canonicalUrl = blog.canonical_url || `https://yoursite.com/blog/${blog.slug}`

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

  return (
    <>
      {/* Schema Markup */}
      {blog.schema_markup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: blog.schema_markup }}
        />
      )}

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <article className="py-12">
            <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              {blog.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={blog.published_at}>
                    {format(new Date(blog.published_at), 'MMMM d, yyyy')}
                  </time>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
              {blog.category && (
                <Link href={`/blog?category=${encodeURIComponent(blog.category)}`}>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    {blog.category}
                  </Badge>
                </Link>
              )}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {blog.tags.map((tag) => (
                  <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}

            {blog.featured_image && (
              <div className="relative w-full h-96 overflow-hidden rounded-lg bg-muted mb-8">
                <Image
                  src={blog.featured_image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            )}

            {blog.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {blog.excerpt}
              </p>
            )}
          </header>

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  )
}

