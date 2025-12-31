import { createClient } from '@supabase/supabase-js'
import { Blog } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Server-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getPublishedBlogs(limit?: number): Promise<Blog[]> {
  try {
    let query = supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching blogs:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      console.error('Error fetching blog:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

export async function getRelatedBlogs(
  currentBlogId: string,
  category: string | null,
  tags: string[],
  limit: number = 3
): Promise<Blog[]> {
  try {
    // First try to get blogs with same category
    if (category) {
      const { data: categoryBlogs, error: categoryError } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .eq('category', category)
        .neq('id', currentBlogId)
        .order('published_at', { ascending: false })
        .limit(limit)

      if (!categoryError && categoryBlogs && categoryBlogs.length > 0) {
        return categoryBlogs
      }
    }

    // If no category matches, try to get blogs with matching tags
    if (tags && tags.length > 0) {
      // Get all published blogs and filter by tags in memory
      // (Supabase array overlap might not work as expected, so we filter manually)
      const { data: allBlogs, error: tagError } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .neq('id', currentBlogId)
        .order('published_at', { ascending: false })
        .limit(limit * 3) // Get more to filter

      if (!tagError && allBlogs) {
        // Filter blogs that have at least one matching tag
        const tagBlogs = allBlogs.filter((blog) => {
          if (!blog.tags || !Array.isArray(blog.tags)) return false
          return blog.tags.some((tag) => tags.includes(tag))
        })

        if (tagBlogs.length > 0) {
          return tagBlogs.slice(0, limit)
        }
      }
    }

    // Fallback to recent blogs
    const { data: recentBlogs, error: recentError } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .neq('id', currentBlogId)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (recentError) {
      console.error('Error fetching related blogs:', recentError)
      return []
    }

    return recentBlogs || []
  } catch (error) {
    console.error('Error fetching related blogs:', error)
    return []
  }
}

export async function getRecentBlogs(limit: number = 5): Promise<Blog[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching recent blogs:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching recent blogs:', error)
    return []
  }
}

export async function getAllCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('category')
      .eq('status', 'published')
      .not('category', 'is', null)

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    const categories = new Set<string>()
    data?.forEach((blog) => {
      if (blog.category) {
        categories.add(blog.category)
      }
    })

    return Array.from(categories).sort()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getAllTags(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('tags')
      .eq('status', 'published')

    if (error) {
      console.error('Error fetching tags:', error)
      return []
    }

    const tags = new Set<string>()
    data?.forEach((blog) => {
      if (blog.tags && Array.isArray(blog.tags)) {
        blog.tags.forEach((tag) => tags.add(tag))
      }
    })

    return Array.from(tags).sort()
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

