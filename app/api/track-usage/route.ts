import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { CalculatorUsageInsert } from '@/lib/supabase/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { calculator_type, inputs, results } = body

    if (!calculator_type) {
      return NextResponse.json(
        { error: 'Calculator type is required.' },
        { status: 400 }
      )
    }

    const userAgent = req.headers.get('user-agent') || 'unknown'
    const referer = req.headers.get('referer') || 'unknown'

    // Clean sensitive PII if present (paranoid check)
    // We only want aggregate data like "50k income" not identifying details
    const cleanInputs = { ...inputs }
    // If inputs contained specific names or emails (unlikely for calc), remove them
    delete cleanInputs.name
    delete cleanInputs.email

    const payload: CalculatorUsageInsert = {
      calculator_type,
      inputs: cleanInputs,
      results,
      user_agent: userAgent,
      referer,
    }

    // Fire and forget - don't await the insert heavily to keep calc fast
    // But in serverless we must await or the lambda dies
    const { error } = await supabase
      .from('calculator_usage')
      .insert(payload)

    if (error) {
      console.error('Usage tracking error:', error)
      // Don't fail the request, this is background tracking
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    // Fail silently for tracking endpoints
    console.error('Tracking API error:', error)
    return NextResponse.json({ success: false }, { status: 200 })
  }
}
