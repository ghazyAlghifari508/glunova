'use client'

import { motion } from 'framer-motion'
import { EducationContent } from '@/types/education'
import { EducationCard } from './EducationCard'
import { cn } from '@/lib/utils'

interface TimelineViewProps {
  contents: EducationContent[]
  readDays: Set<number>
  favoriteDays: Set<number>
  onCardClick: (day: number) => void
  onFavorite: (day: number) => void
  currentDay?: number
}

export function TimelineView({
  contents,
  readDays,
  favoriteDays,
  onCardClick,
  onFavorite,
  currentDay = 1
}: TimelineViewProps) {
  // Sort contents by day
  const sortedContents = [...contents].sort((a, b) => a.day - b.day)

  return (
    <div className="space-y-6 py-2">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-5 top-0 w-[2px] rounded-full bg-[color:var(--primary-700)] opacity-25" />
        
        <div className="space-y-4 pl-11">
          {sortedContents.length > 0 ? (
            sortedContents.map((content, index) => {
              const isCurrent = content.day === currentDay
              const isRead = readDays.has(content.day)
              
              return (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index % 5 * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  <div className={cn(
                    "absolute -left-[28px] top-5 z-10 h-4 w-4 rounded-full border-2 border-white shadow-sm transition-all duration-300",
                    isCurrent 
                      ? "bg-[color:var(--primary-700)] scale-110 ring-4 ring-[color:var(--primary-700)]/15" 
                      : isRead 
                        ? "bg-emerald-500" 
                        : "bg-slate-200"
                  )} />
                  
                  {isCurrent && (
                    <div className="absolute -left-[94px] top-4 hidden lg:block">
                      <div className="flex items-center gap-2 rounded-full bg-[color:var(--primary-700)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-sm">
                        <span>Hari Ini</span>
                        <div className="w-2 h-2 border-t-2 border-r-2 border-white rotate-45" />
                      </div>
                    </div>
                  )}
                  
                  <EducationCard
                    content={content}
                    isRead={isRead}
                    isFavorite={favoriteDays.has(content.day)}
                    onClick={() => onCardClick(content.day)}
                    onFavorite={() => onFavorite(content.day)}
                  />
                </motion.div>
              )
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-sm font-semibold italic text-slate-500">
                Belum ada konten edukasi tersedia.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
