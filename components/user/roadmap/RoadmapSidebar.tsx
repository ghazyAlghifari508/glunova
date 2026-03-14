'use client'

import { motion } from 'framer-motion'
import { Activity, Beaker, FileSignature, TrendingUp } from 'lucide-react'
import { RoadmapProgress } from './roadmap-progress'
import { useHealthData } from '@/hooks/useHealthData'

interface RoadmapSidebarProps {
  monitoringWeek: number
  timelineWeeks: number[]
  journal: string
  setJournal: (val: string) => void
  handleSaveJournal: () => void
  journalSaved: string | null
  completedCount: number
  activitiesCount: number
  streakDays: number
}

export default function RoadmapSidebar({
  monitoringWeek,
  timelineWeeks,
  journal,
  setJournal,
  handleSaveJournal,
  journalSaved,
  completedCount,
  activitiesCount,
  streakDays
}: RoadmapSidebarProps) {
  const { education, loading } = useHealthData()
  return (
    <aside className="space-y-8 xl:sticky xl:top-32 xl:self-start">
      
      {/* TIMELINE CARD */}
      <div className="rounded-[32px] border border-neutral-100 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
         <h3 className="text-2xl font-heading font-black text-neutral-900 flex items-center gap-3 relative z-10">
            <Activity className="h-6 w-6 text-primary-600" />
            Timeline Medis
         </h3>
         <p className="text-neutral-500 font-medium text-sm mt-2 mb-8">Pemantauan Metrik Tiap Minggu</p>

        <div className="relative space-y-2">
          {/* Vertical Track */}
          <div className="absolute left-[24px] top-6 bottom-6 w-0.5 bg-neutral-100 rounded-full" />
          
          {timelineWeeks.map((week) => {
            const isCurrent = week === monitoringWeek
            const isPast = week < monitoringWeek
            
            return (
              <div key={week} className="relative flex items-center gap-6 group/item py-3">
                {/* Node */}
                <motion.div
                  animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`z-10 h-12 w-12 shrink-0 rounded-full border-4 border-white flex items-center justify-center font-black text-sm transition-colors shadow-sm ${
                    isCurrent ? 'bg-primary-600 text-white shadow-primary-500/30' : 
                    isPast ? 'bg-emerald-500 text-white' : 'bg-neutral-100 text-neutral-400'
                  }`}
                >
                   {week}
                </motion.div>
                
                {/* Content */}
                <div
                  className={`flex-1 rounded-2xl border px-5 py-4 transition-all ${
                    isCurrent
                      ? 'border-primary-200 bg-primary-50/50 text-neutral-900 shadow-sm'
                      : isPast
                        ? 'border-emerald-100 bg-emerald-50/30 text-emerald-800'
                        : 'border-transparent bg-transparent text-neutral-400 group-hover/item:border-neutral-100 group-hover/item:bg-neutral-50'
                  }`}
                >
                   <div className="flex items-center justify-between">
                      {isCurrent && <span className="bg-primary-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full">Saat Ini</span>}
                   </div>
                  <p className={`text-base font-bold mt-1 ${isCurrent ? 'text-primary-900' : ''}`}>
                     {isPast ? 'Selesai Dipantau' : isCurrent ? 'Fokus Gula Darah' : 'Menunggu Evaluasi'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* MEDICAL LOGBOOK */}
      <div id="roadmap-journal" className="rounded-[40px] bg-neutral-900 p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/20 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="flex items-center gap-4 mb-2">
           <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
              <FileSignature className="w-5 h-5 text-white" />
           </div>
           <div>
              <h3 className="text-xl font-heading font-black text-white">Logbook Medis</h3>
              <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest mt-1">Catatan Pribadi</p>
           </div>
        </div>
        
        <p className="mt-6 text-sm font-medium text-white/60 leading-relaxed">
           Catat keluhan, lonjakan glukosa, atau hasil tes untuk dibahas dengan dokter.
        </p>

        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder='Contoh: "Puasa jam 8 malam, cek gula darah pagi ini ada di 95 mg/dL..."'
          className="mt-6 h-40 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm font-medium text-white placeholder:text-white/20 outline-none transition-all focus:border-primary-500 focus:bg-black/60 focus:ring-4 focus:ring-primary-500/20"
        />

        <div className="mt-8 flex flex-col gap-5">
           <button
            onClick={handleSaveJournal}
            className="h-14 w-full rounded-2xl bg-primary-600 px-6 text-sm font-black text-white hover:bg-primary-500 shadow-lg shadow-primary-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
           >
            <TrendingUp className="w-4 h-4" /> Simpan Catatan
           </button>
           
           <div className="flex items-center justify-center text-center">
             {journalSaved ? (
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full inline-block">Disinkronisasi • {journalSaved}</p>
             ) : (
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Menunggu Input...</p>
             )}
          </div>
        </div>
      </div>

    </aside>
  )
}
