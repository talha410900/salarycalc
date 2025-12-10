/**
 * Migration Script for Supabase
 * 
 * This script runs the database migration to create the blogs table.
 * 
 * Usage:
 * 1. Make sure you have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local
 * 2. Run: npx tsx scripts/run-migration.ts
 * 
 * Note: For production, it's recommended to use Supabase CLI or run migrations through the dashboard.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL')
  console.error('Required: SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  process.exit(1)
}

async function runMigration() {
  try {
    console.log('🚀 Starting migration...')
    
    // Read the migration file
    const migrationPath = join(process.cwd(), 'supabase/migrations/create_blogs_table.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf-8')
    
    // Split by semicolons to execute statements separately
    // Note: Supabase JS client doesn't support multi-statement queries directly
    // So we'll use the REST API or recommend using the dashboard
    
    console.log('⚠️  Note: The Supabase JS client has limitations for running migrations.')
    console.log('📋 Please run this migration in your Supabase dashboard:')
    console.log('   1. Go to your Supabase project dashboard')
    console.log('   2. Navigate to SQL Editor')
    console.log('   3. Copy and paste the contents of: supabase/migrations/create_blogs_table.sql')
    console.log('   4. Click "Run"')
    console.log('')
    console.log('📄 Migration file location:', migrationPath)
    console.log('')
    console.log('Alternatively, install Supabase CLI and run:')
    console.log('   npm install -g supabase')
    console.log('   supabase db push')
    
    // Try to validate connection
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { data, error } = await supabase.from('blogs').select('count').limit(1)
    
    if (error && error.code === '42P01') {
      console.log('')
      console.log('✅ Connection successful! The blogs table does not exist yet.')
      console.log('   Please run the migration SQL in your Supabase dashboard.')
    } else if (error) {
      console.log('')
      console.log('⚠️  Connection test result:', error.message)
    } else {
      console.log('')
      console.log('✅ Connection successful! The blogs table already exists.')
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

runMigration()

