'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import type { RoadmapActivity, UserRoadmapProgress } from '@/types/roadmap'
import { Target, Activity } from 'lucide-react'
import { useHealthData } from '@/hooks/useHealthData'

interface RoadmapHeaderProps {
  progress: UserRoadmapProgress[]
  activities: RoadmapActivity[]
}

export function RoadmapHeader({ progress, activities }: RoadmapHeaderProps) {
  const { monitoring_week } = useHealthData()
  const completedCount = progress.filter(p => p.status === 'completed' && activities.some(a => a.id === p.activity_id)).length
  const totalCount = activities.length
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <section className="w-full relative overflow-hidden pt-10 md:pt-14 pb-4">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-end justify-between mb-8 gap-6">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-6 max-w-3xl"
          >
             <div>
                <span className="text-[color:var(--primary-700)] font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Glunova Care</span>
              <h1 className="text-4xl md:text-5xl font-heading font-black text-[color:var(--neutral-900)] tracking-tighter leading-[0.9]">
                  Roadmap <br />
                  <span className="text-[color:var(--neutral-400)] italic font-serif">
                    Metabolik
                  </span> Anda.
                </h1>
             </div>

             <div className="flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-[color:var(--neutral-100)] text-[color:var(--neutral-700)] border border-[color:var(--neutral-200)] font-black uppercase tracking-[0.2em] px-5 py-2 text-xs">
                  Minggu Monitoring: {monitoring_week}
                </Badge>
             </div>
             
             <p className="text-lg font-medium text-[color:var(--neutral-500)] max-w-xl leading-relaxed">
                Peta jalan harian adaptif untuk mengontrol gula darah, nutrisi, dan target kesehatan secara presisi.
             </p>
          </motion.div>

          {/* Stats Card - Light Mode styling */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
             className="relative shrink-0 w-full lg:w-auto"
          >
             <div className="bg-white border border-[color:var(--neutral-200)] rounded-[2rem] p-6 md:p-8 shadow-sm flex items-center justify-between lg:justify-start gap-8 lg:gap-10 w-full">
                <div>
                   <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[color:var(--neutral-400)] mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-[color:var(--warning)]" /> Pencapaian
                   </p>
                   <div className="flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl font-heading font-black text-[color:var(--neutral-900)]">{percentage}</span>
                      <span className="text-xl font-bold text-[color:var(--neutral-400)]">%</span>
                   </div>
                </div>

                <div className="h-16 w-px bg-[color:var(--neutral-200)]" />

                <div>
                   <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[color:var(--neutral-400)] mb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[color:var(--success)]" /> Selesai
                   </p>
                   <div className="flex items-baseline gap-1">
                      <span className="text-2xl md:text-3xl font-heading font-black text-[color:var(--neutral-900)]">{completedCount}</span>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
