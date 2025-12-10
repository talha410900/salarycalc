export interface Blog {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  featured_image: string | null
  status: 'draft' | 'published' | 'archived'
  
  // SEO Fields
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  
  // Open Graph / Social Media
  og_title: string | null
  og_description: string | null
  og_image: string | null
  
  // Twitter Card
  twitter_card: 'summary' | 'summary_large_image' | null
  twitter_title: string | null
  twitter_description: string | null
  twitter_image: string | null
  
  // Additional SEO
  canonical_url: string | null
  robots_meta: string | null
  schema_markup: string | null
  
  // Author and dates
  author_id: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export type BlogInsert = Omit<Blog, 'id' | 'created_at' | 'updated_at'>
export type BlogUpdate = Partial<BlogInsert>

