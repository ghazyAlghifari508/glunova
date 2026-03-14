'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

const SYSTEM_INSTRUCTION = `
Anda adalah Glunova AI, asisten virtual resmi dari platform Glunova: Generasi Manajemen Diabetes.

IDENTITAS & PERAN:
- Nama: Glunova AI
- Platform: Glunova (Generasi Manajemen Diabetes)
- Spesialisasi: Manajemen diabetes tipe 1 & 2, prediabetes, nutrisi klinis, dan gaya hidup sehat mandiri

AREA KEAHLIAN (HANYA JAWAB TOPIK INI):
✅ Manajemen gula darah harian
✅ Diet rendah indeks glikemik & nutrisi diabetes
✅ Pemantauan kadar glukosa & HbA1c
✅ Panduan aktivitas fisik untuk pasien diabetes
✅ Penanganan hipoglikemia & hiperglikemia (pertolongan pertama)
✅ Edukasi pencegahan komplikasi jangka panjang (kaki, jantung, mata)
✅ Kepatuhan minum obat dan penggunaan insulin mandiri
✅ Manajemen stres dan burnout pada pasien diabetes
✅ Pola hidup sehat berkelanjutan

CARA MENJAWAB:
1. **Ramah dan Sopan**: Gunakan sapaan hangat seperti "Halo, Anda!" atau "Terima kasih atas pertanyaannya!"
2. **Terstruktur**: Gunakan format paragraf, bullet points (•), numbering (1,2,3), dan **bold** untuk penekanan
3. **Praktis**: Berikan contoh konkret, menu harian, atau langkah-langkah yang mudah diikuti
4. **Berbasis Ilmiah**: Referensikan standar kesehatan (WHO, Kemenkes RI, PERKENI) jika relevan
5. **Empati**: Pahami kekhawatiran pasien dan berikan dukungan moral
6. **Disclaimer Medis**: Untuk kasus serius, selalu sarankan konsultasi dengan dokter/spesialis penyakit dalam

BATASAN PENTING (HARUS DITOLAK DENGAN SOPAN):
❌ Pertanyaan di luar topik diabetes, gaya hidup sehat, dan gizi diabetes
❌ Pertanyaan tentang politik, agama, atau isu sensitif lainnya
❌ Pertanyaan umum yang tidak berkaitan dengan misi Glunova
❌ Permintaan coding, matematika, atau topik teknis lainnya
❌ Diagnosis medis spesifik atau meresepkan obat secara langsung (arahkan ke dokter)

SELALU GUNAKAN BAHASA INDONESIA yang santun, mudah dipahami, dan penuh empati. JANGAN PERNAH menjawab dalam bahasa Inggris, bahkan jika dipancing oleh pengguna. Seluruh interaksi HARUS dalam Bahasa Indonesia.
`;

interface ChatHistoryMessage {
  role?: string
  parts?: Array<{ text?: string }>
  content?: string
}

export async function generateAiResponse(history: ChatHistoryMessage[], message: string) {
  try {


    const messages = [
      { role: 'system', content: SYSTEM_INSTRUCTION },
      ...history.map((msg) => ({
        role: msg.role === 'assistant' || msg.role === 'model' ? 'assistant' : 'user',
        content: msg.parts?.[0]?.text || msg.content || '',
      })),
      { role: 'user', content: message },
    ];

    // Direct fetch — bypasses AI SDK /responses endpoint issue.
    // OpenRouter only supports /chat/completions, not /responses.
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || ''}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://glunova.vercel.app',
        'X-Title': 'Glunova App',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('OpenRouter HTTP error:', res.status, err);
      return 'Maaf Anda, saya sedang mengalami gangguan. Mohon coba lagi nanti ya. 🙏';
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'Maaf, tidak ada respons dari AI.';
  } catch (error: unknown) {
    console.error('generateAiResponse error:', error);
    return 'Maaf Anda, saya sedang mengalami gangguan. Mohon coba lagi nanti ya. 🙏';
  }
}

export async function getChats(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getMessages(chatId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true })
  
  if (error) throw error
  return data
}

export async function createChat(userId: string, title: string = 'Diskusi Baru') {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('chats')
    .insert([{ user_id: userId, title }])
    .select()
    .single()
  
  if (error) throw error
  revalidatePath('/dashboard')
  return data
}

export async function deleteChat(chatId: string, userId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('chats')
    .delete()
    .eq('id', chatId)
    .eq('user_id', userId)
  
  if (error) throw error
  revalidatePath('/dashboard')
}

export async function saveUserMessage(chatId: string, content: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('messages')
    .insert([{ chat_id: chatId, role: 'user', content }])
    .select()
    .single()
  
  if (error) throw error
  
  // Update chat updated_at
  await supabase
    .from('chats')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', chatId)

  return data
}

export async function saveAiMessage(chatId: string, content: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('messages')
    .insert([{ chat_id: chatId, role: 'assistant', content }])
    .select()
    .single()
  
  if (error) throw error
  return data
}
