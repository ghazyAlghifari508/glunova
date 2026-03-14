'use client'

import { useConsultationTimer } from '@/hooks/useConsultationTimer'
import { Clock } from 'lucide-react'

export function ConsultationTimer({ startedAt, endedAt }: { startedAt?: string; endedAt?: string }) {
  const { formatted, isRunning } = useConsultationTimer(startedAt, endedAt)

  return (
    <div className={`inline-flex items-center gap-3 rounded-xl px-5 py-2 font-mono text-[11px] font-black uppercase tracking-[0.2em] shadow-sm transition-all ${
      isRunning 
        ? 'bg-[color:var(--primary-700)] text-white shadow-[0_10px_20px_rgba(26,86,219,0.2)]' 
        : 'bg-[color:var(--neutral-100)] text-[color:var(--neutral-400)] border border-[color:var(--neutral-200)]'
    }`}>
      <Clock size={14} className={isRunning ? 'animate-pulse text-white' : ''} />
      <span className="tabular-nums italic leading-none">{formatted}</span>
    </div>
  )
}
