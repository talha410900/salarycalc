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
import { Save, Eye, X, Plus, HelpCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Category, Tag } from '@/lib/supabase/types'
import { SEOChecklist } from './seo-checklist'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  featured_image: z.string().optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived']),
  
  // Tags and Categories
  tags: z.array(z.string()).default([]),
  category: z.string().optional().nullable(),
  
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
  const [tagInput, setTagInput] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryDesc, setNewCategoryDesc] = useState('')
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [focusKeyword, setFocusKeyword] = useState('')
  const [isPillarContent, setIsPillarContent] = useState(false)

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog?.title || '',
      slug: blog?.slug || '',
      content: blog?.content || '',
      excerpt: blog?.excerpt || '',
      featured_image: blog?.featured_image || '',
      status: blog?.status || 'draft',
      tags: blog?.tags || [],
      category: blog?.category || null,
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

  const selectedTags = form.watch('tags')
  const selectedCategory = form.watch('category')

  useEffect(() => {
    form.setValue('content', content)
    fetchCategories()
    fetchTags()
  }, [content, form])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true })
      
      if (error) throw error
      setCategories(data || [])
    } catch (error: any) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchTags = async () => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true })
      
      if (error) throw error
      setTags(data || [])
    } catch (error: any) {
      console.error('Error fetching tags:', error)
    }
  }

  const createCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error('Category name is required')
      return
    }

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{
          name: newCategoryName.trim(),
          description: newCategoryDesc.trim() || null,
        }])
        .select()
        .single()

      if (error) throw error
      toast.success('Category created successfully')
      form.setValue('category', data.name)
      setNewCategoryName('')
      setNewCategoryDesc('')
      setShowNewCategory(false)
      fetchCategories()
    } catch (error: any) {
      console.error('Error creating category:', error)
      toast.error(error.message || 'Failed to create category')
    }
  }

  const createTag = async (tagName: string) => {
    if (!tagName.trim()) {
      return
    }

    try {
      const { data, error } = await supabase
        .from('tags')
        .insert([{
          name: tagName.trim(),
        }])
        .select()
        .single()

      if (error) throw error
      toast.success('Tag created successfully')
      fetchTags()
      return data.name
    } catch (error: any) {
      console.error('Error creating tag:', error)
      toast.error(error.message || 'Failed to create tag')
      return null
    }
  }

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

  const addTag = async () => {
    const trimmedTag = tagInput.trim().toLowerCase()
    if (!trimmedTag || selectedTags.includes(trimmedTag)) {
      setTagInput('')
      return
    }

    // Check if tag exists in database
    const existingTag = tags.find(t => t.name.toLowerCase() === trimmedTag)
    let tagName = existingTag ? existingTag.name : trimmedTag

    // If tag doesn't exist, create it
    if (!existingTag) {
      const createdTag = await createTag(trimmedTag)
      if (createdTag) {
        tagName = createdTag
      } else {
        return
      }
    }

    form.setValue('tags', [...selectedTags, tagName])
    setTagInput('')
  }

  const removeTag = (tagToRemove: string) => {
    form.setValue('tags', selectedTags.filter(tag => tag !== tagToRemove))
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const onSubmit = async (values: BlogFormValues) => {
    try {
      setSaving(true)

      const blogData = {
        ...values,
        content,
        tags: values.tags || [],
        category: values.category || null,
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
    <>
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

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Category</FormLabel>
                      <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? categories.find((cat) => cat.name === field.value)?.name
                                : "Select category..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search categories..." />
                            <CommandList>
                              <CommandEmpty>
                                <div className="p-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => setShowNewCategory(true)}
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create new category
                                  </Button>
                                </div>
                              </CommandEmpty>
                              <CommandGroup>
                                <CommandItem
                                  onSelect={() => {
                                    field.onChange(null)
                                    setCategoryOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      !field.value ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  No Category
                                </CommandItem>
                                {categories.map((category) => (
                                  <CommandItem
                                    key={category.id}
                                    onSelect={() => {
                                      field.onChange(category.name)
                                      setCategoryOpen(false)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === category.name ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {category.name}
                                  </CommandItem>
                                ))}
                                <CommandItem
                                  onSelect={() => setShowNewCategory(true)}
                                  className="text-primary"
                                >
                                  <Plus className="mr-2 h-4 w-4" />
                                  Create new category
                                </CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {showNewCategory && (
                        <div className="mt-2 p-3 border rounded-md space-y-2">
                          <Input
                            placeholder="Category name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                          />
                          <Textarea
                            placeholder="Description (optional)"
                            value={newCategoryDesc}
                            onChange={(e) => setNewCategoryDesc(e.target.value)}
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              size="sm"
                              onClick={async () => {
                                await createCategory()
                                setShowNewCategory(false)
                              }}
                            >
                              Create
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setShowNewCategory(false)
                                setNewCategoryName('')
                                setNewCategoryDesc('')
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                      <FormDescription>
                        Categorize your blog post for better organization
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={() => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagInputKeyDown}
                                placeholder="Type to search or create a tag"
                                list="tags-list"
                              />
                              {tagInput && tags.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 bg-popover border rounded-md shadow-md max-h-60 overflow-auto">
                                  {tags
                                    .filter(t => t.name.toLowerCase().includes(tagInput.toLowerCase()))
                                    .slice(0, 5)
                                    .map((tag) => (
                                      <button
                                        key={tag.id}
                                        type="button"
                                        className="w-full text-left px-3 py-2 hover:bg-accent text-sm"
                                        onClick={() => {
                                          if (!selectedTags.includes(tag.name)) {
                                            form.setValue('tags', [...selectedTags, tag.name])
                                          }
                                          setTagInput('')
                                        }}
                                      >
                                        {tag.name}
                                      </button>
                                    ))}
                                </div>
                              )}
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addTag}
                              disabled={!tagInput.trim()}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          {selectedTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
                              {selectedTags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          )}
                          {tags.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                              Popular tags: {tags.slice(0, 5).map(t => t.name).join(', ')}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Add tags to help users find related content. Type to search existing tags or create new ones. Press Enter to add.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            {/* Focus Keyword Input */}
            <Card>
              <CardHeader>
                <CardTitle>Focus Keyword</CardTitle>
                <CardDescription>Enter your primary keyword for SEO analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                    placeholder="e.g., online dl check by cnic"
                    className="max-w-md"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    This keyword will be used to analyze your content for SEO optimization.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pillar-content"
                    checked={isPillarContent}
                    onCheckedChange={(checked) => setIsPillarContent(checked === true)}
                  />
                  <label
                    htmlFor="pillar-content"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    This post is Pillar Content
                  </label>
                  <HelpCircle className="h-3 w-3 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

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
                        <Input {...field} placeholder="https://taxsal.com/blog/post-slug" />
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

    {/* SEO Checklist Widget - Fixed on bottom right */}
    {focusKeyword && (
      <SEOChecklist
        focusKeyword={focusKeyword}
        title={form.watch('title')}
        metaTitle={form.watch('meta_title') || ''}
        metaDescription={form.watch('meta_description') || ''}
        slug={form.watch('slug')}
        content={content}
        excerpt={form.watch('excerpt') || ''}
      />
    )}
  </>
  )
}

