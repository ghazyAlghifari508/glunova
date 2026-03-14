'use client'

import React from 'react'
import { 
  Users, 
  Stethoscope, 
  Clock, 
  BookOpen,
  ArrowUpRight,
  Activity
} from 'lucide-react'
import type { DashboardStats } from '@/services/adminService'
import { motion } from 'framer-motion'

interface AdminStatCardProps {
  title: string
  value: string | number
  icon: any
  desc: string
  trend: string
  color: 'primary' | 'success' | 'info' | 'danger'
}

const colorMap = {
  primary: { bg: 'var(--primary-50)', icon: 'var(--primary-700)', border: 'var(--primary-100)' },
  success: { bg: 'rgba(16,185,129,0.08)', icon: 'var(--success)', border: 'rgba(16,185,129,0.15)' },
  info: { bg: 'rgba(59,130,246,0.08)', icon: '#3B82F6', border: 'rgba(59,130,246,0.15)' },
  danger: { bg: 'rgba(239,68,68,0.08)', icon: 'var(--danger)', border: 'rgba(239,68,68,0.15)' },
}

const AdminStatCard = ({ title, value, icon: Icon, desc, trend, color }: AdminStatCardProps) => {
   const c = colorMap[color]
   return (
      <motion.div 
         whileHover={{ y: -3 }}
         className="p-6 rounded-2xl shadow-sm transition-all"
         style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}
      >
         <div className="flex justify-between items-start mb-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
               <Icon className="w-6 h-6" style={{ color: c.icon }} />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg" style={{ background: c.bg }}>
               <ArrowUpRight className="w-3 h-3" style={{ color: c.icon }} />
               <span className="text-[10px] font-bold" style={{ color: c.icon }}>{trend}</span>
            </div>
         </div>

         <div>
            <p className="text-[11px] font-bold uppercase tracking-wider mb-1.5 font-heading" style={{ color: 'var(--neutral-400)' }}>{title}</p>
            <h3 className="text-3xl font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>{value}</h3>
            
            <div className="flex items-center gap-2 pt-4 mt-4" style={{ borderTop: '1px solid var(--neutral-100)' }}>
               <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.icon }} />
               <p className="text-[10px] font-semibold font-body" style={{ color: 'var(--neutral-400)' }}>{desc}</p>
            </div>
         </div>
      </motion.div>
   )
}

export const AdminMetricsGrid = ({ stats }: { stats: DashboardStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <AdminStatCard 
         title="Total Pasien" 
         value={stats.totalUsers || 0} 
         icon={Users} 
         desc="Tersinkronisasi" 
         trend="+12.5%" 
         color="primary" 
      />
      <AdminStatCard 
         title="Dokter Terverifikasi" 
         value={stats.totalDoctors || 0} 
         icon={Stethoscope} 
         desc="Lisensi aktif" 
         trend="+4.2%" 
         color="success" 
      />
      <AdminStatCard 
         title="Menunggu Verifikasi" 
         value={stats.pendingVerifications || 0} 
         icon={Clock} 
         desc="Butuh tindakan" 
         trend="Kritis" 
         color="danger" 
      />
      <AdminStatCard 
         title="Konten Edukasi" 
         value={stats.totalRoadmap + stats.totalEducation || 0} 
         icon={Activity} 
         desc="Roadmap & Edukasi" 
         trend="Stabil" 
         color="info" 
      />
    </div>
  )
}
