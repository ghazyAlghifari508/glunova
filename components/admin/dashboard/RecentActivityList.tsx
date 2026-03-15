'use client'

import React from 'react'
import { Clock, Activity, BookOpen, AlertCircle, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const mockActivities = [
  {
    id: 1,
    type: 'system',
    title: 'Database Sync Completed',
    time: '4m ago',
    icon: Activity,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    id: 2,
    type: 'content',
    title: 'New Care Plan: Nutrition Alpha',
    time: '1h ago',
    icon: BookOpen,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 3,
    type: 'alert',
    title: 'Identity Verification Spike',
    time: '3h ago',
    icon: AlertCircle,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    id: 4,
    type: 'user',
    title: 'Unauthorized Node Access blocked',
    time: '6h ago',
    icon: Zap,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
  },
]

export function RecentActivityList() {
  return (
    <div className="h-full flex flex-col">
      <div className="space-y-6 relative z-10 flex-1">
        {/* Modern Timeline Vertical */}
        <div className="absolute left-6 top-8 bottom-8 w-px bg-[color:var(--neutral-100)]" />
        
        <div className="flex-1 flex flex-col items-center justify-center py-20 opacity-40">
           <Activity className="w-12 h-12 text-neutral-300 mb-4" />
           <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Belum ada aktivitas baru</p>
        </div>
      </div>
      
      <button className="w-full mt-10 h-14 bg-[color:var(--neutral-50)] hover:bg-[color:var(--neutral-100)] text-[color:var(--primary-700)] font-bold text-[10px] uppercase tracking-[0.2em] rounded-2xl border border-[color:var(--neutral-200)] transition-all active:scale-95 shadow-sm">
        Audit Log Sistem
      </button>
    </div>
  )
}
