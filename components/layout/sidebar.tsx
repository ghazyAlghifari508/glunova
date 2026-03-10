'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Route,
  Camera,
  Stethoscope,
  BookOpen,
  History as HistoryIcon,
  LogOut,
  Activity,
  ChevronRight,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Route, label: 'Roadmap', href: '/roadmap' },
  { icon: Camera, label: 'Glunova Vision', href: '/vision' },
  { icon: BookOpen, label: 'Edukasi', href: '/education' },
  { icon: Stethoscope, label: 'Konsultasi', href: '/konsultasi-dokter' },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <aside className="hidden lg:flex flex-col w-72 p-4 sticky top-0 h-screen">
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden"
        style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}
      >
        {/* Logo */}
        <div className="px-6 pt-7 pb-4">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--primary-700)' }}
            >
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-heading font-bold"
              style={{ color: 'var(--neutral-900)' }}
            >
              Glunova
            </span>
          </Link>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px" style={{ background: 'var(--neutral-200)' }} />

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: 'var(--neutral-500)' }}
          >
            Menu Utama
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className="group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200"
                  style={{
                    background: isActive ? 'var(--primary-50)' : 'transparent',
                    color: isActive ? 'var(--primary-700)' : 'var(--neutral-500)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        background: isActive ? 'var(--primary-700)' : 'transparent',
                      }}
                    >
                      <item.icon
                        className="w-[18px] h-[18px] transition-colors"
                        style={{ color: isActive ? 'var(--white)' : 'var(--neutral-500)' }}
                      />
                    </div>
                    <span className="text-[13px] font-semibold">{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    >
                      <ChevronRight className="w-4 h-4" style={{ color: 'var(--primary-700)' }} />
                    </motion.div>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-3 pb-3 space-y-1">
          <div className="mx-2 mb-2 h-px" style={{ background: 'var(--neutral-200)' }} />

          <button
            onClick={() => router.push('/riwayat-transaksi')}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-[13px] font-semibold"
            style={{ color: 'var(--neutral-500)' }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <HistoryIcon className="w-[18px] h-[18px]" style={{ color: 'var(--neutral-500)' }} />
            </div>
            Riwayat Transaksi
          </button>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-[13px] font-semibold"
            style={{ color: 'var(--danger)' }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <LogOut className="w-[18px] h-[18px]" style={{ color: 'var(--danger)' }} />
            </div>
            Keluar Akun
          </button>
        </div>

        {/* Status card */}
        <div className="px-4 pb-5">
          <div
            className="p-4 rounded-xl relative overflow-hidden"
            style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-widest mb-2"
              style={{ color: 'var(--primary-700)' }}
            >
              Status Diabetes
            </p>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="flex-1 h-2 rounded-full overflow-hidden"
                style={{ background: 'var(--primary-100)' }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'var(--primary-700)' }}
                />
              </div>
              <span className="text-xs font-bold" style={{ color: 'var(--primary-700)' }}>
                65%
              </span>
            </div>
            <p className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>
              Pantau gula darah Anda secara rutin
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
