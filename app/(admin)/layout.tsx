'use client'

import { ReactNode } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'

export default function AdminLayout({ children }: { children: ReactNode }) {
  useProtectedRoute(['admin'])

  return (
    <div className="min-h-screen font-sans" style={{ background: 'var(--neutral-50)', color: 'var(--neutral-700)' }}>
      <AdminSidebar />
      <div className="lg:ml-64 min-h-screen transition-all duration-300 relative">
        <main className="p-0 relative z-10">
          {children}
        </main>
      </div>
    </div>
  )
}
