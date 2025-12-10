'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase/client'
import { Blog } from '@/lib/supabase/types'
import { RichTextEditor } from './rich-text-editor'
import { ImageUpload } from './image-upload'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Save, Eye } from 'lucide-react'

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  featured_image: z.string().optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived']),
  
  // SEO Fields
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
  
  // Open Graph
  og_title: z.string().optional(),
  og_description: z.string().optional(),
  og_image: z.string().optional().or(z.literal('')),
  
  // Twitter Card
  twitter_card: z.enum(['summary', 'summary_large_image']).optional().nullable(),
  twitter_title: z.string().optional(),
  twitter_description: z.string().optional(),
  twitter_image: z.string().optional().or(z.literal('')),
  
  // Additional SEO
  canonical_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  robots_meta: z.string().optional(),
  schema_markup: z.string().optional(),
})

type BlogFormValues = z.infer<typeof blogSchema>

interface BlogFormProps {
  blog?: Blog
}

export function BlogForm({ blog }: BlogFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState(blog?.content || '')

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog?.title || '',
      slug: blog?.slug || '',
      content: blog?.content || '',
      excerpt: blog?.excerpt || '',
      featured_image: blog?.featured_image || '',
      status: blog?.status || 'draft',
      meta_title: blog?.meta_title || '',
      meta_description: blog?.meta_description || '',
      meta_keywords: blog?.meta_keywords || '',
      og_title: blog?.og_title || '',
      og_description: blog?.og_description || '',
      og_image: blog?.og_image || '',
      twitter_card: blog?.twitter_card || null,
      twitter_title: blog?.twitter_title || '',
      twitter_description: blog?.twitter_description || '',
      twitter_image: blog?.twitter_image || '',
      canonical_url: blog?.canonical_url || '',
      robots_meta: blog?.robots_meta || '',
      schema_markup: blog?.schema_markup || '',
    },
  })

  useEffect(() => {
    form.setValue('content', content)
  }, [content, form])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (title: string) => {
    form.setValue('title', title)
    if (!blog || !form.getValues('slug')) {
      form.setValue('slug', generateSlug(title))
    }
  }

  const onSubmit = async (values: BlogFormValues) => {
    try {
      setSaving(true)

      const blogData = {
        ...values,
        content,
        published_at: values.status === 'published' && !blog?.published_at
          ? new Date().toISOString()
          : blog?.published_at || null,
      }

      if (blog) {
        // Update existing blog
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', blog.id)

        if (error) throw error
        toast.success('Blog updated successfully')
      } else {
        // Create new blog
        const { error } = await supabase
          .from('blogs')
          .insert([blogData])

        if (error) throw error
        toast.success('Blog created successfully')
      }

      router.push('/admin')
    } catch (error: any) {
      console.error('Error saving blog:', error)
      toast.error(error.message || 'Failed to save blog')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Main content and settings for your blog post</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            handleTitleChange(e.target.value)
                          }}
                          placeholder="Enter blog title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="blog-post-slug" />
                      </FormControl>
                      <FormDescription>
                        URL-friendly version of the title (auto-generated)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Brief description of the blog post"
                          rows={3}
                        />
                      </FormControl>
                      <FormDescription>
                        A short summary that appears in blog listings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={() => (
                    <FormItem>
                      <FormLabel>Content *</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          content={content}
                          onChange={setContent}
                          placeholder="Start writing your blog post..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value || ''}
                          onChange={field.onChange}
                          folder="featured"
                          description="Main image displayed with the blog post"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize your blog post for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="meta_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="SEO optimized title (50-60 characters)" />
                      </FormControl>
                      <FormDescription>
                        Title shown in search engine results. If empty, the blog title will be used.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="meta_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Brief description for search engines (150-160 characters)"
                          rows={3}
                        />
                      </FormControl>
                      <FormDescription>
                        Description shown in search engine results
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="meta_keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Keywords</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="keyword1, keyword2, keyword3" />
                      </FormControl>
                      <FormDescription>
                        Comma-separated keywords (less important for modern SEO)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="canonical_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Canonical URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://yoursite.com/blog/post-slug" />
                      </FormControl>
                      <FormDescription>
                        Preferred URL if content is duplicated elsewhere
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="robots_meta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Robots Meta</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="noindex, nofollow" />
                      </FormControl>
                      <FormDescription>
                        Control how search engines index this page (e.g., "noindex, nofollow")
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Sharing</CardTitle>
                <CardDescription>Customize how your blog appears when shared on social media</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Open Graph (Facebook, LinkedIn, etc.)</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="og_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OG Title</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Title for social media shares" />
                          </FormControl>
                          <FormDescription>
                            If empty, meta title or blog title will be used
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="og_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OG Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Description for social media shares"
                              rows={3}
                            />
                          </FormControl>
                          <FormDescription>
                            If empty, meta description or excerpt will be used
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="og_image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OG Image</FormLabel>
                          <FormControl>
                            <ImageUpload
                              value={field.value || ''}
                              onChange={field.onChange}
                              folder="og-images"
                              description="Image shown when shared on social media (recommended: 1200x630px)"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Twitter Card</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="twitter_card"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Card Type</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value === 'null' ? null : value)}
                            value={field.value || 'null'}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select card type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="null">Default</SelectItem>
                              <SelectItem value="summary">Summary</SelectItem>
                              <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Card type for Twitter sharing
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="twitter_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Title</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Title for Twitter shares" />
                          </FormControl>
                          <FormDescription>
                            If empty, OG title or meta title will be used
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="twitter_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Description for Twitter shares"
                              rows={3}
                            />
                          </FormControl>
                          <FormDescription>
                            If empty, OG description or meta description will be used
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="twitter_image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Image</FormLabel>
                          <FormControl>
                            <ImageUpload
                              value={field.value || ''}
                              onChange={field.onChange}
                              folder="twitter-images"
                              description="Image for Twitter shares (recommended: 1200x675px for large cards)"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Additional SEO and technical settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="schema_markup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Schema Markup (JSON-LD)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder='{"@context": "https://schema.org", "@type": "BlogPosting", ...}'
                          rows={10}
                          className="font-mono text-sm"
                        />
                      </FormControl>
                      <FormDescription>
                        Structured data in JSON-LD format for rich snippets
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-end gap-4 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : blog ? 'Update Blog' : 'Create Blog'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

