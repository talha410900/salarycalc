# Database Migrations

This directory contains SQL migration files for the Supabase database.

## Migration Files

1. **create_blogs_table.sql** - Creates the initial blogs table with SEO fields
2. **create_storage_bucket.sql** - Creates storage bucket for blog images
3. **create_tags_categories_tables.sql** - Creates tags and categories tables
4. **add_tags_categories_to_blogs.sql** - Adds tags and category columns to blogs table
5. **add_featured_image_alt_to_blogs.sql** - Adds featured_image_alt column for accessibility
6. **add_faqs_to_blogs.sql** - Adds FAQs column (JSONB) for storing FAQ questions and answers

## How to Run Migrations

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New query**
5. Copy and paste the SQL from the migration file you want to run
6. Click **Run** (or press Ctrl+Enter / Cmd+Enter)

### Option 2: Using Migration Script

If you have `DATABASE_URL` set in your `.env.local`:

```bash
# Set your database URL in .env.local
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres

# Run the migration script
node scripts/execute-migration.js
```

**Note:** To get your database URL:
1. Go to Supabase Dashboard > Settings > Database
2. Copy the "Connection string" under "Connection parameters"
3. Replace `[YOUR-PASSWORD]` with your database password

## Running the Latest Migration

To add the `featured_image_alt` column:

1. Open `add_featured_image_alt_to_blogs.sql`
2. Copy the SQL content
3. Run it in Supabase SQL Editor

Or run directly:

```sql
-- Add featured_image_alt column to blogs table for accessibility and SEO
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS featured_image_alt TEXT;

-- Add comment for documentation
COMMENT ON COLUMN blogs.featured_image_alt IS 'Alt text for the featured image, used for accessibility and SEO purposes';
```

## Migration Order

If setting up from scratch, run migrations in this order:

1. `create_blogs_table.sql` (or `create_blogs_table_secure.sql` if using auth)
2. `create_storage_bucket.sql`
3. `create_tags_categories_tables.sql`
4. `add_tags_categories_to_blogs.sql`
5. `add_featured_image_alt_to_blogs.sql`
6. `add_faqs_to_blogs.sql` (latest)

## Verifying Migration

After running a migration, you can verify it worked:

```sql
-- Check if column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'blogs' 
AND column_name = 'featured_image_alt';
```

