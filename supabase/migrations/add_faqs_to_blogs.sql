-- Add FAQs column to blogs table for storing FAQ questions and answers
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN blogs.faqs IS 'Array of FAQ objects with question and answer fields, stored as JSONB for flexibility';

-- Create GIN index on FAQs for faster JSON queries (optional but recommended for large datasets)
CREATE INDEX IF NOT EXISTS idx_blogs_faqs ON blogs USING GIN(faqs);

