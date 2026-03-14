'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDoctorContext } from '@/components/providers/Providers'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { ConsultationStatusBadge } from '@/components/shared/ConsultationStatus'
import { RatingStars } from '@/components/shared/RatingStars'
import { Search, Users, Clock, ChevronRight, Filter, Settings2, Download } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const STATUS_TABS = [
  { label: 'Semua Pasien', value: 'all' },
  { label: 'Terjadwal', value: 'scheduled' },
  { label: 'Berlangsung', value: 'ongoing' },
  { label: 'Selesai', value: 'completed' },
  { label: 'Dibatalkan', value: 'cancelled' },
]

export default function DoctorConsultationsPage() {
  const router = useRouter()
  const doctorContext = useDoctorContext()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const consultations = doctorContext?.consultations || []
  const loading = doctorContext?.loading

  const filtered = consultations.filter((c) => {
    const matchesSearch = !search || c.user?.full_name?.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || c.status === filter
    return matchesSearch && matchesFilter
  })

  if (loading && consultations.length === 0) {
    return (
      <div className="p-6 md:p-10 min-h-screen bg-[#F8FAFC]">
         <div className="max-w-[1400px] mx-auto space-y-6">
            <Skeleton className="h-12 w-64 rounded-xl" />
            <Skeleton className="h-16 w-full rounded-2xl" />
            <div className="space-y-4">
               {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-20 w-full rounded-2xl" />)}
            </div>
         </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 min-h-screen bg-white font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Manajemen Pasien</h1>
              <p className="text-sm font-medium text-slate-500">Daftar lengkap sesi konsultasi medis Anda.</p>
           </div>
           <div className="flex items-center gap-3">
              <button className="h-10 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs flex items-center gap-2 hover:bg-slate-50 transition-colors">
                 <Download className="w-4 h-4" /> Ekspor Data
              </button>
           </div>
        </div>

        {/* Action Toolbar */}
        <div className="bg-white rounded-[2rem] p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col xl:flex-row justify-between gap-6 items-start xl:items-center">
           
           <div className="relative w-full xl:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
              <Input 
                 value={search} 
                 onChange={(e) => setSearch(e.target.value)} 
                 placeholder="Cari nama pasien, ID transaksi..." 
                 className="w-full h-12 pl-12 pr-4 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all shadow-none" 
              />
           </div>

           <div className="flex overflow-x-auto pb-2 xl:pb-0 w-full xl:w-auto hide-scrollbar gap-2">
              <div className="bg-slate-100 p-1 rounded-2xl flex items-center shrink-0">
                 {STATUS_TABS.map((tab) => {
                    const isActive = filter === tab.value
                    return (
                       <button
                          key={tab.value}
                          onClick={() => setFilter(tab.value)}
                          className={cn(
                             "px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all select-none relative z-10",
                             isActive ? "text-slate-900 bg-white shadow-sm" : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                          )}
                       >
                          {tab.label}
                       </button>
                    )
                 })}
              </div>
              <button className="h-12 w-12 shrink-0 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:text-slate-900 hover:border-slate-300 transition-colors ml-2">
                 <Settings2 className="w-5 h-5" />
              </button>
           </div>
        </div>

        {/* Data Table Wrapper */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           
           {/* Table Header */}
           <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <div className="col-span-4">Informasi Pasien</div>
              <div className="col-span-3">Jadwal Sesi</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Pendapatan</div>
              <div className="col-span-1 text-center">Tindakan</div>
           </div>

           {/* Table Body */}
           <div className="divide-y divide-slate-100">
              <AnimatePresence>
                 {filtered.length === 0 ? (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-24 text-center">
                       <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                       <h3 className="text-lg font-black text-slate-900">Tidak ada data relevan</h3>
                       <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto mt-2">Belum ada pasien atau konsultasi yang sesuai dengan filter pencarian Anda.</p>
                    </motion.div>
                 ) : (
                    filtered.map((c, i) => (
                       <motion.div 
                          key={c.id} 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          transition={{ delay: i * 0.03 }}
                          className="group grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6 items-center hover:bg-slate-50 transition-colors cursor-pointer"
                          onClick={() => router.push(`/doctor/consultations/${c.id}`)}
                       >
                          
                          {/* Col 1: Patient Info */}
                          <div className="col-span-4 flex items-center gap-4">
                             <div className="w-12 h-12 rounded-[1rem] bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                                <Users className="w-5 h-5 text-slate-400" />
                             </div>
                             <div className="min-w-0">
                                <p className="font-black text-sm text-slate-900 truncate group-hover:text-amber-500 transition-colors">
                                   {c.user?.full_name || 'Pasien Anonim'}
                                </p>
                                <p className="text-xs font-bold text-slate-400 truncate mt-0.5 uppercase tracking-widest">
                                   {c.title || 'Sesi Konsultasi Umum'}
                                </p>
                             </div>
                          </div>

                          {/* Col 2: Schedule */}
                          <div className="col-span-3 flex items-center gap-2 text-sm font-bold text-slate-600">
                             <Clock className="w-4 h-4 text-slate-400 md:hidden" />
                             {new Date(c.scheduled_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                          </div>

                          {/* Col 3: Status & Ratings */}
                          <div className="col-span-2 flex flex-col items-start gap-1.5">
                             <ConsultationStatusBadge status={c.status} />
                             {c.rating && <div className="scale-90 origin-left"><RatingStars rating={c.rating} size={12} /></div>}
                          </div>

                          {/* Col 4: Revenue */}
                          <div className="col-span-2 md:text-right font-black text-slate-900 tracking-tight">
                             <span className="text-xs text-slate-400 md:hidden mr-2 uppercase tracking-wide">Tarif:</span>
                             Rp {(c.total_cost || 0).toLocaleString('id-ID')}
                          </div>

                          {/* Col 5: Action */}
                          <div className="col-span-1 flex justify-end md:justify-center">
                             <div className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                                <ChevronRight className="w-5 h-5" />
                             </div>
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
