'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { getDoctorById, getDoctorSchedules } from '@/services/doctorService'
import { getMonthlyStats } from '@/services/consultationService'
import {
  ArrowLeft, Stethoscope, Star, Calendar, Clock, ShieldCheck, ChevronRight, CheckCircle2, Award, Activity, Zap, Info, MapPin, ArrowRight, Microscope, User, Heart, Radio, Globe, AlertCircle, Video
} from 'lucide-react'
import type { Doctor, DoctorSchedule } from '@/types/doctor'
import { DAY_NAMES } from '@/types/doctor'
import { cn } from '@/lib/utils'

export default function DoctorPublicProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([])
  const [avgRating, setAvgRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      try {
        const doctorData = await getDoctorById(id)
        if (!doctorData) {
          router.push('/konsultasi-dokter')
          return
        }
        setDoctor(doctorData)
        const [scheduleData, stats] = await Promise.all([getDoctorSchedules(id), getMonthlyStats(id)])
        setSchedules((scheduleData || []).filter((s) => s.is_available))
        setAvgRating(parseFloat(stats.avgRating) || 0)
        setReviewCount(stats.totalConsultations || 0)
      } catch (error) {
        console.error('Error loading doctor profile:', error)
        router.push('/konsultasi-dokter')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, router])

  if (loading || !doctor) {
    return (
      <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 relative z-10 w-full flex flex-col items-center justify-center">
          <div className="max-w-6xl w-full space-y-12 animate-pulse">
             <div className="flex flex-col items-center">
                <div className="w-56 h-72 rounded-2xl bg-white border border-[color:var(--neutral-200)] mb-10 shadow-sm" />
                <div className="h-14 w-80 bg-white border border-[color:var(--neutral-200)] rounded-full mb-6" />
                <div className="h-4 w-64 bg-white border border-[color:var(--neutral-100)] rounded-full" />
             </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden relative">
      
      {/* Immersive Medical HUD Background */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(26,86,219,0.04)_0%,_transparent_70%)]" />
         <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(var(--neutral-200) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
         
         <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-l from-[color:var(--primary-50)] to-transparent opacity-30" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 relative z-10 w-full">
        
        {/* Navigation Control & Clinical Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <button 
               onClick={() => router.back()}
               className="group flex items-center gap-5 px-10 py-5 rounded-2xl bg-white/70 backdrop-blur-3xl border border-white shadow-sm hover:shadow-xl hover:bg-white hover:border-[color:var(--primary-100)] transition-all text-[color:var(--neutral-500)] hover:text-[color:var(--primary-700)] italic"
             >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                <span className="text-[11px] font-black uppercase tracking-[0.4em]">KEMBALI_KE_ROSTER</span>
             </button>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
             className="flex items-center gap-10 py-5 px-10 bg-white/70 backdrop-blur-3xl border border-white rounded-2xl shadow-sm"
          >
             <div className="flex items-center gap-4">
                <div className="h-2.5 w-2.5 rounded-full bg-[color:var(--success)] animate-pulse shadow-[0_0_15px_var(--success)]" />
                <span className="text-[10px] font-black text-[color:var(--neutral-400)] uppercase tracking-[0.5em]">DIRECT_LINK: <span className="text-[color:var(--primary-700)]">[STABIL]</span></span>
             </div>
             <div className="h-5 w-px bg-[color:var(--neutral-200)]" />
             <div className="flex items-center gap-4 text-[color:var(--primary-500)]">
                <ShieldCheck className="w-4 h-4 shadow-sm" />
                <span className="text-[10px] font-black text-[color:var(--neutral-400)] uppercase tracking-[0.5em]">KEAMANAN: <span className="text-[color:var(--primary-700)]">[MAKSIMAL]</span></span>
             </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 items-start">
          
          {/* Main Clinical Dossier Column */}
          <div className="space-y-16">
             
             {/* Expert Dossier Terminal */}
             <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border border-[color:var(--neutral-200)] rounded-2xl p-12 md:p-20 relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(13,43,107,0.06)] group"
             >
                {/* Decorative Data Overlays */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[color:var(--primary-50)] rounded-full blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-12 right-12 text-[8px] font-black text-[color:var(--neutral-200)] tracking-[1.5em] select-none uppercase rotate-90 origin-right italic">
                   MEDICAL_DYNAMICS_UPLINK
                </div>

                <div className="flex flex-col md:flex-row gap-16 items-center md:items-start relative z-10">
                   
                   {/* Profile Biometric Identifier */}
                   <div className="shrink-0 relative group/avatar">
                      <div className="w-64 h-80 md:w-[420px] md:h-[580px] rounded-2xl overflow-hidden bg-[color:var(--neutral-50)] border-8 border-white relative shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] transition-all duration-1000 group-hover/avatar:scale-[1.02]">
                        {doctor.profile_picture_url ? (
                          <Image 
                            src={doctor.profile_picture_url} 
                            alt={doctor.full_name} 
                            fill 
                            unoptimized 
                            className="object-cover transition-all duration-1000 ease-out group-hover/avatar:scale-110 brightness-105" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[color:var(--neutral-200)] bg-gradient-to-br from-[color:var(--neutral-50)] to-white">
                            <User className="w-40 h-40" />
                          </div>
                        )}
                        
                        {/* Immersive HUD Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--primary-900)]/30 via-transparent to-transparent opacity-40" />
                        <div className="absolute inset-x-8 top-8 bottom-8 border-2 border-white/20 rounded-2xl pointer-events-none" />
                        
                        {/* Biometric Scanning Line */}
                        <motion.div 
                           animate={{ top: ['10%', '90%', '10%'] }} 
                           transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                           className="absolute left-10 right-10 h-0.5 bg-[color:var(--primary-300)]/40 blur-[1px] z-20 pointer-events-none"
                        />
                      </div>
                      
                      {/* Operational Status indicator */}
                      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-xl bg-white border border-[color:var(--neutral-200)] flex items-center justify-center shadow-2xl z-20 transition-transform group-hover/avatar:rotate-12">
                         <Activity className="text-[color:var(--primary-700)] w-10 h-10 animate-pulse" />
                      </div>
                   </div>

                   <div className="flex-1 text-center md:text-left pt-6">
                      <div className="flex items-center justify-center md:justify-start gap-5 mb-12">
                         <div className="px-6 py-2.5 bg-[color:var(--primary-700)] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.5em] italic shadow-lg shadow-[color:var(--primary-700)]/20">
                            Verified_Expert
                         </div>
                         <div className="h-px w-16 bg-[color:var(--neutral-200)]" />
                         <span className="text-[10px] font-black text-[color:var(--neutral-400)] uppercase tracking-[0.5em] italic leading-none">Dokter Spesialis Glunova</span>
                      </div>

                      <h1 className="text-6xl md:text-[5.5rem] font-black text-[color:var(--neutral-900)] tracking-tighter leading-[0.85] mb-12 uppercase italic select-none">
                         {doctor.full_name}
                      </h1>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
                         <div className="bg-[color:var(--neutral-50)] border border-[color:var(--neutral-200)] rounded-2xl p-10 flex flex-col gap-4 group/stat hover:bg-white hover:border-[color:var(--primary-100)] hover:shadow-2xl transition-all">
                            <span className="text-[10px] font-black text-[color:var(--neutral-300)] uppercase tracking-[0.4em] italic">Spesialisasi</span>
                            <span className="text-3xl font-black text-[color:var(--neutral-900)] tracking-tight uppercase italic group-hover:text-[color:var(--primary-700)] transition-colors">{doctor.specialization}</span>
                         </div>
                         <div className="bg-[color:var(--neutral-50)] border border-[color:var(--neutral-200)] rounded-2xl p-10 flex flex-col gap-4 group/stat hover:bg-white hover:border-[color:var(--primary-100)] hover:shadow-2xl transition-all">
                            <span className="text-[10px] font-black text-[color:var(--neutral-300)] uppercase tracking-[0.4em] italic">Jam_Terbang</span>
                            <span className="text-3xl font-black text-[color:var(--neutral-900)] tracking-tight uppercase italic group-hover:text-[color:var(--primary-700)] transition-colors">{doctor.years_of_experience || 5} TAHUN PENGALAMAN</span>
                         </div>
                      </div>

                      <div className="space-y-8 bg-[color:var(--primary-50)]/50 p-12 rounded-2xl border border-[color:var(--primary-100)]/30">
                         <div className="flex items-center gap-4">
                            <div className="h-1.5 w-10 bg-[color:var(--primary-700)]" />
                            <span className="text-[11px] font-black text-[color:var(--primary-700)] uppercase tracking-[0.6em] italic leading-none">Bio_Briefing</span>
                         </div>
                         <p className="text-3xl text-[color:var(--neutral-600)] leading-[1.2] font-black tracking-tighter italic select-none">
                            {doctor.bio || `Tenaga medis elit yang berdedikasi tinggi pada protokol ${doctor.specialization}. Menjamin diagnostik akurat dan rencana pemulihan yang dipersonalisasi.`}
                         </p>
                      </div>
                   </div>
                </div>
             </motion.div>

             {/* Clinical Credential Matrix */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white border border-[color:var(--neutral-200)] rounded-2xl p-12 relative overflow-hidden group shadow-sm hover:shadow-2xl hover:border-[color:var(--primary-100)] transition-all"
                >
                   <div className="absolute top-0 right-0 w-48 h-48 bg-[color:var(--primary-50)] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-60 transition-opacity" />
                   <div className="flex items-center gap-6 mb-12">
                      <div className="w-16 h-16 rounded-xl bg-[color:var(--primary-50)] flex items-center justify-center border border-[color:var(--primary-100)] shadow-inner group-hover:rotate-12 transition-transform">
                         <Microscope size={28} className="text-[color:var(--primary-700)]" />
                      </div>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-[color:var(--neutral-400)] italic">Lisensi_Kedokteran</h3>
                   </div>
                   <div className="space-y-4">
                      <p className="text-[10px] text-[color:var(--neutral-300)] uppercase tracking-[0.4em] font-black italic">NOMOR_INDUK_STR</p>
                      <p className="text-4xl font-black tracking-tighter text-[color:var(--neutral-900)] italic group-hover:text-[color:var(--primary-700)] transition-colors uppercase font-mono">
                         {doctor.license_number || 'UPLINK-K-7729'}
                      </p>
                   </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-[color:var(--primary-900)] rounded-2xl p-12 relative overflow-hidden group shadow-2xl"
                >
                   <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--primary-700)]/30 to-transparent pointer-events-none" />
                   <div className="flex items-center gap-6 mb-12">
                      <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-3xl group-hover:-rotate-12 transition-transform shadow-2xl">
                         <Globe size={28} className="text-[color:var(--primary-300)]" />
                      </div>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/40 italic">Regional_Assignment</h3>
                   </div>
                   <div className="space-y-4 text-white">
                      <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black italic">LOKASI_DEPLOYMENT</p>
                      <p className="text-4xl font-black tracking-tighter uppercase italic group-hover:text-[color:var(--primary-300)] transition-colors">GLUNOVA MEDICAL CENTER</p>
                   </div>
                </motion.div>
             </div>

          </div>

          {/* Tactical Action Grid */}
          <div className="space-y-12 lg:sticky lg:top-24">
             
             {/* Clinical Uplink Interface */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-2xl p-12 border border-[color:var(--neutral-200)] shadow-[0_40px_100px_-20px_rgba(13,43,107,0.1)] relative overflow-hidden group/sidebar"
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[color:var(--primary-50)] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-60 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center justify-between mb-16 relative z-10">
                   <div className="flex items-center gap-4">
                      <div className="h-2.5 w-2.5 rounded-full bg-[color:var(--primary-700)] shadow-[0_0_20px_rgba(26,86,219,0.5)]" />
                      <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[color:var(--primary-700)] italic">Sistem_Tersedia</p>
                   </div>
                   <Radio size={24} className="text-[color:var(--primary-100)] animate-pulse" />
                </div>

                <div className="mb-16 space-y-5 px-4 relative z-10">
                   <p className="text-[11px] font-black text-[color:var(--neutral-300)] uppercase tracking-[0.5em] italic">Alokasi_Biaya Sesi</p>
                   <div className="flex items-baseline gap-4">
                      <span className="text-[11px] font-black text-[color:var(--primary-500)] uppercase tracking-widest italic leading-none">IDR_</span>
                      <span className="text-7xl font-black text-[color:var(--neutral-900)] tracking-tighter italic tabular-nums leading-none">
                         {(doctor.hourly_rate / 1000).toFixed(0)}K
                      </span>
                   </div>
                   <div className="h-2.5 w-full bg-[color:var(--neutral-100)] rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2.5 }}
                        className="h-full bg-[color:var(--primary-500)]" 
                      />
                   </div>
                </div>

                <Link href={`/booking/${doctor.id}`} className="block w-full relative z-10">
                   <button className="h-28 w-full bg-[color:var(--neutral-900)] hover:bg-[color:var(--primary-700)] text-white rounded-2xl font-black text-[13px] uppercase tracking-[0.6em] flex items-center justify-center gap-8 transition-all active:scale-95 group shadow-2xl hover:shadow-[color:var(--primary-700)]/30 border-none italic overflow-hidden">
                      <span className="relative z-10 flex items-center gap-5">
                         INISIASI_UPLINK
                         <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform duration-500" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   </button>
                </Link>

                <div className="mt-20 pt-12 border-t border-[color:var(--neutral-100)] space-y-12 relative z-10">
                   <div className="flex items-center justify-between">
                      <h4 className="text-[11px] font-black text-[color:var(--neutral-400)] uppercase tracking-[0.5em] italic">Slot_Operasional</h4>
                      <Clock size={20} className="text-[color:var(--primary-100)]" />
                   </div>
                   
                   {schedules.length === 0 ? (
                      <div className="bg-[color:var(--neutral-50)] rounded-2xl p-12 border-2 border-dashed border-[color:var(--neutral-200)] text-center">
                         <AlertCircle size={40} className="text-[color:var(--neutral-200)] mx-auto mb-8" />
                         <p className="text-[11px] font-black text-[color:var(--neutral-400)] uppercase tracking-[0.4em] leading-relaxed italic">BELUM ADA JADWAL TERDAFTAR UNTUK SIKLUS INI</p>
                      </div>
                   ) : (
                      <div className="space-y-5">
                         {schedules.slice(0, 5).map((schedule) => (
                           <div key={schedule.id} className="flex justify-between items-center px-10 py-7 rounded-xl bg-[color:var(--neutral-50)] border border-[color:var(--neutral-100)] hover:bg-white hover:border-[color:var(--primary-300)] hover:shadow-2xl transition-all group/item cursor-default">
                              <span className="text-[11px] font-black text-[color:var(--neutral-400)] uppercase tracking-[0.4em] group-hover/item:text-[color:var(--primary-700)] italic">{DAY_NAMES[schedule.day_of_week]}</span>
                              <div className="flex items-center gap-5 text-[11px] font-black text-[color:var(--neutral-300)] group-hover/item:text-[color:var(--primary-700)] tabular-nums italic">
                                 <Radio className="w-4 h-4" />
                                 {schedule.start_time.slice(0, 5)} — {schedule.end_time.slice(0, 5)}
                              </div>
                           </div>
                         ))}
                      </div>
                   )}
                   
                   <div className="flex items-center justify-center gap-1.5 opacity-20">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[color:var(--primary-900)]" />
                      ))}
                   </div>
                </div>
             </motion.div>

             {/* Metric Integrity Score */}
             <div className="bg-white border border-[color:var(--neutral-200)] rounded-2xl p-12 flex items-center justify-between group hover:border-[color:var(--primary-100)] hover:shadow-2xl transition-all shadow-sm">
                <div className="flex flex-col gap-3">
                   <span className="text-[10px] font-black text-[color:var(--neutral-300)] uppercase tracking-[0.5em] italic leading-none">Indeks_Kepercayaan</span>
                   <div className="flex items-center gap-4">
                      <Star className="text-[color:var(--warning)] fill-[color:var(--warning)] drop-shadow-[0_0_20px_rgba(245,158,11,0.3)] shadow-sm" size={28} />
                      <span className="text-[2.5rem] font-black text-[color:var(--neutral-900)] italic group-hover:text-[color:var(--primary-700)] transition-colors tabular-nums leading-none">{avgRating.toFixed(1)}</span>
                   </div>
                </div>
                <div className="h-16 w-px bg-[color:var(--neutral-100)]" />
                <div className="flex flex-col gap-3 items-end text-right">
                   <span className="text-[10px] font-black text-[color:var(--neutral-300)] uppercase tracking-[0.5em] italic leading-none">Data_Historis</span>
                   <span className="text-[2.5rem] font-black text-[color:var(--neutral-900)] italic group-hover:text-[color:var(--primary-700)] transition-colors tabular-nums leading-none">{reviewCount}+</span>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  )
}
