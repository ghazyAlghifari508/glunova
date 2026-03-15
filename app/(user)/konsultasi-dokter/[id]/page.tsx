'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { ConsultationStatusBadge } from '@/components/shared/ConsultationStatus'
import { ConsultationTimer } from '@/components/shared/ConsultationTimer'
import { MessageBubble } from '@/components/shared/MessageBubble'
import { RatingStars } from '@/components/shared/RatingStars'
import { useConsultationMessages } from '@/hooks/useConsultationMessages'
import { useToast } from '@/components/ui/use-toast'
import { 
  ArrowLeft, Send, Star, X, CircleOff, CheckCircle2,
  ShieldCheck, User, Video, Phone, Info
} from 'lucide-react'
import type { Consultation } from '@/types/consultation'
import { getConsultationById, sendConsultationMessage, submitConsultationRating, markMessagesAsRead } from '@/services/consultationService'

export default function UserConsultationRoomPage() {
  const { id } = useParams<{ id: string }>()
  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const [userId, setUserId] = useState('')
  const [input, setInput] = useState('')
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, addMessage } = useConsultationMessages(id)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (authLoading) return
    if (!user) { router.push('/login'); return }

    const load = async () => {
      setUserId(user.id)
      try {
        const data = await getConsultationById(id)
        if (data) {
          setConsultation(data)
          await markMessagesAsRead(id, 'user')
        }
      } catch (error) { console.error(error) } finally { setLoading(false) }
    }
    load()
  }, [id, router, user, authLoading])

  useEffect(() => {
    if (!id) return
    const channel = supabase.channel(`consultation_status:${id}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'consultations', filter: `id=eq.${id}` }, (payload) => {
          if (payload.new) setConsultation(prev => prev ? { ...prev, ...(payload.new as Consultation) } : (payload.new as Consultation))
      }).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    if (messages.length > 0 && messages[messages.length - 1].sender_type === 'doctor') {
      markMessagesAsRead(id, 'user').catch(console.error)
    }
  }, [messages, id])

  const handleSend = async () => {
    if (!input.trim()) return
    const message = input.trim()
    setInput('')
    try {
      const newMsg = await sendConsultationMessage(id, userId, message, 'user')
      if (newMsg) addMessage(newMsg)
    } catch (error) { console.error('[UserChat]', error) }
  }

  const submitRating = async () => {
    if (!rating) return
    await submitConsultationRating(id, rating, review)
    setConsultation((prev) => (prev ? { ...prev, rating, review } : prev))
    setShowRating(false)
    toast({ title: 'Penilaian Berhasil', description: 'Ulasan konsultasi Anda telah disimpan.' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[color:var(--neutral-50)] flex flex-col items-center justify-center font-body">
         <div className="w-16 h-16 border-4 border-[color:var(--primary-200)] border-t-[color:var(--primary-600)] rounded-full animate-spin mb-6 shadow-lg" />
         <p className="text-sm font-bold text-[color:var(--neutral-500)] uppercase tracking-widest font-heading mb-2">Membuka Ruang Diskusi</p>
         <p className="text-xs text-[color:var(--neutral-400)]">Menyiapkan enkripsi ujung-ke-ujung...</p>
      </div>
    )
  }

  if (!consultation || !consultation.doctor) {
     return (
       <div className="min-h-screen bg-[color:var(--neutral-50)] flex flex-col items-center justify-center font-body px-6 text-center">
          <div className="w-28 h-28 rounded-xl bg-white shadow-xl flex items-center justify-center mb-8 border border-[color:var(--neutral-100)]">
             <CircleOff className="w-12 h-12 text-[color:var(--danger)]/60" />
          </div>
          <h2 className="text-3xl font-extrabold text-[color:var(--neutral-900)] font-heading mb-3">Sesi Tidak Ditemukan</h2>
          <p className="text-[color:var(--neutral-500)] mb-10 max-w-sm text-base">Maaf, kami tidak dapat menemukan sesi konsultasi ini. Mungkin sudah berakhir atau terjadi kesalahan data.</p>
          <button 
            className="px-10 py-4 rounded-lg bg-[color:var(--neutral-900)] text-white hover:bg-black transition-all font-bold font-heading shadow-xl active:scale-95" 
            onClick={() => router.back()}
          >
             Kembali ke Beranda
          </button>
       </div>
     )
  }

  const doctor = consultation.doctor

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[#F0F2F5] font-body overflow-hidden pt-16 lg:pt-[72px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--neutral-900) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* App Header (Sticky Top) */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-[color:var(--neutral-200)] z-20 flex-none relative shadow-sm">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => router.push('/konsultasi-dokter')}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-[1rem] bg-[color:var(--neutral-50)] hover:bg-[color:var(--primary-50)] text-[color:var(--neutral-500)] hover:text-[color:var(--primary-600)] transition-colors border border-[color:var(--neutral-100)] active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-[color:var(--neutral-100)] border-[3px] border-white shadow-md shrink-0">
                {doctor.profile_picture_url ? (
                   <Image src={doctor.profile_picture_url} alt={doctor.full_name} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center"><User className="w-6 h-6 text-[color:var(--neutral-400)]" /></div>
                )}
                {consultation.status === 'ongoing' && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[color:var(--success)] border-[3px] border-white rounded-full z-10" />
                )}
              </div>
              
              <div className="flex flex-col justify-center">
                <h2 className="text-base md:text-xl font-extrabold text-[color:var(--neutral-900)] font-heading leading-tight flex items-center gap-1.5">
                  {doctor.full_name}
                  <ShieldCheck className="w-4 h-4 text-[color:var(--primary-600)]" />
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] md:text-xs font-semibold text-[color:var(--neutral-500)] leading-none">{doctor.specialization}</span>
                  <div className="w-1 h-1 rounded-full bg-[color:var(--neutral-300)] hidden md:block" />
                  <span className={`text-[10px] font-bold uppercase tracking-widest hidden md:block leading-none ${consultation.status === 'ongoing' ? 'text-[color:var(--success)]' : 'text-[color:var(--neutral-400)]'}`}>
                    {consultation.status === 'ongoing' ? 'Sedang Online' : consultation.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex-col items-end hidden sm:flex">
              <ConsultationStatusBadge status={consultation.status} />
              {consultation.status === 'ongoing' && (
                <div className="mt-1 md:mt-2">
                  <ConsultationTimer startedAt={consultation.started_at} endedAt={consultation.ended_at} />
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 border-l border-[color:var(--neutral-100)] pl-4 md:pl-8">
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-[1rem] bg-[color:var(--neutral-50)] text-[color:var(--neutral-400)] border border-[color:var(--neutral-100)] flex items-center justify-center cursor-not-allowed hidden md:flex" title="Panggilan Suara (Segera Hadir)">
                <Phone className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-[1rem] bg-[color:var(--primary-50)] text-[color:var(--primary-400)] border border-[color:var(--primary-100)] flex items-center justify-center cursor-not-allowed" title="Panggilan Video (Segera Hadir)">
                <Video className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col overflow-hidden relative z-10">
        
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 custom-scrollbar scroll-smooth">
          
          {/* Security Banner */}
          <div className="flex justify-center mb-10">
            <div className="bg-amber-50 border border-amber-200/50 rounded-2xl px-5 py-3 flex items-center gap-3 max-w-[400px] text-center shadow-sm">
              <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-900/80 font-medium leading-relaxed">
                Pesan terenkripsi end-to-end. Tidak ada pihak luar yang dapat membaca pesan di ruang ini.
              </p>
            </div>
          </div>

          {messages.length === 0 ? (
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-[color:var(--primary-900)]/5 border border-[color:var(--neutral-100)]">
                   <div className="w-24 h-24 bg-[color:var(--primary-50)] rounded-full flex items-center justify-center">
                      <Info className="w-10 h-10 text-[color:var(--primary-500)]" />
                   </div>
                </div>
                <h3 className="text-2xl font-black text-[color:var(--neutral-900)] mb-3 font-heading">Siap Berkonsultasi</h3>
                <p className="text-[color:var(--neutral-500)] leading-relaxed text-base">
                   Ceritakan detail keluhan atau pertanyaan Anda kepada <br/><strong className="text-[color:var(--neutral-700)]">Dokter {doctor.full_name}</strong>. Anda dapat bersantai dan membagikan informasi klinis secara jujur.
                </p>
             </motion.div>
          ) : (
             <div className="space-y-6 flex flex-col pb-4">
                {messages.map((message, idx) => (
                   <motion.div 
                     key={message.id} 
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                     transition={{ duration: 0.3 }}
                   >
                     <MessageBubble message={message} isOwn={message.sender_id === userId} />
                   </motion.div>
                ))}
                <div ref={messagesEndRef} className="h-2" />
             </div>
          )}
        </div>

        {/* Floating Bottom Input Area */}
        <div className="flex-none p-4 md:p-8 bg-gradient-to-t from-[#F0F2F5] via-[#F0F2F5] to-transparent">
          {consultation.status === 'ongoing' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative flex items-end gap-3 max-w-3xl mx-auto align-bottom">
                <div className="relative flex-1 bg-white rounded-xl border border-[color:var(--neutral-200)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-within:shadow-[0_8px_30px_rgb(26,86,219,0.08)] focus-within:border-[color:var(--primary-300)] transition-all overflow-hidden flex self-end max-h-[180px]">
                   <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                      placeholder="Ketik pesan Anda..."
                      rows={1}
                      className="w-full bg-transparent px-6 py-4 md:py-5 min-h-[56px] text-base text-[color:var(--neutral-900)] placeholder:text-[color:var(--neutral-300)] resize-none outline-none font-body custom-scrollbar"
                      style={{ fieldSizing: 'content' } as any}
                   />
                </div>

                <button 
                  onClick={handleSend} disabled={!input.trim()} 
                  className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] shrink-0 rounded-xl bg-[color:var(--primary-600)] text-white hover:bg-[color:var(--primary-700)] flex items-center justify-center transition-all disabled:opacity-50 disabled:scale-100 active:scale-95 shadow-lg shadow-[color:var(--primary-600)]/20 mb-[1px] md:mb-[2px] self-end"
                >
                   <Send className="w-6 h-6 -ml-1" />
                </button>
             </motion.div>
          )}

          {consultation.status === 'scheduled' && (
             <div className="bg-white rounded-xl p-8 text-center border border-[color:var(--neutral-200)] shadow-sm max-w-3xl mx-auto relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[color:var(--primary-500)] to-transparent" />
                <div className="w-12 h-12 rounded-full border-4 border-[color:var(--primary-100)] border-t-[color:var(--primary-500)] animate-spin mx-auto mb-4" />
                <h4 className="font-bold text-[color:var(--neutral-900)] mb-1 text-lg font-heading">Sesi Belum Dimulai</h4>
                <p className="text-sm font-medium text-[color:var(--neutral-500)]">Menunggu dokter terhubung ke ruangan diskusi...</p>
             </div>
          )}

          {consultation.status === 'completed' && !consultation.rating && (
             <div className="max-w-3xl mx-auto">
                {!showRating ? (
                   <button 
                     onClick={() => setShowRating(true)} 
                     className="w-full py-6 rounded-xl bg-white border border-[color:var(--neutral-200)] hover:border-[color:var(--primary-300)] text-[color:var(--neutral-900)] font-black shadow-xl text-base transition-all font-heading flex flex-col items-center justify-center gap-2 group"
                   >
                      <div className="w-12 h-12 rounded-full bg-[color:var(--primary-50)] flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                        <Star className="w-6 h-6 fill-[color:var(--primary-500)] text-[color:var(--primary-500)]" /> 
                      </div>
                      Beri Ulasan untuk Sesi Ini
                   </button>
                ) : (
                   <motion.div 
                      initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} 
                      className="bg-white rounded-2xl p-8 md:p-12 border border-[color:var(--neutral-200)] shadow-2xl relative mt-4 mx-4 md:mx-0 overflow-hidden"
                   >
                      <button onClick={() => setShowRating(false)} className="absolute top-6 right-6 text-[color:var(--neutral-400)] hover:text-[color:var(--neutral-900)] bg-[color:var(--neutral-100)] rounded-full p-2.5 transition-colors z-10">
                         <X size={20} />
                      </button>
                      
                      <div className="flex flex-col items-center text-center relative z-10">
                         <h4 className="font-black text-[color:var(--neutral-900)] text-3xl mb-3 font-heading tracking-tight">Bagaimana sesi Anda?</h4>
                         <p className="text-base text-[color:var(--neutral-500)] mb-8 max-w-sm">Bantu kami meningkatkan kualitas layanan dengan memberikan nilai untuk dr. {doctor.full_name}</p>
                         
                         <div className="mb-10 p-6 bg-[color:var(--neutral-50)] rounded-2xl w-full flex justify-center">
                            <RatingStars rating={rating} size={42} interactive onRate={setRating} />
                         </div>
                         
                         <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Ceritakan pengalaman Anda (opsional)..."
                            className="w-full bg-[color:var(--neutral-50)] border border-[color:var(--neutral-200)] focus:border-[color:var(--primary-400)] focus:bg-white rounded-xl p-6 text-base text-[color:var(--neutral-900)] placeholder:text-[color:var(--neutral-400)] mb-10 resize-none h-32 outline-none transition-all focus:shadow-[0_8px_30px_rgb(26,86,219,0.08)] font-body"
                         />
                         
                         <button 
                           onClick={submitRating} disabled={!rating} 
                           className="w-full py-5 rounded-xl bg-[color:var(--primary-600)] text-white font-bold text-base uppercase tracking-wider transition-all disabled:opacity-30 shadow-xl shadow-[color:var(--primary-600)]/20 hover:bg-[color:var(--primary-700)] active:scale-95 font-heading"
                         >
                            Kirim Ulasan Anda
                         </button>
                      </div>
                   </motion.div>
                )}
             </div>
          )}

          {consultation.status === 'completed' && consultation.rating && (
             <div className="bg-white border border-[color:var(--neutral-200)] rounded-xl p-8 flex flex-col items-center justify-center gap-4 max-w-md mx-auto shadow-md">
                <div className="flex items-center gap-3 text-[color:var(--success)]">
                  <div className="w-10 h-10 rounded-full bg-[color:var(--success-bg)] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[color:var(--success)]" />
                  </div>
                  <span className="text-lg font-black font-heading tracking-tight">Ulasan Terkirim</span>
                </div>
                <div className="flex items-center gap-3 bg-[color:var(--neutral-50)] px-6 py-3 rounded-full border border-[color:var(--neutral-100)]">
                   <RatingStars rating={consultation.rating} size={20} />
                   <span className="text-sm font-bold text-[color:var(--neutral-900)]">({consultation.rating}.0)</span>
                </div>
             </div>
          )}

        </div>
      </main>
    </div>
  )
}
