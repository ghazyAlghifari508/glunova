/**
 * Mayar.id Payment Gateway Service
 * Docs: https://api.mayar.id/
 */

const MAYAR_API_KEY = process.env.MAYAR_API_KEY || ''
const MAYAR_API_URL = process.env.MAYAR_API_URL || 'https://api.mayar.id/hl/v1'

interface MayarPaymentParams {
  name: string
  email: string
  amount: number
  description: string
  mobile?: string
  redirectUrl?: string
}

export async function createMayarLink(params: MayarPaymentParams): Promise<{ url: string; id: string }> {
  if (!MAYAR_API_KEY) {
    throw new Error('MAYAR_API_KEY is not configured')
  }

  // Set expiration to 24 hours from now
  const expiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

  const body = {
    name: params.name,
    email: params.email,
    amount: params.amount,
    mobile: params.mobile || '081234567890', // Default if not provided
    description: params.description,
    redirectURL: params.redirectUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    redirect_url: params.redirectUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`, // Alternative field name
    expiredAt: expiredAt,
  }

  // Debug log for troubleshooting (will show in server console)
  console.log('[Mayar] Creating payment link for:', params.email)
  
  const response = await fetch(`${MAYAR_API_URL.replace(/\/$/, '')}/payment/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${MAYAR_API_KEY.trim()}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorData = await response.json()
    console.error('[Mayar] Payment Create Error:', errorData)
    throw new Error(`Mayar API error: ${response.status} - ${errorData.messages || JSON.stringify(errorData)}`)
  }

  const data = await response.json()
  
  // Try to find the link and ID in various possible properties
  const paymentUrl = data.url || data.link || data.data?.url || data.data?.link
  const paymentId = data.id || data.data?.id
  
  if (!paymentUrl) {
    console.error('[Mayar] Response missing URL:', data)
    throw new Error('Gagal mendapatkan link pembayaran dari Mayar')
  }

  console.log('[Mayar] Link created successfully. ID:', paymentId)
  return { url: paymentUrl, id: paymentId }
}

/**
 * Check payment status from Mayar
 * Using payment request ID
 */
export async function getMayarStatus(paymentId: string): Promise<string> {
  if (!MAYAR_API_KEY) throw new Error('MAYAR_API_KEY is not configured')

  console.log(`[Mayar] Checking status for ID: ${paymentId}`)

  // Using /payment/{id} as per docs
  const response = await fetch(`${MAYAR_API_URL.replace(/\/$/, '')}/payment/${paymentId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${MAYAR_API_KEY.trim()}`,
    },
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error(`[Mayar] Status Check failed (${response.status}):`, errorBody)
    
    // Fallback to /invoice if needed (vethings sometimes use this)
    const invResponse = await fetch(`${MAYAR_API_URL.replace(/\/$/, '')}/invoice/${paymentId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAYAR_API_KEY.trim()}`,
      },
    })
    
    if (!invResponse.ok) {
      return 'pending'
    }
    
    const invData = await invResponse.json()
    const status = invData.status || invData.data?.status || 'pending'
    console.log(`[Mayar] Invoice Status for ${paymentId}: ${status}`)
    return status
  }

  const result = await response.json()
  const status = result.status || result.data?.status || 'pending'
  
  console.log(`[Mayar] Payment Status for ${paymentId}: ${status}`)
  
  return status
}
