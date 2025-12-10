-- SECURE VERSION: Use this migration if you have authentication set up
-- This version requires authenticated users to manage blogs

-- Create blogs table with comprehensive SEO fields
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  
  -- SEO Fields
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  
  -- Open Graph / Social Media
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  
  -- Twitter Card
  twitter_card TEXT CHECK (twitter_card IN ('summary', 'summary_large_image')),
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  
  -- Additional SEO
  canonical_url TEXT,
  robots_meta TEXT,
  schema_markup TEXT,
  
  -- Author and dates
  author_id UUID,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);

-- Create index on published_at for sorting
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to published blogs
CREATE POLICY "Public can view published blogs"
  ON blogs FOR SELECT
  USING (status = 'published');

-- Create policy to allow authenticated users to manage blogs
-- This requires users to be logged in via Supabase Auth
CREATE POLICY "Authenticated users can manage blogs"
  ON blogs FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

