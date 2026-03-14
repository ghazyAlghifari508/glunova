'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { usePathname } from 'next/navigation'
import {
  History as HistoryIcon,
  LogOut,
  LayoutDashboard,
  Route,
  Camera,
  BookOpen,
  Stethoscope,
  User,
  Menu,
  Activity,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUserRole } from '@/hooks/useUserRole'
import { supabase } from '@/lib/supabase'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  icon?: React.ElementType
}

const dashboardNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Route, label: 'Roadmap', href: '/roadmap' },
  { icon: Camera, label: 'Vision', href: '/vision' },
  { icon: BookOpen, label: 'Edukasi', href: '/education' },
  { icon: Stethoscope, label: 'Booking', href: '/konsultasi-dokter' },
]

const landingNavItems: NavItem[] = [
  { label: 'Layanan', href: '/#services' },
  { label: 'Statistik', href: '/#stats' },
  { label: 'Cara Kerja', href: '/#how-it-works' },
  { label: 'Testimoni', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
]

export function TopNavbar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const { role } = useUserRole()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (!mounted) return null

  // Determination for dashboard area logic
  const dashboardPaths = ['/dashboard', '/roadmap', '/vision', '/konsultasi-dokter', '/education', '/profile', '/riwayat-transaksi']
  const isDashboardArea = dashboardPaths.some(path => pathname.startsWith(path))
  
  // Specific check for full-screen application views like Chat
  // We want to detect /konsultasi-dokter/[id] but NOT /konsultasi-dokter itself
  const isChatRoom = pathname.startsWith('/konsultasi-dokter/')
  
  // Decide which items to show based on context
  const activeNavItems = isDashboardArea ? dashboardNavItems : landingNavItems

  return (
    <>
      {/* Desktop Floating Nav */}
      <div className={cn(
        "fixed z-50 w-full transition-all duration-300 hidden lg:block",
        isChatRoom 
          ? "top-0 left-0 px-0 max-w-none" 
          : "top-6 inset-x-0 mx-auto max-w-6xl px-4"
      )}>
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "relative grid grid-cols-[1fr_auto_1fr] items-center gap-8 px-10 py-3 transition-all duration-300",
            isChatRoom 
              ? "rounded-none border-b border-neutral-200 bg-white/95 backdrop-blur-xl shadow-sm" 
              : cn(
                  "rounded-2xl shadow-xl",
                  scrolled 
                    ? "backdrop-blur-xl bg-white/80 shadow-[0_8px_32px_rgba(13,43,107,0.12)] border border-white/50" 
                    : "bg-white border border-neutral-100"
                )
          )}
        >
          {/* Left: Logo */}
          <div className="flex items-center z-20">
            <Link 
              href={
                role === 'doctor_pending' 
                  ? "/register-doctor/pending" 
                  : user ? "/dashboard" : "/"
              } 
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 shadow-md transition-transform group-hover:scale-105">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-heading font-extrabold text-neutral-900 tracking-tight">
                Glunova
              </span>
            </Link>
          </div>

          {/* Center: Navigation Items (Flexible Center) */}
          <div className="flex justify-center z-10 px-6">
            <div className="flex items-center gap-1 bg-neutral-100/80 p-1.5 rounded-xl border border-neutral-200/50 shadow-inner">
              {activeNavItems.map((item) => {
                const isActive = pathname.startsWith(item.href) || (item.href === '/#home' && pathname === '/')
                const ItemIcon = item.icon as React.ElementType
                
                return (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className="relative group"
                    data-testid={item.label === 'Booking' ? 'nav-booking' : `nav-${item.label.toLowerCase()}`}
                    id={item.label === 'Booking' ? 'nav-booking' : undefined}
                  >
                    <div 
                      aria-label={item.label}
                      className={cn(
                        "relative z-10 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all",
                        isActive ? "text-primary-900" : "text-neutral-500 hover:text-neutral-900"
                      )}
                    >
                      {ItemIcon && <ItemIcon className={cn("w-4 h-4", isActive ? "text-primary-700" : "")} />}
                      <span className="whitespace-nowrap">{item.label}</span>
                    </div>
                    {isActive && (
                      <motion.div 
                        layoutId="nav-pill-unified"
                        className="absolute inset-0 bg-white rounded-lg shadow-sm border border-neutral-200/50 z-0"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-3 z-20">
            {!user ? (
              <Link href="/login">
                <Button className="rounded-xl font-bold px-7 bg-[#1A56DB] hover:bg-[#1546b5] text-white shadow-lg shadow-blue-600/20 transition-all active:scale-95 border-none">
                  Masuk
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                 
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 hover:bg-neutral-50 px-3 py-1.5 rounded-xl transition-colors outline-none border border-transparent hover:border-neutral-200">
                      <div className="flex flex-col text-right">
                        <span className="text-sm font-bold text-neutral-900 leading-none mb-1">
                          {user.user_metadata?.full_name?.split(' ')[0] || 'User'}
                        </span>
                        <span className="text-[10px] font-bold text-primary-700 uppercase tracking-widest leading-none">
                          {role === 'doctor' ? 'Doctor' : role === 'doctor_pending' ? 'Pending' : 'Patient'}
                        </span>
                      </div>
                      <Avatar className="h-10 w-10 rounded-xl border-2 border-primary-100">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-primary-50 text-primary-700 font-bold rounded-xl text-xs">
                          {user.user_metadata?.full_name?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/50 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                    <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                      Pengaturan Akun
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-neutral-100 my-1" />
                    <div className="p-1 space-y-1">
                      <Link href={
                        role === 'doctor' ? '/doctor/profile' : 
                        role === 'doctor_pending' ? '/register-doctor/pending' : 
                        '/profile'
                      }>
                        <DropdownMenuItem className="rounded-xl px-3 py-3 cursor-pointer text-sm font-semibold text-neutral-700 focus:bg-primary-50 focus:text-primary-900">
                          <User className="mr-3 h-4 w-4 text-primary-500" />
                          Profil Saya
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/riwayat-transaksi">
                        <DropdownMenuItem className="rounded-xl px-3 py-3 cursor-pointer text-sm font-semibold text-neutral-700 focus:bg-primary-50 focus:text-primary-900">
                          <HistoryIcon className="mr-3 h-4 w-4 text-primary-500" />
                          Riwayat Transaksi
                        </DropdownMenuItem>
                      </Link>
                    </div>
                    <DropdownMenuSeparator className="bg-neutral-100 my-1" />
                    <div className="p-1">
                      <DropdownMenuItem onClick={handleLogout} className="rounded-xl px-3 py-3 cursor-pointer text-sm font-semibold text-red-600 focus:bg-red-50 focus:text-red-700">
                        <LogOut className="mr-3 h-4 w-4" />
                        Keluar Akun
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </motion.nav>
      </div>

      {/* Mobile Nav */}
      <div className={cn(
        "lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        (scrolled || isChatRoom) ? "bg-white/95 backdrop-blur-xl border-b border-neutral-200/50 shadow-sm" : "bg-white border-b border-transparent"
      )}>
        <div className="flex items-center justify-between px-4 h-16">
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary-700">
              <Activity className="w-[18px] h-[18px] text-white" />
            </div>
            <span className="text-xl font-heading font-extrabold text-neutral-900">
              Glunova
            </span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-neutral-900 hover:bg-neutral-100 rounded-xl">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l border-neutral-200 bg-white p-0">
               {user && (
                 <div className="p-6 border-b border-neutral-100">
                   <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-primary-100">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-primary-50 text-primary-700 font-bold">
                          {user.user_metadata?.full_name?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-neutral-900 leading-tight">
                          {user.user_metadata?.full_name || 'User'}
                        </span>
                        <span className="text-[10px] font-bold text-primary-700 mt-1 uppercase tracking-widest">
                          {role === 'doctor' ? 'Doctor' : 'Patient'}
                        </span>
                      </div>
                   </div>
                 </div>
               )}
               
               <div className="p-4 space-y-1">
                 {activeNavItems.map((item) => {
                    const ItemIcon = item.icon as React.ElementType
                    const isActive = pathname.startsWith(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-bold text-sm",
                          isActive ? "bg-primary-50 text-primary-900" : "text-neutral-600 hover:bg-neutral-50"
                        )}
                      >
                        {ItemIcon && <ItemIcon className="w-5 h-5" />}
                        {item.label}
                      </Link>
                    )
                 })}
                 
                 {user && (
                   <>
                    <DropdownMenuSeparator className="bg-neutral-100 my-2" />
                    <Link href="/profile" className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-neutral-600 font-bold text-sm">
                      <User className="w-5 h-5" /> Profil Saya
                    </Link>
                    <Link href="/riwayat-transaksi" className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-neutral-600 font-bold text-sm">
                      <HistoryIcon className="w-5 h-5" /> Riwayat
                    </Link>
                   </>
                 )}
               </div>

               <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-100 bg-neutral-50">
                 {!user ? (
                   <Link href="/login" className="w-full">
                     <Button className="w-full rounded-xl font-bold h-12 bg-primary-700">
                        Masuk
                     </Button>
                   </Link>
                 ) : (
                   <Button onClick={handleLogout} variant="destructive" className="w-full rounded-xl font-bold h-12 shadow-none">
                      <LogOut className="w-5 h-5 mr-2" />
                      Keluar Akun
                   </Button>
                 )}
               </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  )
}
