'use client'

import { motion } from 'framer-motion'
import { CalendarRange, Activity, Settings2, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { ActivityCard } from './ActivityCard'
import { useHealthData } from '@/hooks/useHealthData'
import React from 'react'
import type { RoadmapActivity } from '@/types/roadmap'

interface RoadmapBoardProps {
  filteredActivities: RoadmapActivity[]
  todayLabel: string
  getActivityStatus: (id: string) => 'not_started' | 'in_progress' | 'completed'
  statusConfig: Record<string, { label: string; icon: LucideIcon; color: string; bg: string }>
  difficultyConfig: Record<number, { label: string; color: string; bg: string }>
  defaultDifficulty: { label: string; color: string; bg: string }
  level: number
  setSelectedActivity: (activity: RoadmapActivity) => void
  setIsModalOpen: (val: boolean) => void
  handleComplete: (id: string) => void
}

export function RoadmapBoard({
  filteredActivities,
  todayLabel,
  getActivityStatus,
  statusConfig,
  difficultyConfig,
  defaultDifficulty,
  level,
  setSelectedActivity,
  setIsModalOpen,
  handleComplete
}: RoadmapBoardProps) {

  return (
    <div id="roadmap-activities" className="rounded-[32px] border border-neutral-100 bg-white p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden h-full">
      {/* Subtle Texture Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-8 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <Activity className="h-4 w-4" />
             </div>
             <p className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400">Roadmap Board</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-neutral-900">Aktivitas Harian</h2>
        </div>
        
        <div className="inline-flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-3 text-xs font-bold text-neutral-600 shadow-sm">
          <CalendarRange className="h-4 w-4 text-primary-600" />
          {todayLabel}
        </div>
      </div>

      {filteredActivities.length > 0 ? (
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filteredActivities.map((activity, index) => {
              const status = getActivityStatus(activity.id)
              return (
                 <ActivityCard
                   key={activity.id}
                   activity={activity}
                   index={index}
                   status={status}
                   statusInfo={statusConfig[status]}
                   difficulty={difficultyConfig[activity.difficulty_level] || defaultDifficulty}
                   level={level}
                   onClick={() => {
                     setSelectedActivity(activity)
                     setIsModalOpen(true)
                   }}
                   onComplete={() => handleComplete(activity.id)}
                 />
              )
            })}
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-[32px] border-2 border-dashed border-neutral-200 bg-neutral-50/50 py-16 text-center group">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-neutral-300 shadow-sm border border-neutral-100 group-hover:scale-110 group-hover:text-primary-500 transition-all duration-500 mb-6">
             <Settings2 size={32} />
          </div>
          <h3 className="text-2xl font-heading font-black text-neutral-900 tracking-tight">Kustomisasi Roadmap...</h3>
          <p className="mt-4 mx-auto max-w-sm text-lg font-medium text-neutral-500 leading-relaxed">
            Sistem membutuhkan data profil Anda untuk menyusun rencana klinis harian.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/profile"
              className="h-14 inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-10 text-sm font-black text-white hover:bg-black shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all active:scale-95"
            >
              Lengkapi Profil Kesehatan
            </Link>
          </div>
        </div>
      )}
      
      <div className="mt-20 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-300">
         <div className="h-px w-16 bg-neutral-100" />
         GLUNOVA ROADMAP PROTOCOL
         <div className="h-px w-16 bg-neutral-100" />
      </div>
    </div>
  )
}
