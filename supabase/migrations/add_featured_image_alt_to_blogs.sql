-- Add featured_image_alt column to blogs table for accessibility and SEO
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS featured_image_alt TEXT;

-- Add comment for documentation
COMMENT ON COLUMN blogs.featured_image_alt IS 'Alt text for the featured image, used for accessibility and SEO purposes';

