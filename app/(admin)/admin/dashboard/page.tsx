'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { AdminMetricsGrid } from '@/components/admin/dashboard/AdminMetricsGrid'
import { AdminRiskDistributionChart } from '@/components/admin/dashboard/AdminRiskDistributionChart'
import { PendingApprovalList } from '@/components/admin/dashboard/PendingApprovalList'
import { RecentActivityList } from '@/components/admin/dashboard/RecentActivityList'
import { useAdminContext } from '@/components/providers/Providers'
import { motion } from 'framer-motion'
import { Activity, ShieldAlert, Zap } from 'lucide-react'

export default function AdminDashboardPage() {
  const adminContext = useAdminContext()
  const stats = adminContext?.stats || {
    totalUsers: 0,
    totalDoctors: 0,
    pendingVerifications: 0,
    totalEducation: 0,
    totalRoadmap: 0,
  }
  const loading = adminContext?.loading

  if (loading && !adminContext?.stats) {
    return (
       <div className="p-8 min-h-screen" style={{ background: 'var(--neutral-50)' }}>
          <Skeleton className="w-full h-[800px] rounded-2xl" style={{ background: 'var(--neutral-200)' }} />
       </div>
    )
  }

  return (
    <div className="p-6 md:p-8 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
         <div>
            <h1 className="text-2xl font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>Dashboard Admin</h1>
            <p className="text-sm font-body mt-1" style={{ color: 'var(--neutral-500)' }}>Pantau keseluruhan sistem Glunova Health.</p>
         </div>

         <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
               <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--success)' }} />
               <span className="text-xs font-semibold font-body" style={{ color: 'var(--neutral-700)' }}>Sistem aktif</span>
            </div>
            <button className="h-10 px-5 rounded-xl text-white font-bold text-sm transition-all flex items-center gap-2 font-heading"
                    style={{ background: 'var(--primary-700)' }}>
               <Zap className="w-4 h-4" /> Audit Sistem
            </button>
         </div>
      </div>

      <motion.div 
         initial={{ opacity: 0, y: 20 }} 
         animate={{ opacity: 1, y: 0 }}
         className="space-y-6"
      >
         {/* Metrics Grid */}
         <AdminMetricsGrid stats={stats} />

         {/* Insights Grid */}
         <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* Left */}
            <div className="xl:col-span-8 space-y-6">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="rounded-2xl p-6 shadow-sm" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
                     <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold font-heading flex items-center gap-2" style={{ color: 'var(--neutral-900)' }}>
                           <ShieldAlert className="w-4 h-4" style={{ color: 'var(--warning)' }} /> Distribusi Risiko
                        </h3>
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full font-body" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-500)' }}>Live</span>
                     </div>
                     <AdminRiskDistributionChart />
                  </div>
                  
                  <div className="rounded-2xl p-6 shadow-sm" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
                     <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold font-heading flex items-center gap-2" style={{ color: 'var(--neutral-900)' }}>
                           <Activity className="w-4 h-4" style={{ color: 'var(--primary-700)' }} /> Menunggu Verifikasi
                        </h3>
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full font-body" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}>Prioritas</span>
                     </div>
                     <PendingApprovalList />
                  </div>
               </div>
            </div>

            {/* Right */}
            <div className="xl:col-span-4">
               <div className="rounded-2xl p-6 h-full shadow-sm" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="text-sm font-bold font-heading flex items-center gap-2" style={{ color: 'var(--neutral-900)' }}>
                        <Zap className="w-4 h-4" style={{ color: 'var(--primary-700)' }} /> Aktivitas Terbaru
                     </h3>
                     <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--primary-700)' }} />
                  </div>
                  <RecentActivityList />
               </div>
            </div>

         </div>
      </motion.div>

    </div>
  )
}
