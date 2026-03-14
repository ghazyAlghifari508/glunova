'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Search, MessageCircle, ChevronRight, User, BellRing } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getDoctorConversations } from '@/services/consultationService'
import { getDoctorByUserId } from '@/services/doctorService'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import type { ConsultationConversation } from '@/types/consultation'
import { cn } from '@/lib/utils'

export default function DoctorMessagesPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [conversations, setConversations] = useState<ConsultationConversation[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchConversations = useCallback(async () => {
    if (!user) return
    try {
      const doc = await getDoctorByUserId(user.id)
      if (doc) {
        const data = await getDoctorConversations(doc.id)
        setConversations(data || [])
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchConversations()

      const channel = supabase
        .channel('messages_page')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'consultation_messages' }, () => {
          fetchConversations()
        })
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [user, fetchConversations])

  const filtered = conversations.filter(c => 
    c.user?.full_name?.toLowerCase().includes(search.toLowerCase())
  )

  const getInitials = (name?: string | null) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : '??'
  }

  if (loading && conversations.length === 0) {
    return (
      <div className="p-6 md:p-10 min-h-screen bg-[#F8FAFC] space-y-8">
        <div className="h-10 w-48 bg-slate-200 animate-pulse rounded-lg" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-white rounded-3xl border border-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#F8FAFC] font-sans">
      <div className="max-w-[1000px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Pusat Pesan</h1>
              <p className="text-sm font-medium text-slate-500">Komunikasi aktif dengan semua pasien Anda.</p>
           </div>
           <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 relative">
              <BellRing className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
           </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
           <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
           <Input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama pasien..."
              className="w-full h-14 pl-12 pr-6 bg-white border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all text-sm font-medium shadow-sm"
           />
        </div>

        {/* Conversations Grid */}
        <div className="space-y-4">
           <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                 <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-24 bg-white border border-slate-200 rounded-[2.5rem]">
                    <MessageCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-lg font-black text-slate-900">Belum Ada Pesan</h3>
                    <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto mt-2">Percakapan akan muncul di sini setelah konsultasi atau pesan dimulai.</p>
                 </motion.div>
              ) : (
                 filtered.map((con, idx) => {
                    const isUnread = !con.lastMessage.is_read && con.lastMessage.sender_type === 'user'
                    return (
                       <motion.div 
                          key={con.consultation_id} 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          transition={{ delay: idx * 0.05 }}
                          className={cn(
                             "group p-6 bg-white border border-slate-200 rounded-[2.5rem] hover:border-slate-900 hover:shadow-xl hover:shadow-slate-900/5 transition-all cursor-pointer relative overflow-hidden",
                             isUnread && "border-emerald-500 bg-emerald-50/10"
                          )}
                          onClick={() => router.push(`/doctor/consultations/${con.consultation_id}`)}
                       >
                          {isUnread && (
                             <div className="absolute top-0 right-0 p-6 flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-md">New Message</span>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                             </div>
                          )}

                          <div className="flex items-center gap-6">
                             {/* Avatar */}
                             <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg border-2 border-white overflow-hidden relative">
                                {getInitials(con.user?.full_name)}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                             </div>

                             {/* Info */}
                             <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                   <h4 className="font-black text-lg text-slate-900 truncate tracking-tight">{con.user?.full_name}</h4>
                                   <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest hidden md:block">
                                      {new Date(con.lastMessage.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                   </span>
                                </div>
                                <p className={cn(
                                   "text-sm truncate pr-10",
                                   isUnread ? "text-slate-900 font-bold" : "text-slate-500 font-medium"
                                )}>
                                   {con.lastMessage.message}
                                </p>
                             </div>

                             {/* Action Icon */}
                             <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shrink-0">
                                <ChevronRight className="w-5 h-5" />
                             </div>
                          </div>
                       </motion.div>
                    )
                 })
              )}
           </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
