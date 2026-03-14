'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, Stethoscope, CalendarDays, MessageSquare, History, LogOut, User, ChevronLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/doctor' },
  { icon: CalendarDays, label: 'Konsultasi', href: '/doctor/consultations' },
  { icon: MessageSquare, label: 'Pesan', href: '/doctor/messages' },
  { icon: History, label: 'Keuangan', href: '/doctor/earnings' },
  { icon: Stethoscope, label: 'Profil Medis', href: '/doctor/profile' },
]

interface DoctorSidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

export function DoctorSidebar({ isCollapsed = false, onToggle }: DoctorSidebarProps) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <div className={cn(
       "h-screen fixed left-0 top-0 flex flex-col z-50 hidden lg:flex transition-all duration-300",
       "bg-white border-r border-slate-100 text-slate-600 shadow-xl shadow-slate-200/50",
       isCollapsed ? "w-20" : "w-64"
    )}>
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-[color:var(--primary-50)] blur-3xl opacity-50 pointer-events-none" />

      {onToggle && (
        <button 
           onClick={onToggle} 
           className="absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center z-50 hover:bg-slate-50 cursor-pointer shadow-md transition-all active:scale-95"
        >
          <ChevronLeft className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-300", isCollapsed && "rotate-180")} />
        </button>
      )}

      {/* Logo Section */}
      <div className={cn("p-6 pt-8 flex items-center relative z-10", isCollapsed ? "justify-center" : "gap-3")}>
        <div className="w-9 h-9 shrink-0 bg-gradient-to-br from-[color:var(--primary-600)] to-[color:var(--primary-800)] rounded-xl flex items-center justify-center shadow-lg shadow-[color:var(--primary-600)]/20 transition-transform hover:scale-105">
          <div className="w-4 h-4 bg-white rounded-[4px] transform rotate-45" />
        </div>
        {!isCollapsed && (
           <span className="text-xl font-black text-slate-900 tracking-tight truncate">
              Glunova<span className="text-[color:var(--primary-700)]">Doc</span>
           </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-8 overflow-y-auto relative z-10 custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/doctor' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} className="block group">
              <div 
                className={cn(
                  "flex items-center rounded-2xl transition-all duration-300",
                  isCollapsed ? "justify-center w-12 h-12 mx-auto" : "gap-3 px-4 py-3.5",
                  isActive 
                    ? "bg-[color:var(--primary-700)] text-white shadow-lg shadow-[color:var(--primary-700)]/20 font-bold" 
                    : "text-slate-500 hover:bg-[color:var(--primary-50)] hover:text-[color:var(--primary-700)] font-semibold"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-[color:var(--primary-700)]")} />
                {!isCollapsed && <span className="text-sm tracking-wide truncate">{item.label}</span>}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User Section (Bottom) */}
      <div className={cn("mt-auto relative z-10 p-6 border-t border-slate-100", isCollapsed && "p-4 flex flex-col items-center")}>
        {!isCollapsed ? (
           <div className="flex items-center gap-3 mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl overflow-hidden relative shrink-0 border border-white bg-white shadow-sm">
                 {user?.user_metadata?.avatar_url ? (
                    <Image src={user.user_metadata.avatar_url} alt="Profile" fill sizes="40px" className="object-cover" unoptimized />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300"><User className="w-5 h-5" /></div>
                 )}
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-sm font-bold text-slate-900 truncate">{user?.user_metadata?.full_name || 'Dokter'}</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-[color:var(--primary-700)] truncate mt-0.5">Verified</p>
              </div>
           </div>
        ) : (
           <div className="w-10 h-10 rounded-xl overflow-hidden relative border border-slate-200 bg-white shadow-sm mb-6">
              {user?.user_metadata?.avatar_url ? (
                 <Image src={user.user_metadata.avatar_url} alt="Profile" fill sizes="40px" className="object-cover" unoptimized />
              ) : (
                 <div className="w-full h-full flex items-center justify-center text-slate-300"><User className="w-5 h-5" /></div>
              )}
           </div>
        )}
        
        <Button 
            variant="ghost" 
            className={cn(
               "w-full bg-transparent hover:bg-rose-500/10 hover:text-rose-400 text-slate-400 transition-colors border-0 h-auto",
               isCollapsed ? "justify-center p-3 rounded-xl" : "justify-start px-4 py-3 rounded-xl"
            )}
            onClick={async () => {
              await signOut()
              window.location.href = '/login'
            }}
            title={isCollapsed ? "Keluar" : undefined}
        >
            <LogOut className={cn("w-5 h-5 shrink-0", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span className="font-bold text-sm">Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}
