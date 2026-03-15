'use client'

import React from 'react'
import { 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts'
import { AlertTriangle, ShieldCheck, Activity } from 'lucide-react'

const riskDistribution = [
  { name: 'Low Risk', value: 45, color: '#10B981' }, // emerald
  { name: 'Moderate', value: 35, color: '#F59E0B' }, // amber
  { name: 'Critical', value: 20, color: '#F43F5E' }, // rose
]

export function AdminRiskDistributionChart() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-[300px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={riskDistribution}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
              cornerRadius={12}
            >
              {riskDistribution.map((entry, index) => (
                <Cell 
                   key={`cell-${index}`} 
                   fill={entry.color} 
                   className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                 background: 'var(--white)', 
                 border: '1px solid var(--neutral-200)', 
                 borderRadius: '16px', 
                 color: 'var(--neutral-900)', 
                 fontSize: '10px', 
                 fontWeight: 'black',
                 textTransform: 'uppercase',
                 letterSpacing: '0.1em',
                 boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
              itemStyle={{ color: 'var(--neutral-900)' }}
              cursor={{ fill: 'transparent' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none group">
           <div className="w-24 h-24 rounded-full border border-[color:var(--neutral-100)] flex flex-col items-center justify-center bg-[color:var(--neutral-50)]/50 backdrop-blur-sm shadow-inner">
              <p className="text-[8px] font-black uppercase tracking-widest leading-none mb-1" style={{ color: 'var(--neutral-400)' }}>Status</p>
              <p className="text-xl font-black leading-none" style={{ color: 'var(--neutral-900)' }}>Global</p>
              <div className="flex items-center gap-1 mt-2">
                 <ShieldCheck className="w-3 h-3 text-[color:var(--success)]" />
                 <span className="text-[10px] font-black text-[color:var(--success)]">SECURE</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-8">
        <div className="flex flex-col items-center justify-center py-8 opacity-40">
           <AlertTriangle className="w-8 h-8 text-neutral-300 mb-3" />
           <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Data distribusi risiko belum tersedia</p>
        </div>
      </div>
    </div>
  )
}
