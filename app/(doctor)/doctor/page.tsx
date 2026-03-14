'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useDoctorContext } from '@/components/providers/Providers'
import { AppointmentTrendChart } from '@/components/doctor/dashboard/AppointmentTrendChart'
import { Skeleton } from '@/components/ui/skeleton'
import { Activity, Users, CalendarCheck, Wallet, ChevronRight, BellRing, Settings } from 'lucide-react'
import Link from 'next/link'

export default function DoctorDashboardPage() {
  const doctorContext = useDoctorContext()
  const stats = doctorContext?.stats
  const loading = doctorContext?.loading

  // Derived mock numbers for the premium visual
  const totalPatients = stats?.totalPatients || 0
  const activeConsults = stats?.activeConsultations || 0
  const monthlyRevenue = stats?.monthlyRevenue || 0
  const completed = stats?.completedConsultations || 0

  if (loading && !stats) {
    return (
      <div className="p-6 md:p-10 min-h-screen space-y-8 bg-slate-50">
        <Skeleton className="h-12 w-1/3 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
        </div>
        <Skeleton className="h-[400px] w-full rounded-3xl" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-6 lg:p-10 space-y-8 font-sans">
      
      {/* Top Navigation Wrapper */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
         <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Dashboard Dokter</h1>
            <p className="text-sm font-medium text-slate-500">Pantau performa medis dan ringkasan aktivitas konsultasi Anda.</p>
         </div>
         <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors relative">
               <BellRing className="w-5 h-5" />
               <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <button className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
               <Settings className="w-5 h-5" />
            </button>
         </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {/* Metric 1 */}
         <motion.div initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} transition={{delay: 0.05}} className="text-white rounded-[2rem] p-6 relative overflow-hidden group shadow-xl shadow-[color:var(--primary-700)]/20" style={{ background: 'linear-gradient(135deg, var(--primary-700), var(--primary-900))' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
            <div className="flex items-center justify-between mb-8 relative z-10">
               <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/10"><Wallet className="w-5 h-5 text-white" /></div>
               <span className="text-[10px] uppercase font-black tracking-widest text-white bg-white/10 px-2 py-1 rounded-md">Bulan Ini</span>
            </div>
            <div className="relative z-10">
               <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1">Total Pendapatan</p>
               <p className="text-3xl font-black tracking-tighter">Rp {monthlyRevenue.toLocaleString('id-ID')}</p>
            </div>
         </motion.div>

         {/* Metric 2 */}
         <motion.div initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} transition={{delay: 0.1}} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-8">
               <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100"><Users className="w-5 h-5 text-[color:var(--primary-700)]" /></div>
               <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">+4.2%</span>
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Pasien</p>
               <p className="text-3xl font-black tracking-tighter text-slate-900">{totalPatients}</p>
            </div>
         </motion.div>

         {/* Metric 3 */}
         <motion.div initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} transition={{delay: 0.15}} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-8">
               <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100"><Activity className="w-5 h-5 text-blue-600" /></div>
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Konsultasi Aktif</p>
               <p className="text-3xl font-black tracking-tighter text-slate-900">{activeConsults}</p>
            </div>
         </motion.div>

         {/* Metric 4 */}
         <motion.div initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} transition={{delay: 0.2}} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-8">
               <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100"><CalendarCheck className="w-5 h-5 text-emerald-600" /></div>
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Selesai (Bulan Ini)</p>
               <p className="text-3xl font-black tracking-tighter text-slate-900">{completed}</p>
            </div>
         </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         
         {/* Chart Section */}
         <div className="xl:col-span-2 space-y-8">
            <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{delay:0.3}} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <div>
                     <h3 className="text-lg font-black text-slate-900 tracking-tight">Tren Konsultasi</h3>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">7 Hari Terakhir</p>
                  </div>
                  <button className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-1">
                     Laporan Lengkap <ChevronRight className="w-3 h-3" />
                  </button>
               </div>
               <div className="h-[300px] w-full">
                  <AppointmentTrendChart data={stats?.weeklyTrend} summary={stats?.statusSummary} />
               </div>
            </motion.div>
         </div>

         {/* Right Sidebar Area */}
         <div className="xl:col-span-1 space-y-8">
            
            {/* Quick Actions Action Block */}
            <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay:0.4}} className="text-slate-900 border border-slate-100 bg-white shadow-sm rounded-[2.5rem] p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[color:var(--primary-50)] rounded-full blur-3xl pointer-events-none" />
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-6 relative z-10">Pintasan Aksi</h3>
               
               <div className="space-y-3 relative z-10">
                  <Link href="/doctor/schedule" className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-[color:var(--primary-50)] border border-slate-100 hover:border-[color:var(--primary-200)] transition-all">
                     <span className="font-bold text-sm tracking-wide group-hover:text-[color:var(--primary-700)]">Atur Jadwal Praktik</span>
                     <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[color:var(--primary-700)] group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href="/doctor/consultations" className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-[color:var(--primary-50)] border border-slate-100 hover:border-[color:var(--primary-200)] transition-all">
                     <span className="font-bold text-sm tracking-wide group-hover:text-[color:var(--primary-700)]">Buka Ruang Konsultasi</span>
                     <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[color:var(--primary-700)] group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href="/doctor/earnings" className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-[color:var(--primary-50)] border border-slate-100 hover:border-[color:var(--primary-200)] transition-all">
                     <span className="font-bold text-sm tracking-wide group-hover:text-[color:var(--primary-700)]">Lihat Keuangan</span>
                     <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[color:var(--primary-700)] group-hover:translate-x-1 transition-all" />
                  </Link>
               </div>
            </motion.div>

         </div>
      </div>

    </div>
  )
}
