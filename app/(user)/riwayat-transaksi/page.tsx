'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useHealthData } from '@/hooks/useHealthData'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ConsultationStatusBadge } from '@/components/shared/ConsultationStatus'
import { 
  ArrowLeft, Search, Filter, Download, FileText, 
  MoreHorizontal, ChevronRight, Receipt, Activity, Clock,
  BarChart3, Database, Wallet, CreditCard, Calendar
} from 'lucide-react'

export default function ConsultationHistoryPage() {
  const router = useRouter()
  const { profile, loading: dataLoading, consultations: consultationsData, loadConsultations } = useHealthData()
  const [searchTerm, setSearchTerm] = useState('')
  const consultationsLocal = consultationsData.data || []

  useEffect(() => {
    if (dataLoading || !profile) return
    loadConsultations()
  }, [profile, dataLoading, consultationsLocal.length, loadConsultations])

  useEffect(() => {
    if (!dataLoading && !profile) router.push('/login')
  }, [profile, dataLoading, router])

  const filteredConsultations = consultationsLocal.filter(c => 
    c.doctor?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalSpent = consultationsLocal.reduce((acc, curr) => acc + (curr.total_cost || 0), 0)

  if ((dataLoading || consultationsData.loading) && consultationsLocal.length === 0) {
    return (
      <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 relative z-10 w-full space-y-12 animate-pulse">
          <div className="h-16 w-64 bg-white border border-[color:var(--neutral-100)] rounded-2xl" />
          <div className="h-32 w-full bg-white border border-[color:var(--neutral-100)] rounded-2xl" />
          <div className="h-[400px] w-full bg-white border border-[color:var(--neutral-100)] rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden">
      
      {/* Professional Background */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(26,86,219,0.03)_0%,_transparent_70%)]" />
         <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(var(--neutral-200) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 relative z-10 w-full">
        
        {/* Page Header */}
        <motion.div 
           initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
           className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-10"
        >
          <div className="flex items-start gap-5">
            <button 
              onClick={() => router.back()}
              className="h-12 w-12 rounded-xl bg-white border border-[color:var(--neutral-200)] flex items-center justify-center group hover:bg-[color:var(--neutral-50)] hover:border-[color:var(--primary-700)]/30 transition-all shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-[color:var(--neutral-400)] group-hover:text-[color:var(--primary-700)] group-hover:-translate-x-1 transition-all" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                 <div className="h-1 w-6 rounded-full bg-[color:var(--primary-700)]" />
                 <span className="text-[10px] font-bold text-[color:var(--primary-700)] uppercase tracking-widest font-heading">Manajemen Biaya</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[color:var(--neutral-900)] tracking-tight font-heading">Riwayat Transaksi</h1>
              <p className="text-[11px] font-medium text-[color:var(--neutral-400)] mt-2 leading-relaxed font-body max-w-md">Pantau seluruh catatan transaksi konsultasi medis Anda secara aman dan transparan.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 bg-white border border-[color:var(--neutral-200)] p-5 rounded-2xl shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-full bg-[color:var(--primary-50)] blur-[100px] pointer-events-none opacity-40 transition-opacity" />
             <div className="w-12 h-12 rounded-xl bg-[color:var(--primary-50)] text-[color:var(--primary-700)] flex items-center justify-center border border-[color:var(--primary-100)] group-hover:scale-105 transition-transform duration-500">
                <BarChart3 className="w-6 h-6" />
             </div>
             <div className="relative z-10">
                <p className="text-[10px] font-bold text-[color:var(--neutral-300)] uppercase tracking-widest mb-1 font-heading">Total Pengeluaran Sesi</p>
                <div className="flex items-baseline gap-2">
                   <p className="text-[11px] font-bold text-[color:var(--neutral-400)] uppercase font-heading">IDR</p>
                   <p className="text-2xl font-bold text-[color:var(--neutral-900)] tracking-tight font-heading tabular-nums">
                      {totalSpent.toLocaleString('id-ID')}
                   </p>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Transaction Table */}
        <div className="bg-white border border-[color:var(--neutral-200)] rounded-2xl overflow-hidden shadow-sm relative">
          
          {/* Table Controls */}
          <div className="p-5 border-b border-[color:var(--neutral-100)] flex flex-col lg:flex-row gap-4 justify-between items-center bg-[color:var(--neutral-50)]/30">
            <div className="relative w-full lg:max-w-2xl group/search">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--neutral-300)] group-focus-within/search:text-[color:var(--primary-700)] transition-colors" />
              <input 
                 type="text" 
                 placeholder="Cari berdasarkan nama dokter atau ID transaksi..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full h-12 pl-12 pr-6 rounded-xl bg-white border border-[color:var(--neutral-200)] text-xs font-medium text-[color:var(--neutral-900)] focus:border-[color:var(--primary-700)] focus:shadow-xl focus:shadow-[color:var(--primary-700)]/5 transition-all outline-none placeholder:text-[color:var(--neutral-200)] font-body"
              />
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
               <button className="h-12 px-5 rounded-xl bg-white border border-[color:var(--neutral-200)] text-[10px] font-bold uppercase tracking-widest text-[color:var(--neutral-400)] hover:text-[color:var(--primary-700)] hover:border-[color:var(--primary-100)] transition-all flex-1 lg:flex-none flex items-center justify-center gap-2 shadow-sm font-heading">
                  <Filter className="w-3.5 h-3.5 text-[color:var(--primary-700)]" /> Filter
               </button>
               <button className="h-12 px-5 rounded-xl bg-white border border-[color:var(--neutral-200)] text-[10px] font-bold uppercase tracking-widest text-[color:var(--neutral-400)] hover:text-[color:var(--primary-700)] hover:border-[color:var(--primary-100)] transition-all flex-1 lg:flex-none flex items-center justify-center gap-2 shadow-sm font-heading">
                  <Download className="w-3.5 h-3.5 text-[color:var(--primary-700)]" /> Ekspor
               </button>
            </div>
          </div>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-8 px-10 py-6 border-b border-[color:var(--neutral-100)] bg-[color:var(--neutral-50)]/10 text-[10px] font-bold text-[color:var(--neutral-300)] uppercase tracking-widest font-heading">
             <div className="col-span-4 flex items-center gap-3">
                <CreditCard size={14} className="text-[color:var(--primary-700)]/30" /> Dokter Spesialis
             </div>
             <div className="col-span-3">Tanggal Sesi</div>
             <div className="col-span-2">Status</div>
             <div className="col-span-2 text-right">Biaya Konsultasi</div>
             <div className="col-span-1 text-right">Detail</div>
          </div>

          <div className="divide-y divide-[color:var(--neutral-100)]">
             <AnimatePresence>
                {filteredConsultations.length === 0 ? (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center px-8 relative overflow-hidden font-body">
                      <div className="w-24 h-24 bg-[color:var(--neutral-50)] rounded-xl flex items-center justify-center mx-auto mb-8 border border-[color:var(--neutral-100)] shadow-inner">
                         <Receipt className="w-10 h-10 text-[color:var(--neutral-200)]" />
                      </div>
                      <h3 id="empty-transaction-state" data-testid="empty-transaction-state" className="text-2xl font-bold text-[color:var(--neutral-900)] tracking-tight font-heading">Belum Ada Transaksi</h3>
                      <p className="text-[color:var(--neutral-400)] text-[11px] font-medium leading-relaxed mt-4 max-w-sm mx-auto font-body">Anda belum melakukan sesi konsultasi berbayar. Silahkan hubungi spesialis kami untuk memulai pelacakan medis.</p>
                      <Link href="/konsultasi-dokter" className="mt-10 inline-block">
                         <button className="h-16 px-12 rounded-2xl bg-[color:var(--primary-700)] text-white font-bold text-[11px] uppercase tracking-widest hover:bg-[color:var(--primary-800)] shadow-lg shadow-[color:var(--primary-700)]/10 transition-all flex items-center gap-3 font-heading">
                            Konsultasi Sekarang <ChevronRight className="w-5 h-5" />
                         </button>
                      </Link>
                   </motion.div>
                ) : (
                   filteredConsultations.map((c, i) => (
                    <motion.div 
                      key={c.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group flex flex-col md:grid md:grid-cols-12 gap-5 px-6 py-5 items-start md:items-center hover:bg-[color:var(--primary-50)]/20 transition-all relative overflow-hidden font-body"
                    >
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-[color:var(--primary-700)] opacity-0 group-hover:opacity-100 transition-all" />

                       {/* Doctor / Operator */}
                       <div className="col-span-4 flex items-center gap-4 w-full md:w-auto">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[color:var(--neutral-100)] bg-[color:var(--neutral-50)] shadow-inner">
                             {c.doctor?.profile_picture_url ? (
                                <Image src={c.doctor.profile_picture_url} alt={c.doctor.full_name} fill unoptimized className="object-cover" />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center text-[color:var(--neutral-200)] text-[9px] font-bold font-heading">DR</div>
                             )}
                          </div>
                          <div className="min-w-0 flex-1">
                             <Link href={`/konsultasi-dokter/${c.id}`} className="text-base font-bold text-[color:var(--neutral-900)] hover:text-[color:var(--primary-700)] truncate block tracking-tight transition-colors font-heading">
                                {c.doctor?.full_name || 'Dokter Spesialis'}
                             </Link>
                             <p className="text-[9px] font-bold text-[color:var(--primary-700)]/50 uppercase tracking-widest truncate mt-0.5 font-heading">{c.doctor?.specialization?.toUpperCase() || 'UMUM'}</p>
                          </div>
                          <div className="md:hidden shrink-0 scale-75 origin-right">
                             <ConsultationStatusBadge status={c.status} />
                          </div>
                       </div>

                       {/* Timestamp */}
                       <div className="col-span-3 text-[12px] font-medium text-[color:var(--neutral-400)] flex items-center gap-3 w-full md:w-auto font-body">
                          <Calendar size={14} className="text-[color:var(--primary-700)] md:hidden" />
                          <span className="tabular-nums">
                             {new Date(c.scheduled_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                       </div>

                       {/* Status Badge */}
                       <div className="col-span-2 hidden md:block">
                          <ConsultationStatusBadge status={c.status} />
                       </div>

                       {/* Cost / Payload */}
                       <div className="col-span-2 md:text-right w-full md:w-auto flex justify-between md:block items-center">
                          <span className="text-[9px] font-bold text-[color:var(--neutral-200)] uppercase tracking-widest md:hidden font-heading">Total Biaya</span>
                          <div className="flex md:justify-end items-baseline gap-1.5">
                             <span className="text-[9px] font-bold text-[color:var(--neutral-300)] uppercase font-heading">IDR</span>
                             <span className="text-lg font-bold text-[color:var(--neutral-900)] tracking-tight font-heading tabular-nums">
                                {(c.total_cost || 0).toLocaleString('id-ID')}
                             </span>
                          </div>
                       </div>

                       {/* Detail Access */}
                       <div className="col-span-1 hidden md:flex justify-end items-center">
                          <Link href={`/konsultasi-dokter/${c.id}`}>
                             <button className="h-10 w-10 rounded-xl bg-white border border-[color:var(--neutral-200)] text-[color:var(--neutral-300)] hover:text-[color:var(--primary-700)] hover:border-[color:var(--primary-700)] transition-all flex items-center justify-center shadow-sm">
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                             </button>
                          </Link>
                       </div>
                    </motion.div>
                   ))
                )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
