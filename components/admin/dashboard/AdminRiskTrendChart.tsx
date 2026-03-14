'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { ArrowUpRight, TrendingUp, Activity } from 'lucide-react'

const mockRiskTrend = [
  { month: 'JAN', risk: 42 },
  { month: 'FEB', risk: 38 },
  { month: 'MAR', risk: 35 },
  { month: 'APR', risk: 45 },
  { month: 'MAY', risk: 28 },
  { month: 'JUN', risk: 25 },
]

export function AdminRiskTrendChart() {
  return (
    <Card className="p-6 rounded-2xl shadow-sm h-full" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
       <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <Activity className="w-3.5 h-3.5" style={{ color: 'var(--success)' }} />
             <span className="text-[10px] font-bold uppercase tracking-wider font-heading" style={{ color: 'var(--success)' }}>Analisis Tren</span>
          </div>
          <h3 className="text-lg font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>
            Indeks Risiko
          </h3>
          <p className="text-xs font-body mt-1" style={{ color: 'var(--neutral-500)' }}>Rata-rata risiko platform (6 bulan)</p>
        </div>
        <button className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{ background: 'var(--neutral-100)', color: 'var(--neutral-500)' }}>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="h-[240px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockRiskTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1A56DB" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#1A56DB" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} vertical={false} />
            <XAxis 
              dataKey="month" 
              fontSize={10} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontWeight: '600' }}
              dy={10}
            />
            <YAxis 
              fontSize={10} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontWeight: '600' }}
              dx={-5}
            />
            <Tooltip 
              contentStyle={{ 
                background: '#fff', 
                border: '1px solid #E5E7EB', 
                borderRadius: '12px', 
                color: '#111827', 
                fontSize: '12px', 
                fontWeight: '600',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
              }}
              cursor={{ stroke: '#1A56DB', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="risk"
              stroke="#1A56DB"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRisk)"
              activeDot={{ r: 5, fill: '#1A56DB', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--neutral-100)' }}>
         <div className="flex gap-4">
            <div className="flex flex-col">
               <span className="text-[10px] font-bold uppercase tracking-wider font-heading" style={{ color: 'var(--neutral-400)' }}>Penurunan</span>
               <span className="text-sm font-bold" style={{ color: 'var(--success)' }}>-12.4%</span>
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] font-bold uppercase tracking-wider font-heading" style={{ color: 'var(--neutral-400)' }}>Stabilitas</span>
               <span className="text-sm font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>Tinggi</span>
            </div>
         </div>
         <TrendingUp className="w-5 h-5" style={{ color: 'var(--neutral-300)' }} />
      </div>
    </Card>
  )
}
