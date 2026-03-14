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
        
        {mockActivities.map((activity, idx) => (
          <div key={activity.id} className="flex gap-6 group relative">
            <div className={cn(
               "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-[color:var(--neutral-200)] relative z-10 transition-all group-hover:scale-110",
               activity.bgColor, activity.color
            )}>
               <activity.icon className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0 pt-1">
               <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--neutral-400)' }}>{activity.type}</p>
                  <span className="text-[10px] font-medium" style={{ color: 'var(--neutral-400)' }}>{activity.time}</span>
               </div>
               <h4 className="text-sm font-bold transition-colors leading-tight" style={{ color: 'var(--neutral-900)' }}>
                  {activity.title}
               </h4>
               <div className="w-full h-[1px] bg-[color:var(--neutral-100)] mt-4 group-last:hidden" />
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-10 h-14 bg-[color:var(--neutral-50)] hover:bg-[color:var(--neutral-100)] text-[color:var(--primary-700)] font-bold text-[10px] uppercase tracking-[0.2em] rounded-2xl border border-[color:var(--neutral-200)] transition-all active:scale-95 shadow-sm">
        Audit Log Sistem
      </button>
    </div>
  )
}
