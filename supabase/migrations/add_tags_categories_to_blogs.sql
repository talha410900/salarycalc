-- Add tags and categories columns to blogs table
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS category TEXT;

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);

-- Create GIN index on tags array for faster array queries
CREATE INDEX IF NOT EXISTS idx_blogs_tags ON blogs USING GIN(tags);

-- Add comment for documentation
COMMENT ON COLUMN blogs.tags IS 'Array of tags for the blog post';
COMMENT ON COLUMN blogs.category IS 'Category of the blog post (e.g., Tax Planning, Salary Guide, State Taxes, etc.)';

