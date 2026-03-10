'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { TopNavbar } from '@/components/layout/top-navbar'
import dynamic from 'next/dynamic'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'

const AiChatFloating = dynamic(
  () => import('@/components/ai-chat-floating').then(mod => mod.AiChatFloating),
  { ssr: false }
)

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { loading } = useProtectedRoute(['user'])
  const pathname = usePathname()
  const isReplicaDashboard =
    pathname === '/dashboard' ||
    pathname === '/roadmap' ||
    pathname === '/vision' ||
    pathname === '/profile' ||
    pathname.startsWith('/education') ||
    pathname.startsWith('/konsultasi-dokter') ||
    pathname.startsWith('/booking') ||
    pathname.startsWith('/doctors') ||
    pathname === '/riwayat-transaksi'

  return (
    <div className="min-h-screen" style={{ background: 'var(--neutral-50)' }}>
      <TopNavbar />
      <div className="flex flex-col min-h-screen relative pt-16">
        <main className={isReplicaDashboard
          ? 'flex-1 w-full px-0 py-0'
          : 'flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}
        >
          {children}
        </main>
        <AiChatFloating />

        {/* Ambient background */}
        {!isReplicaDashboard && (
          <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            <div
              className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse"
              style={{ background: 'rgba(26,86,219,0.03)' }}
            />
            <div
              className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] animate-pulse"
              style={{ background: 'rgba(63,131,248,0.03)' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
