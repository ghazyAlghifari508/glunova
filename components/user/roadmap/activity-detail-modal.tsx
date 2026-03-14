'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Clock,
  Calendar,
  Lightbulb,
  CheckCircle2,
  Loader2,
  HeartPulse,
  ShieldAlert,
  Zap,
  ListChecks,
  Activity
} from 'lucide-react'

interface RoadmapActivity {
  id: string
  activity_name: string
  category: string
  description: string
  benefits: string[]
  difficulty_level: number
  min_level: number
  max_level: number
  duration_minutes: number
  frequency_per_week: number
  instructions: string[]
  tips: string | null
  warnings: string | null
  icon_name: string
}

interface ActivityDetailModalProps {
  activity: RoadmapActivity | null
  isOpen: boolean
  onClose: () => void
  onComplete: (activityId: string) => Promise<void>
  status: 'not_started' | 'in_progress' | 'completed'
  isLoading?: boolean
}

const difficultyConfig = {
  1: { label: 'Ringan', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  2: { label: 'Sedang', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  3: { label: 'Menengah', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  4: { label: 'Intensif', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  5: { label: 'Ketat', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
}

const defaultDifficulty = { label: 'Standar', bg: 'bg-neutral-50', text: 'text-neutral-700', border: 'border-neutral-200' }

export function ActivityDetailModal({ activity, isOpen, onClose, onComplete, status, isLoading }: ActivityDetailModalProps) {
  if (!activity) return null

  const difficulty = difficultyConfig[activity.difficulty_level as keyof typeof difficultyConfig] || defaultDifficulty

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 bottom-4 top-16 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-[5vh] md:bottom-[5vh] md:w-[640px] z-[101] bg-white rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-neutral-100"
          >
            {/* Header Area */}
            <div className="relative px-8 pt-10 pb-8 bg-neutral-900 text-white shrink-0">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px] pointer-events-none" />
               
               <button
                 onClick={onClose}
                 className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-md z-50"
               >
                 <X className="w-5 h-5 text-white/70" />
               </button>

               <div className="flex flex-wrap items-center gap-3 mb-6 relative z-10">
                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 text-white border border-white/20 backdrop-blur-md`}>
                   Intensitas: {difficulty.label}
                 </span>
                 <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 text-white border border-white/20 backdrop-blur-md">
                   Fase Terapi {activity.min_level === activity.max_level ? activity.min_level : `${activity.min_level}-${activity.max_level}`}
                 </span>
               </div>

               <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight mb-4 relative z-10 leading-[1.1]">
                 {activity.activity_name}
               </h2>
               <p className="text-white/60 font-medium text-sm md:text-base leading-relaxed relative z-10 max-w-[90%]">
                 {activity.description}
               </p>

               <div className="flex flex-wrap items-center gap-4 mt-8 relative z-10">
                 {activity.duration_minutes > 0 && (
                   <div className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-4 py-2">
                     <Clock className="w-4 h-4 text-primary-400" />
                     <span className="text-xs font-bold text-white uppercase tracking-wider">{activity.duration_minutes} Menit</span>
                   </div>
                 )}
                 {activity.frequency_per_week > 0 && (
                   <div className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-4 py-2">
                     <Calendar className="w-4 h-4 text-emerald-400" />
                     <span className="text-xs font-bold text-white uppercase tracking-wider">{activity.frequency_per_week}x Seminggu</span>
                   </div>
                 )}
               </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10 bg-neutral-50/50">
               
               {/* Benefits */}
               {activity.benefits && activity.benefits.length > 0 && (
                 <div>
                   <div className="flex items-center gap-3 mb-5">
                     <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center">
                       <HeartPulse className="w-5 h-5 text-emerald-600" />
                     </div>
                     <h3 className="text-xl font-heading font-black text-neutral-900">Manfaat Klinis</h3>
                   </div>
                   <div className="grid gap-3">
                     {activity.benefits.map((benefit, i) => (
                       <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-100 shadow-sm">
                         <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                         </div>
                         <span className="text-sm font-medium text-neutral-700 leading-relaxed">{benefit}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               {/* Instructions */}
               {activity.instructions && activity.instructions.length > 0 && (
                 <div>
                   <div className="flex items-center gap-3 mb-5">
                     <div className="w-10 h-10 rounded-2xl bg-primary-100 flex items-center justify-center">
                       <ListChecks className="w-5 h-5 text-primary-600" />
                     </div>
                     <h3 className="text-xl font-heading font-black text-neutral-900">Protokol Pelaksanaan</h3>
                   </div>
                   <div className="space-y-4 relative">
                     <div className="absolute left-[1.125rem] top-6 bottom-6 w-px bg-neutral-200" />
                     {activity.instructions.map((step, i) => (
                       <div key={i} className="flex items-start gap-5 relative z-10">
                         <div className="w-10 h-10 rounded-2xl bg-white border-2 border-neutral-100 flex items-center justify-center shrink-0 shadow-sm">
                           <span className="text-xs font-black text-primary-600">{i + 1}</span>
                         </div>
                         <div className="pt-2">
                            <p className="text-sm font-medium text-neutral-600 leading-relaxed">{step}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               {/* Tips & Warnings */}
               <div className="grid gap-4 md:grid-cols-2">
                 {activity.tips && (
                   <div className="p-5 rounded-3xl bg-amber-50 border border-amber-100">
                     <div className="flex items-center gap-2 mb-3">
                       <Lightbulb className="w-5 h-5 text-amber-600" />
                       <h3 className="font-black text-amber-900">Health Tips</h3>
                     </div>
                     <p className="text-sm font-medium text-amber-800/80 leading-relaxed">{activity.tips}</p>
                   </div>
                 )}
                 {activity.warnings && (
                   <div className="p-5 rounded-3xl bg-rose-50 border border-rose-100">
                     <div className="flex items-center gap-2 mb-3">
                       <ShieldAlert className="w-5 h-5 text-rose-600" />
                       <h3 className="font-black text-rose-900">Perhatian</h3>
                     </div>
                     <p className="text-sm font-medium text-rose-800/80 leading-relaxed">{activity.warnings}</p>
                   </div>
                 )}
               </div>
            </div>

            {/* Actions */}
            <div className="px-8 py-6 border-t border-neutral-100 text-center shrink-0 bg-white">
              {status === 'completed' ? (
                <div className="flex flex-col items-center justify-center gap-2">
                   <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                   </div>
                   <h4 className="text-lg font-black text-neutral-900">Aktivitas Selesai</h4>
                   <p className="text-sm font-medium text-neutral-500">Anda telah menyelesaikan protokol ini.</p>
                </div>
              ) : (
                <button
                  onClick={() => onComplete(activity.id)}
                  disabled={isLoading}
                  className="w-full h-16 rounded-2xl bg-primary-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-primary-600/20 hover:bg-primary-500 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : status === 'in_progress' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" /> Tandai Selesai
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5" /> Mulai Aktivitas Sekarang
                    </>
                  )}
                </button>
              )}
            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
