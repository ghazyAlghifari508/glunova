'use client'

import React, { useState } from 'react'
import { DoctorSidebar } from '@/components/doctor/layout/DoctorSidebar'
import { DoctorMobileHeader } from '@/components/doctor/layout/DoctorMobileHeader'
import { useCheckDoctorApproval } from '@/hooks/useCheckDoctorApproval'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'

export default function DoctorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { loading } = useProtectedRoute(['doctor'])
  const { checking } = useCheckDoctorApproval()

  const [isCollapsed, setIsCollapsed] = useState(false)

  // Only show the full-page loading spinner on initial load (when no user is present yet).
  // Once we have a user, we allow the layout to render so navigation is instant.
  if (loading && !checking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary-100 border-t-primary-600 animate-spin" />
          <p className="text-sm font-bold text-neutral-400 animate-pulse uppercase tracking-widest">Memuat Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <DoctorSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <DoctorMobileHeader />
      <div className={`${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'} min-h-screen transition-all duration-300 pt-16 lg:pt-0`}>
        <main className="p-0">
          {children}
        </main>
      </div>
    </div>
  )
}
