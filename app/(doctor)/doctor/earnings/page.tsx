'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, TrendingUp, History, Download, ArrowUpRight, ArrowDownRight, CreditCard, ChevronRight } from 'lucide-react'
import { useDoctorContext } from '@/components/providers/Providers'
import { Skeleton } from '@/components/ui/skeleton'
import type { DoctorEarningRecord } from '@/types/consultation'

export default function DoctorEarningsPage() {
  const doctorContext = useDoctorContext()
  const earnings = (doctorContext?.earnings || []) as DoctorEarningRecord[]
  const loading = doctorContext?.loading

  const totalEarnings = earnings.reduce((acc, curr) => acc + (curr.total_cost || 0), 0)

  if (loading && earnings.length === 0) {
     return (
        <div className="p-6 md:p-10 min-h-screen bg-[#F8FAFC]">
           <div className="max-w-[1200px] mx-auto space-y-6">
              <Skeleton className="h-12 w-64 rounded-xl" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <Skeleton className="col-span-2 h-64 rounded-[2.5rem]" />
                 <Skeleton className="col-span-1 h-64 rounded-[2.5rem]" />
              </div>
              <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
           </div>
        </div>
     )
  }

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-500/30 selection:text-emerald-900">
      <div className="max-w-[1200px] mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Keuangan & Saldo</h1>
              <p className="text-sm font-medium text-slate-500">Ringkasan pendapatan dari seluruh sesi konsultasi selesai.</p>
           </div>
           <button className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-blue-600/10">
              <Download className="w-4 h-4" /> Unduh Laporan PDF
           </button>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Primary Balance Card */}
           <motion.div initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} className="lg:col-span-2 bg-slate-950 text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group shadow-2xl shadow-slate-900/10">
              {/* Abstract Backgrounds */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none group-hover:from-emerald-500/30 transition-colors duration-700" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-[60px] -ml-20 -mb-20 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between w-full h-full gap-8">
                 <div className="flex flex-col justify-between">
                    <div>
                       <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                             <Wallet className="w-6 h-6 text-emerald-400" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-400/20">
                             Saldo Tersedia
                          </span>
                       </div>
                       <p className="text-sm font-medium text-slate-400 mb-1">Total Pendapatan Bersih</p>
                       <h2 className="text-5xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                          Rp {totalEarnings.toLocaleString('id-ID')}
                       </h2>
                    </div>
                 </div>

                 {/* Withdraw Action Box */}
                 <div className="w-full md:w-auto mt-auto flex md:flex-col items-center md:items-end justify-between md:justify-end gap-4">
                    <div className="text-left md:text-right">
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Terakhir Ditarik</p>
                       <p className="text-sm font-semibold text-white truncate">-</p>
                    </div>
                    <button className="w-full md:w-auto h-14 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black tracking-wide flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-emerald-500/20">
                       Tarik Dana <ArrowUpRight className="w-5 h-5" />
                    </button>
                 </div>
              </div>
           </motion.div>

           {/* Metrics Column */}
           <div className="lg:col-span-1 flex flex-col gap-6">
              
              <motion.div initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="bg-white rounded-[2.5rem] p-6 border border-slate-200 shadow-sm flex flex-col justify-center flex-1 group hover:border-slate-300 transition-colors">
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                       <TrendingUp className="w-6 h-6 text-indigo-500" />
                    </div>
                    <span className="text-xs font-bold text-indigo-500 flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-md">
                       <ArrowUpRight className="w-3 h-3" /> 12%
                    </span>
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Sesi Selesai</p>
                    <h3 className="text-3xl font-black tracking-tighter text-slate-900">
                       {earnings.length} <span className="text-sm font-bold text-slate-400 tracking-normal">Konsultasi</span>
                    </h3>
                 </div>
              </motion.div>

           </div>
        </div>

        {/* Transaction History Section */}
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           
           <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-[1rem] bg-slate-200/50 flex items-center justify-center border border-slate-200">
                    <History className="w-5 h-5 text-slate-500" />
                 </div>
                 <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">Riwayat Transaksi</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Pendapatan Masuk</p>
                 </div>
              </div>
              <button className="text-xs font-bold text-slate-400 hover:text-slate-900 flex items-center gap-1 transition-colors">
                 Lihat Semua <ChevronRight className="w-3 h-3" />
              </button>
           </div>

           <div className="p-2 md:p-4">
              <AnimatePresence>
                 {earnings.length === 0 ? (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="py-20 text-center">
                       <CreditCard className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                       <p className="text-slate-500 font-bold text-lg">Belum ada riwayat pendapatan</p>
                       <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">Pendapatan akan muncul di sini setelah sesi konsultasi dengan pasien selesai.</p>
                    </motion.div>
                 ) : (
                    <div className="space-y-2">
                       {earnings.map((tx, idx) => (
                          <motion.div 
                             key={tx.id} 
                             initial={{opacity:0, x:-10}} 
                             animate={{opacity:1, x:0}} 
                             transition={{delay: idx * 0.05}}
                             className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100"
                          >
                             <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                <div className="w-12 h-12 rounded-[1.2rem] bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs text-center border border-slate-200 group-hover:bg-white group-hover:shadow-sm transition-all">
                                   #{tx.id.substring(0, 4)}
                                </div>
                                <div className="min-w-0">
                                   <p className="font-bold text-sm text-slate-900 truncate">
                                      {tx.user?.full_name || 'Pembayaran Sesi Anonim'}
                                   </p>
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                      {tx.ended_at ? new Date(tx.ended_at).toLocaleDateString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) : '-'}
                                   </p>
                                </div>
                             </div>
                             
                             <div className="w-full sm:w-auto flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center px-2 sm:px-0">
                                <p className="font-black text-lg text-emerald-600 tracking-tight sm:mb-1">
                                   + Rp {(tx.total_cost || 0).toLocaleString('id-ID')}
                                </p>
                                <span className="text-[10px] px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 font-bold uppercase tracking-widest border border-emerald-100">
                                   Berhasil
                                </span>
                             </div>
                          </motion.div>
                       ))}
                    </div>
                 )}
              </AnimatePresence>
           </div>
        </motion.div>
        
      </div>
    </div>
  )
}
