import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { getPublishedBlogs } from "@/lib/supabase/server"
import { Blog } from "@/lib/supabase/types"

export async function GuidesSection() {
  const blogs = await getPublishedBlogs(3)

  // Calculate reading time for blogs
  const blogsWithReadingTime = blogs.map((blog) => {
    const wordCount = blog.content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)
    return { ...blog, readingTime: `${readingTime} min` }
  })

  return (
    <section id="guides" className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Blogs</h2>
            <p className="text-sm text-muted-foreground">Expert articles to help you understand your finances.</p>
          </div>
          {blogs.length > 0 && (
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {blogsWithReadingTime.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {blogsWithReadingTime.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`} className="group">
                <Card className="h-full overflow-hidden bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border hover:border-primary/30">
                  {blog.featured_image ? (
                <div className="aspect-[16/9] overflow-hidden relative">
                      <Image
                        src={blog.featured_image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                  />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Clock className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                </div>
                  )}
                <CardHeader className="pb-1 pt-3 px-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Clock className="h-3 w-3" />
                      <span>{blog.readingTime}</span>
                      {blog.published_at && (
                        <>
                          <span>•</span>
                          <Calendar className="h-3 w-3" />
                          <time dateTime={blog.published_at}>
                            {format(new Date(blog.published_at), 'MMM d')}
                          </time>
                        </>
                      )}
                  </div>
                  <CardTitle className="text-sm font-bold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 px-4 pb-3">
                  <CardDescription className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {blog.excerpt || blog.title}
                  </CardDescription>
                  <div className="flex items-center text-xs font-semibold text-primary">
                    Read
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}
