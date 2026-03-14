import { NextRequest, NextResponse } from 'next/server'
import { createMayarLink } from '@/services/mayarService'
import { createClient } from '@/lib/supabase-server'
import { getCurrentUser } from '@/lib/auth-server'

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json()) as { consultation_id?: string }
    const consultation_id = body.consultation_id

    if (!consultation_id || typeof consultation_id !== 'string') {
      return NextResponse.json({ error: 'consultation_id is required' }, { status: 400 })
    }

    // Fetch consultation details from Supabase
    const supabase = await createClient()
    const { data: consultation, error } = await supabase
      .from('consultations')
      .select(`
        *,
        doctor:doctors(full_name, specialization),
        user:profiles(full_name, email)
      `)
      .eq('id', consultation_id)
      .eq('user_id', currentUser.id)
      .single()

    if (error || !consultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
    }

    if (consultation.payment_status === 'confirmed') {
      return NextResponse.json({ error: 'Payment already confirmed' }, { status: 409 })
    }

    // Order ID generation
    // Example: GEN-d97a1e3f-1773236446531
    const shortId = consultation_id.split('-')[0] // Take first part of UUID
    const orderId = `GEN-${shortId}-${Date.now()}`
    
    const grossAmount = Math.round(consultation.total_cost || 0)

    if (grossAmount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const doctor = consultation.doctor as { full_name?: string; specialization?: string } | null
    const user = consultation.user as { full_name?: string; email?: string } | null
    const doctorName = doctor?.full_name || 'Dokter'
    const itemName = `Konsultasi ${doctorName}`.substring(0, 50)

    // Mayar implementation
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const redirectUrl = `${appUrl}/payment/${consultation_id}`
    
    const { url: paymentUrl, id: paymentId } = await createMayarLink({
      name: user?.full_name || 'User',
      email: user?.email || 'user@glunova.id',
      amount: grossAmount,
      description: itemName,
      redirectUrl: redirectUrl,
    })

    // Store the Mayar transaction ID in consultation for tracking
    await supabase
      .from('consultations')
      .update({ 
        payment_reference: paymentId, // Using Mayar's ID for accurate tracking
        updated_at: new Date().toISOString() 
      })
      .eq('id', consultation_id)

    return NextResponse.json({ url: paymentUrl, order_id: orderId })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create payment link'
    console.error('Mayar link error:', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
