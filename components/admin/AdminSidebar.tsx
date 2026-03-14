'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Stethoscope, 
  BookOpen, 
  Route, 
  LogOut,
  User,
  ShieldCheck,
  Activity,
  Globe,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', desc: 'Metrik Sistem' },
  { icon: Stethoscope, label: 'Verifikasi Dokter', href: '/admin/doctor-approvals', desc: 'Persetujuan Akun' },
  { icon: BookOpen, label: 'Kelola Edukasi', href: '/admin/education', desc: 'Content CMS' },
  { icon: Route, label: 'Kelola Roadmap', href: '/admin/roadmap', desc: 'Progres Pasien' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <div className="w-64 h-screen fixed left-0 top-0 flex flex-col z-50 hidden lg:flex overflow-hidden font-sans"
         style={{ background: 'var(--white)', borderRight: '1px solid var(--neutral-200)' }}>
      
      {/* Header */}
      <div className="p-6 pb-8">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-700)' }}>
               <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
               <span className="text-base font-bold font-heading block leading-none" style={{ color: 'var(--neutral-900)' }}>Glunova</span>
               <span className="text-[10px] font-bold uppercase tracking-wider font-heading" style={{ color: 'var(--primary-700)' }}>Admin Panel</span>
            </div>
         </div>
      </div>

      {/* Status */}
      <div className="px-5 mb-6">
         <div className="rounded-xl p-3.5" style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
            <div className="flex items-center justify-between mb-1.5">
               <span className="text-[10px] font-bold uppercase tracking-wider font-heading" style={{ color: 'var(--primary-700)' }}>Status Sistem</span>
               <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--success)' }} />
            </div>
            <div className="flex items-center gap-2">
               <Activity className="w-3 h-3" style={{ color: 'var(--primary-500)' }} />
               <span className="text-[11px] font-semibold font-body" style={{ color: 'var(--primary-700)' }}>Semua sistem aktif</span>
            </div>
         </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider mb-3 font-heading" style={{ color: 'var(--neutral-400)' }}>Menu Utama</p>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} className="block group">
              <div 
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                )}
                style={{
                  background: isActive ? 'var(--primary-50)' : 'transparent',
                  color: isActive ? 'var(--primary-700)' : 'var(--neutral-500)',
                }}
              >
                <item.icon className="w-5 h-5 shrink-0" style={{ color: isActive ? 'var(--primary-700)' : 'var(--neutral-400)' }} />
                <div className="min-w-0">
                   <p className="text-sm font-semibold leading-none mb-0.5 font-heading">{item.label}</p>
                   <p className="text-[10px] font-body" style={{ color: isActive ? 'var(--primary-500)' : 'var(--neutral-400)' }}>{item.desc}</p>
                </div>
                {isActive && <div className="ml-auto w-1 h-5 rounded-full" style={{ background: 'var(--primary-700)' }} />}
              </div>
            </Link>
          )
        })}

        <div className="pt-6">
           <p className="px-3 text-[10px] font-bold uppercase tracking-wider mb-3 font-heading" style={{ color: 'var(--neutral-400)' }}>Lainnya</p>
           <button className="flex items-center gap-3 px-3 py-3 w-full transition-all text-left rounded-xl" style={{ color: 'var(--neutral-500)' }}>
              <Globe className="w-5 h-5" style={{ color: 'var(--neutral-400)' }} />
              <span className="text-sm font-semibold font-heading">Ke Website</span>
           </button>
           <button className="flex items-center gap-3 px-3 py-3 w-full transition-all text-left rounded-xl" style={{ color: 'var(--neutral-500)' }}>
              <Settings className="w-5 h-5" style={{ color: 'var(--neutral-400)' }} />
              <span className="text-sm font-semibold font-heading">Pengaturan</span>
           </button>
        </div>
      </nav>

      {/* Admin Identity (Bottom) */}
      <div className="p-4 mt-auto" style={{ borderTop: '1px solid var(--neutral-200)' }}>
        <div className="p-3 rounded-xl flex items-center gap-3" style={{ background: 'var(--neutral-50)' }}>
           <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--primary-100)' }}>
               <User className="w-5 h-5" style={{ color: 'var(--primary-700)' }} />
           </div>
           <div className="flex-1 min-w-0">
             <p className="text-xs font-bold truncate leading-none mb-0.5 font-heading" style={{ color: 'var(--neutral-900)' }}>
               {user?.user_metadata?.full_name || 'Admin'}
             </p>
             <p className="text-[10px] font-semibold font-body" style={{ color: 'var(--primary-700)' }}>Administrator</p>
           </div>
        </div>
        
        <Button 
            variant="ghost" 
            className="w-full mt-2 justify-start px-3 py-2.5 h-auto group rounded-xl"
            style={{ color: 'var(--danger)' }}
            onClick={async () => {
              await signOut()
              window.location.href = '/login'
            }}
        >
            <LogOut className="w-4 h-4 mr-2.5 opacity-70" />
            <span className="font-semibold text-xs font-heading">Keluar</span>
        </Button>
      </div>
    </div>
  )
}
