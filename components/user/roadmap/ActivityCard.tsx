'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Activity, ArrowRight,
  ClipboardList, Clock, HeartPulse, ShieldAlert, CheckCircle2,
  Syringe, Apple, Beaker
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { RoadmapActivity } from '@/types/roadmap'

interface ActivityCardProps {
  activity: RoadmapActivity
  index: number
  status: 'not_started' | 'in_progress' | 'completed'
  statusInfo: { label: string; icon: LucideIcon; color: string; bg: string }
  difficulty: { label: string; color: string; bg: string }
  onClick: () => void
  onComplete: () => void
}

const categoryConfig: Record<string, { label: string; icon: LucideIcon; bg: string; text: string; shadow: string }> = {
  exercise: {
    label: 'Aktivitas Fisik',
    icon: HeartPulse,
    bg: 'bg-rose-50',
    text: 'text-rose-600',
    shadow: 'shadow-rose-100'
  },
  nutrition: {
    label: 'Diet & Nutrisi',
    icon: Apple,
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    shadow: 'shadow-emerald-100'
  },
  sleep: {
    label: 'Istirahat',
    icon: Clock,
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    shadow: 'shadow-indigo-100'
  },
  checkup: {
    label: 'Cek Glukosa',
    icon: Syringe,
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    shadow: 'shadow-blue-100'
  },
  mental: {
    label: 'Manajemen Stres',
    icon: Activity,
    bg: 'bg-fuchsia-50',
    text: 'text-fuchsia-600',
    shadow: 'shadow-fuchsia-100'
  },
}

const defaultCategory = {
  label: 'Terapi Umum',
  icon: ClipboardList,
  bg: 'bg-neutral-100',
  text: 'text-neutral-600',
  shadow: 'shadow-neutral-200'
}

export const ActivityCard = React.memo(({
  activity,
  index,
  status,
  statusInfo,
  difficulty,
  onClick,
  onComplete,
}: ActivityCardProps) => {
  const isCompleted = status === 'completed'
  const category = categoryConfig[activity.category] || defaultCategory
  const CategoryIcon = category.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div
        className={`relative cursor-pointer overflow-hidden rounded-[24px] border transition-all duration-500 flex flex-col h-full bg-white
        ${isCompleted 
           ? 'border-emerald-100 shadow-[0_4px_12px_rgba(16,185,129,0.05)]' 
           : 'border-neutral-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-primary-300'
        }`}
        onClick={onClick}
      >
        <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
           
           {/* Header / Category */}
           <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${category.bg} ${category.text} ${category.shadow}`}>
                    <CategoryIcon className="w-6 h-6" />
                 </div>
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                       <span className={`text-[10px] font-black uppercase tracking-widest ${category.text}`}>
                          {category.label}
                       </span>
                       <span className="w-1 h-1 rounded-full bg-neutral-300" />
                       <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                          {activity.frequency_per_week > 0 ? `${activity.frequency_per_week}X Seminggu` : 'Sesi Harian'}
                       </span>
                    </div>
                    <h3 className={`text-xl md:text-2xl font-heading font-black text-neutral-900 leading-tight transition-all
                       ${isCompleted ? 'text-neutral-600 line-through decoration-neutral-300' : 'group-hover:text-primary-700'}
                    `}>
                       {activity.activity_name}
                    </h3>
                 </div>
              </div>
              
              {/* Check Button */}
              <button
                 onClick={(e) => {
                    e.stopPropagation()
                    onComplete()
                 }}
                 className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all active:scale-95
                    ${isCompleted 
                       ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                       : 'bg-transparent border-neutral-200 text-neutral-700 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50'
                    }
                 `}
              >
                 <CheckCircle2 className={`w-6 h-6 ${isCompleted ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`} />
              </button>
           </div>
           
           {/* Description */}
           <p className={`text-sm md:text-base font-medium leading-relaxed mb-8 line-clamp-2
              ${isCompleted ? 'text-neutral-600' : 'text-neutral-700'}
           `}>
              {activity.description}
           </p>

           {/* Footer Metrics */}
           <div className="mt-auto flex items-center justify-between pt-6 border-t border-neutral-100">
              <div className="flex flex-wrap gap-2">
                 <div className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border
                    ${isCompleted ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-neutral-50 border-neutral-200 text-neutral-600'}
                 `}>
                    <ShieldAlert className="w-3 h-3" />
                    {statusInfo.label}
                 </div>
                 
                 {activity.duration_minutes > 0 && (
                    <div className="px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 text-[10px] font-bold uppercase tracking-widest text-neutral-700 flex items-center gap-1.5">
                       <Clock className="w-3 h-3" />
                       {activity.duration_minutes} Menit
                    </div>
                 )}
              </div>
              
              <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-600 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                 <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
           </div>

        </div>
        
        {/* Subtle Progress Indication if In Progress */}
        {status === 'in_progress' && (
           <div className="absolute bottom-0 left-0 h-1 bg-primary-500 w-1/3" />
        )}
      </div>
    </motion.div>
  )
})

ActivityCard.displayName = 'ActivityCard'
