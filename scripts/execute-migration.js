/**
 * Execute Migration Script for Supabase
 * 
 * This script executes the migration using a direct PostgreSQL connection.
 * 
 * Usage:
 *   DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres node scripts/execute-migration.js
 * 
 * Or set DATABASE_URL in .env.local and run:
 *   node scripts/execute-migration.js
 * 
 * To get your database URL:
 *   1. Go to Supabase Dashboard > Settings > Database
 *   2. Copy the "Connection string" under "Connection parameters"
 *   3. Replace [YOUR-PASSWORD] with your database password
 */

require('dotenv').config({ path: '.env.local' })
const { readFileSync } = require('fs')
const { join } = require('path')
const { Client } = require('pg')

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('❌ Missing DATABASE_URL environment variable!')
  console.error('')
  console.error('To get your database URL:')
  console.error('  1. Go to Supabase Dashboard > Settings > Database')
  console.error('  2. Copy the "Connection string" under "Connection parameters"')
  console.error('  3. Replace [YOUR-PASSWORD] with your database password')
  console.error('  4. Add to .env.local: DATABASE_URL=postgresql://postgres:password@host:5432/postgres')
  console.error('')
  console.error('⚠️  Note: This requires your database password. Keep it secret!')
  console.error('')
  console.error('Alternatively, you can run the migration manually:')
  console.error('  npm run migrate')
  console.error('  (This will show you the SQL to copy/paste in Supabase Dashboard)')
  process.exit(1)
}

async function executeMigration() {
  const client = new Client({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes('supabase.co') ? { rejectUnauthorized: false } : false,
  })

  try {
    console.log('🚀 Connecting to database...')
    await client.connect()
    console.log('✅ Connected successfully!')
    console.log('')
    
    // Read the migration file
    const migrationPath = join(process.cwd(), 'supabase/migrations/create_blogs_table.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf-8')
    
    console.log('📝 Executing migration...')
    console.log('')
    
    // Execute the migration
    await client.query(migrationSQL)
    
    console.log('✅ Migration executed successfully!')
    console.log('')
    
    // Verify the table was created
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'blogs'
    `)
    
    if (result.rows.length > 0) {
      console.log('✅ Verified: blogs table exists')
      
      // Check for indexes
      const indexResult = await client.query(`
        SELECT indexname 
        FROM pg_indexes 
        WHERE tablename = 'blogs'
      `)
      
      console.log(`✅ Verified: ${indexResult.rows.length} indexes created`)
      console.log('')
      console.log('🎉 Migration complete! Your blogs table is ready to use.')
    } else {
      console.log('⚠️  Warning: Could not verify table creation')
    }
    
  } catch (error) {
    console.error('❌ Error executing migration:', error.message)
    if (error.message.includes('already exists')) {
      console.error('')
      console.error('ℹ️  It looks like the table or some objects already exist.')
      console.error('   This is okay - the migration uses IF NOT EXISTS clauses.')
      console.error('   Your database should be ready to use.')
    } else {
      console.error('')
      console.error('Please check:')
      console.error('  1. Your DATABASE_URL is correct')
      console.error('  2. Your database password is correct')
      console.error('  3. Your IP is allowed in Supabase (Settings > Database > Connection Pooling)')
      process.exit(1)
    }
  } finally {
    await client.end()
  }
}

executeMigration()
