'use client'

import { ReactNode } from 'react'
import { TopNavbar } from '@/components/layout/top-navbar'
import dynamic from 'next/dynamic'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'

const AiChatFloating = dynamic(
  () => import('@/components/ai-chat-floating').then(mod => mod.AiChatFloating),
  { ssr: false }
)

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { loading } = useProtectedRoute(['user'])

  return (
    <div className="min-h-screen bg-slate-50 font-body selection:bg-primary-300 selection:text-white">
      <TopNavbar />
      {/* 
        For desktop, we add enough top padding so content clears the floating nav.
        For mobile, we clear the fixed 64px top nav.
      */}
      <div className="flex flex-col min-h-screen relative pt-16 lg:pt-28">
        <main className="flex-[1_1_100%] w-full max-w-none px-0 pb-12 md:pb-24">
          {children}
        </main>
        <AiChatFloating />
        
        {/* Soft elegant background glow for the whole user layout */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden flex justify-center">
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full blur-[140px] opacity-40 bg-gradient-to-br from-primary-100 to-sky-100 mix-blend-multiply" />
            <div className="absolute -bottom-32 -left-32 w-[60vw] h-[60vw] rounded-full blur-[160px] opacity-30 bg-gradient-to-tr from-sky-50 to-primary-50 mix-blend-multiply" />
        </div>
      </div>
    </div>
  )
}
