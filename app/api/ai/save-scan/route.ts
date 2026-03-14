import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  try {
    const { userId, analysis } = await req.json()

    if (!userId || !analysis) {
      return new Response(
        JSON.stringify({ error: 'userId dan analysis diperlukan' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('food_scans')
      .insert({
        user_id: userId,
        food_name: analysis.foodName,
        calories: analysis.calories,
        protein: analysis.protein,
        carbs: analysis.carbs,
        fat: analysis.fat,
        iron: analysis.iron,
        zinc: analysis.zinc,
        calcium: analysis.calcium,
        folic_acid: analysis.folicAcid,
        vitamin_a: analysis.vitaminA,
        health_nutrition_score: analysis.healthNutritionScore,
        tip: analysis.tip,
        is_healthy: analysis.isHealthy,
      })
      .select('id')
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, scanId: data.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : JSON.stringify(error)
    console.error('[save-scan] Error:', msg)
    return new Response(
      JSON.stringify({ error: 'Gagal menyimpan laporan.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
