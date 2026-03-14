import { NextRequest, NextResponse } from 'next/server'
import { syncMayarPaymentStatus } from '@/services/consultationService'
import { getCurrentUser } from '@/lib/auth-server'

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const consultationId = searchParams.get('consultationId')

    if (!consultationId) {
      return NextResponse.json({ error: 'consultationId is required' }, { status: 400 })
    }

    const status = await syncMayarPaymentStatus(consultationId)
    
    return NextResponse.json({ status })
  } catch (err: any) {
    console.error('Check status error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
