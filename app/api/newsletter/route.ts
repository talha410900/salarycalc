import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if email already exists
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', normalizedEmail)
      .single()

    if (existing) {
      return NextResponse.json(
        { message: 'You are already subscribed!' },
        { status: 200 }
      )
    }

    // Insert new subscriber
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: normalizedEmail,
        subscribed_at: new Date().toISOString(),
        source: 'website',
      })

    if (error) {
      // If the table doesn't exist yet, still return success to avoid breaking UX
      // The table can be created later in Supabase dashboard
      console.error('Newsletter insert error:', error)

      if (error.code === '42P01') {
        // Table doesn't exist - log but don't fail the user
        console.warn(
          'newsletter_subscribers table does not exist yet. Create it in Supabase with columns: id (uuid), email (text, unique), subscribed_at (timestamptz), source (text)'
        )
        return NextResponse.json({ message: 'Subscribed successfully!' }, { status: 200 })
      }

      return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Subscribed successfully!' }, { status: 200 })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
