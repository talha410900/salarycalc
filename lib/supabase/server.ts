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

