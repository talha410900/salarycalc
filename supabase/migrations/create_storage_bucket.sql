-- Create storage bucket for blog images
-- Run this after creating the blogs table

-- Create the bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow public read access to images
CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Create policy to allow authenticated users to upload images
-- For development, you might want to allow all uploads
-- For production, restrict this to authenticated users only
CREATE POLICY "Allow uploads to blog-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images');

-- Create policy to allow authenticated users to update images
CREATE POLICY "Allow updates to blog-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-images')
WITH CHECK (bucket_id = 'blog-images');

-- Create policy to allow authenticated users to delete images
CREATE POLICY "Allow deletes from blog-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-images');

-- For development: Allow all operations (remove in production)
-- Uncomment the following if you want to allow all operations without authentication
/*
DROP POLICY IF EXISTS "Allow uploads to blog-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow updates to blog-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow deletes from blog-images" ON storage.objects;

CREATE POLICY "Allow all operations on blog-images"
ON storage.objects FOR ALL
USING (bucket_id = 'blog-images')
WITH CHECK (bucket_id = 'blog-images');
*/

