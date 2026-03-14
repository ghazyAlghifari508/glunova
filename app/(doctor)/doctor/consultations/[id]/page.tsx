'use client'

import { useEffect, useState, useRef } from 'react'
import { getConsultationById, updateConsultation, sendConsultationMessage, markMessagesAsRead } from '@/services/consultationService'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ConsultationStatusBadge } from '@/components/shared/ConsultationStatus'
import { ConsultationTimer } from '@/components/shared/ConsultationTimer'
import { MessageBubble } from '@/components/shared/MessageBubble'
import { useConsultationMessages } from '@/hooks/useConsultationMessages'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft, Send, User, Clock, FileText, ActivitySquare, CheckCircle2 } from 'lucide-react'
import type { Consultation } from '@/types/consultation'
import { cn } from '@/lib/utils'

export default function DoctorConsultationRoomPage() {
  const { id } = useParams<{ id: string }>()
  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const [userId, setUserId] = useState('')
  const [input, setInput] = useState('')
  const [notes, setNotes] = useState('')
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
        try {
           setUserId(user.id)
           const data = await getConsultationById(id)
           if (data) {
              setConsultation(data)
              setNotes(data.notes || '')
              await markMessagesAsRead(id, 'doctor')
           }
        } catch (error) {} finally { setLoading(false) }
     }
     load()
  }, [id, router, user, authLoading])

  useEffect(() => {
     if (!id) return
     const channel = supabase.channel(`consultation_status_doctor:${id}`)
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'consultations', filter: `id=eq.${id}` }, (payload) => {
           if (payload.new) {
              setConsultation(payload.new as Consultation)
              if (payload.new.notes) setNotes(payload.new.notes)
           }
        }).subscribe()
     return () => { supabase.removeChannel(channel) }
  }, [id])

  useEffect(() => {
     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
     if (messages.length > 0 && messages[messages.length - 1].sender_type === 'user') {
        markMessagesAsRead(id, 'doctor').catch(console.error)
     }
  }, [messages, id])

  const handleSend = async () => {
     if (!input.trim() || !consultation) return
     const msg = input.trim()
     setInput('')
     try {
        const newMsg = await sendConsultationMessage(id, userId, msg, 'doctor')
        if (newMsg) addMessage(newMsg)
     } catch (error) {}
  }

  const startConsultation = async () => {
     try {
        const updated = await updateConsultation(id, { status: 'ongoing', started_at: new Date().toISOString() })
        if (updated) setConsultation(updated)
        toast({ title: 'Sesi Dimulai' })
     } catch (error) {}
  }

  const endConsultation = async () => {
     try {
        const ended = new Date().toISOString()
        const duration = consultation?.started_at ? Math.ceil((new Date(ended).getTime() - new Date(consultation.started_at).getTime()) / 60000) : 0
        const updated = await updateConsultation(id, { status: 'completed', ended_at: ended, duration_minutes: duration, notes })
        if (updated) setConsultation(updated)
        toast({ title: 'Sesi Selesai' })
     } catch (error) {}
  }

  // --- Auto Save Logic for Notes could be here. For now, manual save when ending or just tracking state.

  if (loading) {
     return <div className="h-screen bg-slate-50 flex p-6"><Skeleton className="w-full h-full rounded-[2rem]" /></div>
  }

  if (!consultation || !consultation.user) return <div className="flex h-screen items-center justify-center font-bold text-slate-500">Sesi Tidak Valid</div>

  return (
    <div className="h-screen flex flex-col md:flex-row bg-[#F8FAFC] overflow-hidden">
       
       {/* Left Sidebar: Patient & Session Context */}
       <div className="w-full md:w-[400px] h-auto md:h-screen shrink-0 text-white flex flex-col rounded-r-none md:rounded-r-[2rem] shadow-2xl z-20 overflow-y-auto custom-scrollbar relative" style={{ background: 'linear-gradient(180deg, var(--primary-700), var(--primary-900))' }}>
          
          {/* Top Back Action */}
          <div className="p-6 pb-2 sticky top-0 backdrop-blur-md z-10 flex items-center gap-4 border-b border-white/10" style={{ background: 'rgba(0,10,40,0.1)' }}>
             <button onClick={() => router.push('/doctor/consultations')} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shadow-sm">
                <ArrowLeft className="w-5 h-5 text-white" />
             </button>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Kembali</p>
                <p className="text-sm font-bold">Daftar Konsultasi</p>
             </div>
          </div>

          <div className="p-6 space-y-8 pb-32">
             
             {/* Patient Profile */}
             <div>
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <User className="w-8 h-8 text-white/50" />
                   </div>
                   <div>
                      <h2 className="text-2xl font-black tracking-tight">{consultation.user.full_name || 'Pasien Anonim'}</h2>
                      <div className="mt-2 scale-90 origin-left">
                         <ConsultationStatusBadge status={consultation.status} />
                      </div>
                   </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-3 flex items-center gap-2">
                      <FileText className="w-3 h-3 text-white" /> Detail Keluhan
                   </p>
                   <p className="text-sm font-medium leading-relaxed text-white/90">
                      {consultation.description || 'Tidak ada deskripsi rinci yang disertakan.'}
                   </p>
                </div>
             </div>

             {/* Appointment Details */}
             <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                   <Clock className="w-3 h-3 text-blue-400" /> Jadwal Konsultasi
                </p>
                <div className="space-y-4">
                   <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="text-xs text-white/60">Waktu</span>
                      <span className="text-sm font-bold text-white tracking-wide">
                         {new Date(consultation.scheduled_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                   </div>
                   <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="text-xs text-white/60">Tarif / Sesi</span>
                      <span className="text-sm font-bold text-white tracking-wide">
                         Rp {consultation.hourly_rate.toLocaleString('id-ID')}
                      </span>
                   </div>
                   <div className="flex justify-between items-center text-emerald-400">
                      <span className="text-xs font-bold uppercase tracking-widest">Total Bayar</span>
                      <span className="text-lg font-black tracking-tighter">
                         Rp {(consultation.total_cost || 0).toLocaleString('id-ID')}
                      </span>
                   </div>
                </div>
             </div>

             {/* Doctor Notes Area */}
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
                   <ActivitySquare className="w-3 h-3 text-amber-400" /> Catatan Medis (Internal)
                </p>
                <textarea
                   value={notes}
                   onChange={(e) => setNotes(e.target.value)}
                   disabled={consultation.status === 'completed'}
                   placeholder="Ketik resep pribadi atau diagnosis di sini. Tidak terlihat oleh pasien..."
                   className="w-full h-40 bg-black/20 border border-white/10 rounded-2xl p-4 text-sm font-medium text-white/90 focus:border-emerald-500/50 outline-none resize-none custom-scrollbar transition-colors"
                />
             </div>

             {/* Final Actions */}
             <div className="pt-4 border-t border-white/10 text-center">
                {consultation.status === 'scheduled' && (
                   <Button onClick={startConsultation} className="w-full h-14 bg-white hover:bg-slate-100 text-[color:var(--primary-700)] font-black rounded-xl text-lg shadow-xl shadow-black/10">
                      Mulai Sesi
                   </Button>
                )}
                {consultation.status === 'ongoing' && (
                   <Button onClick={endConsultation} className="w-full h-14 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-xl text-lg shadow-lg shadow-rose-500/20">
                      Akhiri Sesi
                   </Button>
                )}
             </div>

          </div>
       </div>

       {/* Right Area: Chat Interface */}
       <div className="flex-1 flex flex-col h-screen relative bg-slate-50/50">
          
          {/* Chat Header */}
          <div className="h-20 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-6 shrink-0 z-10 relative">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50/50 to-transparent pointer-events-none" />
             <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--primary-600)] animate-pulse hidden sm:block" />
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Konsultasi Medis</h3>
             </div>
             <div className="flex items-center gap-3 relative z-10">
                <div className="text-white rounded-xl px-4 py-2 border shadow-sm" style={{ background: 'var(--primary-700)', borderColor: 'var(--primary-600)' }}>
                   <ConsultationTimer startedAt={consultation.started_at} endedAt={consultation.ended_at} />
                </div>
             </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
             <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
             
             <div className="relative z-10 space-y-6">
                {messages.length === 0 ? (
                   <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
                      <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
                         <ActivitySquare className="w-6 h-6 text-slate-300" />
                      </div>
                      <p className="text-slate-400 font-medium text-sm">Belum ada percakapan. Mulai sapa pasien Anda.</p>
                   </div>
                ) : (
                   messages.map((msg) => (
                      <MessageBubble key={msg.id} message={msg} isOwn={msg.sender_id === userId} />
                   ))
                )}
                <div ref={messagesEndRef} />
             </div>
          </div>

          {/* Chat Input */}
          <div className="bg-white border-t border-slate-200 p-4 md:p-6 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-20">
             {consultation.status === 'ongoing' ? (
                <div className="max-w-4xl mx-auto flex items-end gap-3 group relative">
                   <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                         if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
                      }}
                      placeholder="Balas pasien..."
                      rows={1}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 rounded-2xl rounded-br-lg px-5 py-4 text-sm font-medium resize-none custom-scrollbar transition-all outline-none"
                   />
                   <Button onClick={handleSend} disabled={!input.trim()} size="icon" className="h-14 w-14 shrink-0 rounded-2xl rounded-tl-lg rounded-br-[1.5rem] bg-[color:var(--primary-700)] text-white hover:bg-[color:var(--primary-800)] transition-all active:scale-95 shadow-lg shadow-[color:var(--primary-700)]/20 disabled:bg-slate-100 disabled:text-slate-300">
                      <Send className="w-5 h-5 ml-1" />
                   </Button>
                </div>
             ) : (
                <div className="max-w-4xl mx-auto text-center py-2">
                   {consultation.status === 'scheduled' ? (
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Klik "Mulai Sesi" pada panel kiri untuk mengirim pesan.</p>
                   ) : (
                      <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 py-3 rounded-2xl">
                         <CheckCircle2 className="w-5 h-5" /> Sesi Telah Berakhir
                      </div>
                   )}
                </div>
             )}
          </div>

       </div>

    </div>
  )
}
