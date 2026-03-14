'use client'

import React from 'react'
import { Search, Bell, Calendar, Menu, LayoutDashboard, Stethoscope, BookOpen, Route, ShieldAlert, User, LogOut, Globe } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'

interface AdminTopHeaderProps {
  title?: string
  showSearch?: boolean
}

const adminMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Stethoscope, label: 'Verifikasi Dokter', href: '/admin/doctor-approvals' },
  { icon: BookOpen, label: 'Kelola Edukasi', href: '/admin/education' },
  { icon: Route, label: 'Kelola Roadmap', href: '/admin/roadmap' },
]

export function AdminTopHeader({ title, showSearch = true }: AdminTopHeaderProps) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden w-11 h-11 rounded-xl flex items-center justify-center transition-all"
                    style={{ background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', color: 'var(--neutral-600)' }}>
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0" style={{ background: 'var(--white)', borderRight: '1px solid var(--neutral-200)' }}>
            <SheetHeader className="p-8 pb-6 flex flex-row items-center gap-3 space-y-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-700)' }}>
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <SheetTitle className="text-xl font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>
                Glunova <span style={{ color: 'var(--primary-700)' }}>Admin</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="px-4 space-y-1 mt-4">
              {adminMenuItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
                return (
                  <Link key={item.href} href={item.href} className="block">
                    <div 
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold font-heading"
                      style={{
                        background: isActive ? 'var(--primary-50)' : 'transparent',
                        color: isActive ? 'var(--primary-700)' : 'var(--neutral-600)',
                      }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: isActive ? 'var(--primary-700)' : 'var(--neutral-400)' }} />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-6" style={{ borderTop: '1px solid var(--neutral-200)' }}>
              <div className="p-3 rounded-xl flex items-center gap-3 mb-4" style={{ background: 'var(--neutral-50)' }}>
                 <div className="w-10 h-10 rounded-xl overflow-hidden relative shrink-0" style={{ background: 'var(--primary-100)', border: '1px solid var(--primary-200)' }}>
                   {user?.user_metadata?.avatar_url ? (
                      <Image src={user.user_metadata.avatar_url} alt="Admin" fill className="object-cover" unoptimized />
                   ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-5 h-5" style={{ color: 'var(--primary-700)' }} />
                      </div>
                   )}
                 </div>
                 <div className="flex-1 min-w-0">
                   <p className="text-sm font-bold truncate font-heading" style={{ color: 'var(--neutral-900)' }}>{user?.user_metadata?.full_name || 'Admin'}</p>
                   <p className="text-[10px] font-semibold font-body" style={{ color: 'var(--primary-700)' }}>Administrator</p>
                 </div>
              </div>
              
              <button 
                  className="w-full h-10 flex items-center justify-center gap-2 text-sm font-semibold rounded-xl transition-all font-heading"
                  style={{ color: 'var(--danger)' }}
                  onClick={async () => {
                    await signOut()
                    window.location.href = '/login'
                  }}
              >
                  <LogOut className="w-4 h-4" /> Keluar
              </button>
            </div>
          </SheetContent>
        </Sheet>
        
        <div>
           <h1 className="text-2xl font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>{title || 'Dashboard Admin'}</h1>
           <p className="text-sm font-body" style={{ color: 'var(--neutral-500)' }}>{currentDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
         <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                 style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)', color: 'var(--neutral-500)' }}>
            <Bell className="w-5 h-5" />
         </button>
         <button className="h-10 px-5 text-white font-bold text-sm rounded-xl transition-all font-heading flex items-center gap-2"
                 style={{ background: 'var(--primary-700)' }}>
            Export Data
         </button>
      </div>
    </div>
  )
}
