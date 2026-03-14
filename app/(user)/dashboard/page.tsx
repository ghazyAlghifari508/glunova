'use client'

import { useHealthData } from '@/hooks/useHealthData'
import { 
  Activity, 
  TrendingUp, 
  CalendarDays, 
  Plus, 
  ShieldCheck, 
  ChevronRight,
  Droplets,
  HeartPulse,
  Scale,
  Stethoscope,
  ArrowUpRight,
  Sparkles,
  Settings2,
  Bell
} from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'

export default function UserDashboard() {
  useProtectedRoute(['user'])
  const { profile } = useHealthData()
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const stats = [
    { label: 'Gula Darah', value: '112', unit: 'mg/dL', status: 'Normal', icon: Droplets, color: 'text-sky-500', bg: 'bg-sky-500/10 border border-sky-500/20' },
    { label: 'HbA1c', value: profile?.hba1c?.toString() || '5.7', unit: '%', status: 'Sehat', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border border-emerald-500/20' },
    { label: 'Berat Badan', value: profile?.current_weight?.toString() || '68', unit: 'Kg', status: 'Stabil', icon: Scale, color: 'text-amber-500', bg: 'bg-amber-500/10 border border-amber-500/20', href: '/profile?tab=health' },
    { label: 'Detak Jantung', value: '72', unit: 'BPM', status: 'Optimal', icon: HeartPulse, color: 'text-rose-500', bg: 'bg-rose-500/10 border border-rose-500/20' },
  ]

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden">
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 relative z-10 w-full">
        
        {/* TOP COMMAND BAR (Glassmorphism) */}
        <motion.div 
           initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
           className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 w-full"
        >
           <div className="flex items-center gap-4 bg-white/40 backdrop-blur-xl border border-white/60 p-2 pr-6 rounded-full shadow-sm">
               <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-lg shadow-emerald-500/30">
                  <Sparkles size={18} />
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black tracking-widest text-neutral-500">Status AI</span>
                  <span className="text-sm font-bold text-neutral-800 leading-none">Sistem Aktif</span>
               </div>
           </div>
           
           <div className="flex items-center gap-3">
              {currentTime && (
                 <div className="flex items-center gap-3 bg-white/40 backdrop-blur-xl border border-white/60 py-2.5 px-5 rounded-full shadow-sm hidden sm:flex">
                    <span className="text-sm font-black text-neutral-900 tabular-nums font-heading tracking-tight leading-none border-r border-neutral-200 pr-3">
                       {currentTime.toLocaleTimeString('id-ID', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest font-heading leading-none">
                       {currentTime.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                 </div>
              )}
              <button className="h-12 w-12 rounded-full bg-white/50 backdrop-blur-xl border border-white/60 flex items-center justify-center text-neutral-600 hover:text-primary-600 hover:bg-white transition-all shadow-sm">
                 <Bell size={20} />
              </button>
              <button className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center text-white hover:bg-primary-600 transition-all shadow-xl shadow-neutral-900/20 group">
                 <Settings2 size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
           </div>
        </motion.div>

        {/* HERO & MAIN BENTO GRID */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative w-full">
           
           {/* BIG HERO GREETING - Span 8 */}
           <motion.div variants={itemVariant} className="lg:col-span-8 bg-white/80 backdrop-blur-3xl border border-white/60 rounded-2xl p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] relative overflow-hidden group min-h-[380px] flex flex-col justify-end">
              
              <div className="absolute top-8 right-8 flex items-center gap-3">
                 <div className="px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full border border-white shadow-sm flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase text-emerald-700 tracking-widest mt-0.5">Kondisi Prima</span>
                 </div>
              </div>

              <div className="relative z-10 w-full max-w-2xl">
                 <h1 className="text-4xl md:text-5xl font-black text-neutral-900 leading-[1.05] tracking-tighter mb-4 font-heading">
                    Good Morning,<br/>
                    <span className="text-[#3F83F8] font-bold">
                       {profile?.full_name?.split(' ')[0] || 'Pasien'}
                    </span>
                 </h1>
                 <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-medium mb-10 max-w-lg">
                    Data medismu stabil sempurna hari ini. Kadar glukosa terkontrol dalam rentang optimal untuk kesehatan jangka panjang.
                 </p>
                 
                 <div className="flex flex-wrap items-center gap-4">
                    <Link href="/roadmap">
                       <button className="h-14 px-8 bg-neutral-900 text-white rounded-full font-bold text-sm uppercase tracking-wide flex items-center gap-3 hover:scale-105 hover:bg-primary-600 transition-all shadow-xl shadow-neutral-900/20">
                          Jadwal Hari Ini <ArrowUpRight size={18} />
                       </button>
                    </Link>
                    <Link href="/vision">
                       <button className="h-14 px-8 bg-white/80 backdrop-blur-md border border-white text-neutral-900 rounded-full font-bold text-sm uppercase tracking-wide flex items-center gap-3 hover:bg-white transition-colors shadow-sm">
                          <Sparkles size={18} className="text-primary-500" /> Pindai Makanan
                       </button>
                    </Link>
                 </div>
              </div>
           </motion.div>

           {/* SUMMARY INFO - Span 4 */}
           <motion.div variants={itemVariant} className="lg:col-span-4 flex flex-col gap-6 w-full">
              <div className="bg-gradient-to-br from-primary-900 to-slate-900 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl shadow-primary-900/20 flex-1 flex flex-col justify-between group h-full min-h-[380px]">
                 <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-60" />
                 
                 <div className="relative z-10 flex justify-between items-start">
                    <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10">
                       <TrendingUp size={24} className="text-white" />
                    </div>
                    <div className="text-right">
                       <p className="text-white/60 text-[10px] font-black uppercase tracking-widest font-heading mb-1">Update Terakhir</p>
                       <p className="text-white font-bold text-sm bg-white/10 px-3 py-1 rounded-full border border-white/10">Baru Saja</p>
                    </div>
                 </div>

                 <div className="relative z-10 mt-auto">
                    <h3 className="text-3xl font-black text-white font-heading tracking-tighter leading-[1.1] mb-6 uppercase">
                       Analisis<br/>Glukosa AI
                    </h3>
                    
                    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-xl border border-white/10">
                       <div className="flex justify-between items-end mb-4">
                          <div>
                             <p className="text-white/60 text-[10px] font-black uppercase tracking-widest font-heading mb-1.5 mt-1">Estimasi HbA1c</p>
                             <p className="text-white font-bold text-sm">Status Sangat Baik</p>
                          </div>
                          <span className="text-2xl font-black text-white font-heading tracking-tighter">
                             5.4<span className="text-sm text-white/50 ml-1">%</span>
                          </span>
                       </div>
                       <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden p-0.5">
                          <motion.div 
                             className="h-full bg-gradient-to-r from-primary-400 to-sky-300 rounded-full relative" 
                             initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                           >
                             <div className="absolute top-0 right-0 w-8 h-full bg-white blur-[4px] opacity-60" />
                          </motion.div>
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>

            {/* STATS ROW WITH BENTO MASONRY */}
            <motion.div variants={itemVariant} className="lg:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
               {stats.map((stat, i) => {
                  const CardContent = (
                     <div key={stat.label} className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-2xl p-5 md:p-6 hover:bg-white transition-colors group shadow-sm flex flex-col justify-between min-h-[180px] h-full">
                        <div className="flex items-center justify-between mb-8">
                           <div className={cn("p-4 rounded-2xl transition-transform duration-500 group-hover:scale-110", stat.bg, stat.color)}>
                              <stat.icon strokeWidth={2.5} size={24} />
                           </div>
                           <div className={cn("px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest font-heading mt-1", stat.bg, stat.color)}>
                              {stat.status}
                           </div>
                        </div>
                        <div>
                           <p className="text-[11px] font-black text-neutral-500 uppercase tracking-widest font-heading mb-2 mt-1">{stat.label}</p>
                           <div className="flex items-baseline gap-1">
                              <span className="text-3xl lg:text-4xl font-black tracking-tighter text-neutral-900 font-heading leading-none">
                                 {stat.value}
                              </span>
                              <span className="text-xs font-bold text-neutral-400">{stat.unit}</span>
                           </div>
                        </div>
                     </div>
                  );

                  if (stat.href) {
                     return (
                        <Link key={stat.label} href={stat.href} data-testid={stat.label === 'Berat Badan' ? 'weight-card' : undefined}>
                           {CardContent}
                        </Link>
                     );
                  }

                  return CardContent;
               })}
            </motion.div>

           {/* WIDE BOTTOM CONTAINERS */}
           <motion.div variants={itemVariant} className="lg:col-span-7 bg-white/60 backdrop-blur-2xl border border-white/60 rounded-2xl p-6 md:p-8 shadow-sm w-full flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h3 className="text-neutral-900 text-2xl font-black tracking-tight font-heading">Agenda Terdekat</h3>
                    <p className="text-neutral-400 text-[11px] font-bold uppercase tracking-widest mt-1.5 font-heading">2 Jadwal Pemeriksaan</p>
                 </div>
                 <div className="h-14 w-14 bg-primary-50 text-primary-600 rounded-2xl shadow-sm border border-primary-100 flex items-center justify-center">
                    <CalendarDays size={24} />
                 </div>
              </div>

              <div className="space-y-4">
                 {/* Item 1 */}
                 <div className="p-4 border border-white/80 rounded-xl bg-white/50 flex items-center gap-5 hover:bg-white transition-colors hover:shadow-lg hover:shadow-black/5 cursor-pointer">
                    <div className="w-16 h-16 rounded-lg bg-white border border-neutral-100 flex flex-col items-center justify-center shrink-0 shadow-sm">
                       <span className="text-[10px] font-black text-primary-600 uppercase font-heading">Besok</span>
                       <span className="text-xl font-black text-neutral-900 tabular-nums leading-none mt-0.5">14</span>
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-neutral-900 text-base">Kontrol Gula Darah Rutin</h4>
                       <p className="text-[11px] font-bold text-neutral-500 mt-1.5 flex items-center gap-1.5">
                          <Stethoscope size={14} className="text-primary-400" /> dr. Sarah, Sp.PD (K-EMD)
                       </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-300 mr-2" />
                 </div>

                 {/* Item 2 */}
                 <div className="p-4 border border-white/80 rounded-xl bg-white/50 flex items-center gap-5 hover:bg-white transition-colors hover:shadow-lg hover:shadow-black/5 cursor-pointer">
                    <div className="w-16 h-16 rounded-lg bg-white border border-neutral-100 flex flex-col items-center justify-center shrink-0 shadow-sm">
                       <span className="text-[10px] font-black text-neutral-400 uppercase font-heading">Jum</span>
                       <span className="text-xl font-black text-neutral-400 tabular-nums leading-none mt-0.5">17</span>
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-neutral-700 text-base">Tes Toleransi Glukosa</h4>
                       <p className="text-[11px] font-bold text-neutral-500 mt-1.5 flex items-center gap-1.5">
                          <Activity size={14} className="text-emerald-400" /> Lab Klinik Pusat Diagnostik
                       </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-300 mr-2" />
                 </div>
              </div>
           </motion.div>

           <motion.div variants={itemVariant} className="lg:col-span-5 bg-gradient-to-br from-primary-600 to-sky-500 rounded-2xl p-6 md:p-8 shadow-2xl shadow-primary-500/20 relative overflow-hidden group w-full flex flex-col justify-between min-h-[300px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay opacity-20 group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
              
              <div className="relative z-10">
                 <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-6 border border-white/20 font-heading">
                    Tanya Ahli
                 </span>
                 <h3 className="text-3xl font-black text-white leading-[1.1] font-heading tracking-tighter mb-4">
                    Konsultasi Cepat<br/>Hari Ini.
                 </h3>
                 <p className="text-white/80 font-medium text-sm max-w-sm leading-relaxed">
                    Jangan menebak. Tanyakan langsung asupan gizi atau keluhan Anda ke tim dokter spesialis.
                 </p>
              </div>
              
              <div className="relative z-10 mt-10">
                 <Link href="/konsultasi-dokter">
                    <button className="h-16 px-8 rounded-full bg-white shadow-xl flex items-center gap-4 text-primary-700 font-bold uppercase tracking-wider text-sm hover:scale-105 transition-all">
                       Mulai Chat <ArrowUpRight size={20} className="stroke-[3]" />
                    </button>
                 </Link>
              </div>
           </motion.div>

        </motion.div>

      </div>
    </div>
  )
}
