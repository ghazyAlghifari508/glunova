'use client'

import { useEffect, useState } from 'react'
import * as doctorService from '@/services/doctorService'
import { DoctorCard } from '@/components/consultation/DoctorCard'
import { SearchFilter } from '@/components/consultation/SearchFilter'
import { useAuth } from '@/hooks/useAuth'
import { 
  HeartHandshake, Sparkles, MessageSquareHeart
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function DoctorListingPage() {
  const { user } = useAuth()
  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    specialization: '',
    search: ''
  })

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true)
      try {
        const data = await doctorService.getDoctors({
          search: filters.search,
          specialization: filters.specialization === 'Semua' ? '' : filters.specialization
        })
        setDoctors(data)
      } catch (error) {
        console.error('Error fetching doctors:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDoctors()
  }, [filters])

  return (
    <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 relative z-10 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12 gap-6">
           <div>
              <span className="text-[color:var(--primary-700)] font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mb-3 block">Glunova Health</span>
              <h1 className="text-4xl md:text-5xl font-heading font-black text-[color:var(--neutral-900)] tracking-tight leading-[1.1]">
                Konsultasi <span className="text-[color:var(--neutral-400)] italic font-serif">Dokter</span> Spesialis
              </h1>
           </div>
           
           <div className="w-full lg:w-auto flex justify-start lg:justify-end pb-2">
             <Link href="/riwayat-transaksi">
               <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[color:var(--neutral-200)] rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-sm hover:border-[color:var(--primary-200)] transition-all text-[13px] font-semibold text-[color:var(--neutral-700)] group active:scale-95">
                 <div className="p-1.5 rounded-lg bg-[color:var(--neutral-50)] group-hover:bg-[color:var(--primary-50)] transition-colors">
                   <MessageSquareHeart className="w-3.5 h-3.5 text-[color:var(--neutral-500)] group-hover:text-[color:var(--primary-600)]" />
                 </div>
                 Riwayat Chat
               </button>
             </Link>
           </div>
        </div>

        {/* Search & Filter Component */}
        <motion.div 
           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
           className="mb-8"
        >
          <SearchFilter 
            onFilterChange={(newFilters: any) => setFilters(prev => ({ ...prev, ...newFilters }))} 
          />
        </motion.div>

        {/* Doctor Grid Area - Single Column Full Width */}
        <div className="flex flex-col gap-4 w-full">
          <AnimatePresence mode="popLayout">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <motion.div 
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="w-full bg-white rounded-xl border border-[color:var(--neutral-200)] p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-6 shadow-sm"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[color:var(--neutral-100)] animate-pulse shrink-0 mx-auto sm:mx-0" />
                  <div className="flex-1 flex flex-col gap-3 py-1 w-full text-center sm:text-left">
                    <div className="h-4 w-20 bg-[color:var(--neutral-100)] rounded mt-2 animate-pulse mx-auto sm:mx-0" />
                    <div className="h-6 w-40 bg-[color:var(--neutral-100)] rounded-md animate-pulse mx-auto sm:mx-0" />
                    <div className="h-3 w-28 bg-[color:var(--neutral-100)] rounded animate-pulse mx-auto sm:mx-0" />
                  </div>
                  <div className="w-full md:w-auto md:min-w-[180px] flex flex-col items-center md:items-end gap-3 mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-[color:var(--neutral-100)] md:pl-6">
                     <div className="h-6 w-16 bg-[color:var(--neutral-100)] rounded animate-pulse" />
                     <div className="h-10 w-full md:w-28 bg-[color:var(--neutral-100)] rounded-xl animate-pulse" />
                  </div>
                </motion.div>
              ))
            ) : doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <DoctorCard key={doctor.id} doctor={doctor} index={index} />
              ))
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="w-full py-20 md:py-32 flex flex-col items-center justify-center text-center bg-white border border-[color:var(--neutral-100)] rounded-2xl shadow-sm mt-4"
              >
                <div className="w-24 h-24 rounded-full bg-[color:var(--primary-50)] flex items-center justify-center mb-6">
                  <HeartHandshake className="w-10 h-10 text-[color:var(--primary-500)]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[color:var(--neutral-900)] tracking-tight mb-3 font-heading">Dokter Tidak Ditemukan</h3>
                <p className="text-[color:var(--neutral-500)] font-medium max-w-sm font-body mb-8 text-sm md:text-base">
                  Maaf, tidak ada dokter yang sesuai dengan kriteria spesialisasi atau nama yang dicari.
                </p>
                <button 
                  onClick={() => setFilters({ specialization: '', search: '' })}
                  className="px-8 py-4 bg-white border border-[color:var(--neutral-200)] text-[color:var(--neutral-700)] font-bold text-sm uppercase tracking-wider rounded-2xl hover:bg-[color:var(--neutral-50)] transition-all flex items-center gap-3 font-heading shadow-sm active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-[color:var(--primary-600)]" /> Atur Ulang Filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
