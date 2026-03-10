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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DoctorRegistrationButton } from '@/components/layout/DoctorRegistrationButton'
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

const dashboardNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Route, label: 'Roadmap', href: '/roadmap' },
  { icon: Camera, label: 'Vision', href: '/vision' },
  { icon: BookOpen, label: 'Edukasi', href: '/education' },
  { icon: Stethoscope, label: 'Konsultasi', href: '/konsultasi-dokter' },
]

const landingNavItems: { label: string; href: string }[] = [
  { label: 'Beranda', href: '/#home' },
  { label: 'Layanan', href: '/#services' },
  { label: 'Statistik', href: '/#stats' },
  { label: 'Tentang', href: '/#about' },
  { label: 'Tim', href: '/#team' },
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
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const dashboardPaths = [
    '/dashboard', '/roadmap', '/vision', '/konsultasi-dokter',
    '/education', '/profile', '/admin', '/booking', '/payment',
    '/doctors', '/riwayat-transaksi'
  ]
  const isDashboardArea = dashboardPaths.some(path => pathname.startsWith(path))
  const activeNavItems = (user || isDashboardArea) ? dashboardNavItems : landingNavItems
  const logoHref = (user || isDashboardArea) ? "/dashboard" : "/"
  const isLanding = !user && !isDashboardArea

  if (!mounted) return null

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isLanding
          ? (scrolled ? 'var(--primary-900)' : 'transparent')
          : 'var(--white)',
        boxShadow: scrolled
          ? (isLanding ? '0 4px 30px rgba(13,43,107,0.3)' : '0 1px 3px rgba(0,0,0,0.06)')
          : 'none',
        borderBottom: !isLanding ? '1px solid var(--neutral-200)' : 'none',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`h-16 flex items-center justify-between ${isDashboardArea ? 'lg:grid lg:grid-cols-[auto_1fr_auto]' : ''}`}>

          {/* Logo */}
          <div className="flex items-center">
            <Link href={logoHref} className="flex items-center gap-2.5 group shrink-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                style={{ background: isLanding ? 'rgba(255,255,255,0.15)' : 'var(--primary-700)' }}
              >
                <Activity className="w-[18px] h-[18px] text-white" />
              </div>
              <span
                className="text-lg font-heading font-bold"
                style={{ color: isLanding ? 'var(--white)' : 'var(--neutral-900)' }}
              >
                Glunova
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-center gap-1">
            {activeNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} className="group relative">
                  <div
                    className="relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all"
                    style={{
                      color: isLanding
                        ? (isActive ? 'var(--white)' : 'rgba(255,255,255,0.7)')
                        : (isActive ? 'var(--primary-700)' : 'var(--neutral-500)'),
                      background: !isLanding && isActive ? 'var(--primary-50)' : 'transparent',
                    }}
                  >
                    <span>{item.label}</span>
                    {isLanding && (
                      <span
                        className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full transform origin-left transition-transform duration-300"
                        style={{
                          background: 'var(--white)',
                          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        }}
                      />
                    )}
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop user actions */}
            <div className="hidden lg:flex items-center gap-3">
              {!user && !isDashboardArea ? (
                <Link href="/login">
                  <Button
                    className="font-semibold rounded-lg px-5 h-9 text-[13px]"
                    style={{ background: 'var(--primary-700)', color: 'var(--white)' }}
                  >
                    Masuk
                  </Button>
                </Link>
              ) : user && (
                <div className="flex items-center gap-3">
                  {role === 'user' && !pathname.includes('/doctor') && (
                    <div className="hidden md:block">
                      <DoctorRegistrationButton isLoggedIn={!!user} userRole={role} />
                    </div>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center hover:opacity-80 transition-all outline-none">
                        <Avatar
                          className="h-9 w-9 border-2 active:scale-95 transition-transform"
                          style={{ borderColor: isLanding ? 'rgba(255,255,255,0.25)' : 'var(--primary-100)' }}
                        >
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback
                            style={{ background: 'var(--primary-100)', color: 'var(--primary-700)' }}
                          >
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-60 mt-3 rounded-xl p-2"
                      style={{
                        background: 'var(--white)',
                        border: '1px solid var(--neutral-200)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                      }}
                      align="end"
                    >
                      <DropdownMenuLabel
                        className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-widest"
                        style={{ color: 'var(--neutral-500)' }}
                      >
                        Akun Saya
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator style={{ background: 'var(--neutral-100)' }} />

                      <div className="space-y-0.5 py-1">
                        <Link href={role === 'doctor' ? '/doctor/profile' : '/profile'}>
                          <DropdownMenuItem
                            className="rounded-lg px-3 py-2.5 cursor-pointer font-medium text-[13px]"
                            style={{ color: 'var(--neutral-700)' }}
                          >
                            <User className="mr-2.5 h-4 w-4" style={{ color: 'var(--primary-500)' }} />
                            Profil
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/riwayat-transaksi">
                          <DropdownMenuItem
                            className="rounded-lg px-3 py-2.5 cursor-pointer font-medium text-[13px]"
                            style={{ color: 'var(--neutral-700)' }}
                          >
                            <HistoryIcon className="mr-2.5 h-4 w-4" style={{ color: 'var(--primary-500)' }} />
                            Riwayat Transaksi
                          </DropdownMenuItem>
                        </Link>
                      </div>

                      <DropdownMenuSeparator style={{ background: 'var(--neutral-100)' }} />

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="rounded-lg px-3 py-2.5 cursor-pointer font-medium text-[13px] mt-0.5"
                        style={{ color: 'var(--danger)' }}
                      >
                        <LogOut className="mr-2.5 h-4 w-4" />
                        Keluar Akun
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>

            {/* Mobile menu */}
            {mounted && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="lg:hidden p-2 rounded-lg"
                    style={{ color: isLanding ? 'var(--white)' : 'var(--neutral-700)' }}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] p-0 overflow-hidden"
                  style={{
                    background: 'var(--white)',
                    borderLeft: '1px solid var(--neutral-200)',
                  }}
                >
                  <SheetHeader className="p-5" style={{ borderBottom: '1px solid var(--neutral-200)' }}>
                    <SheetTitle className="text-left">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: 'var(--primary-700)' }}
                        >
                          <Activity className="w-[18px] h-[18px] text-white" />
                        </div>
                        <span className="text-lg font-heading font-bold"
                          style={{ color: 'var(--neutral-900)' }}
                        >
                          Glunova
                        </span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col py-2">
                    {activeNavItems.map((item) => {
                      const isActive = pathname === item.href
                      const Icon = ('icon' in item ? item.icon : null) as React.ElementType
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 px-5 py-3 transition-colors"
                          style={{
                            background: isActive ? 'var(--primary-50)' : 'transparent',
                            color: isActive ? 'var(--primary-700)' : 'var(--neutral-700)',
                          }}
                        >
                          {Icon && <Icon className="w-5 h-5" />}
                          <span className="font-semibold text-sm">{item.label}</span>
                        </Link>
                      )
                    })}

                    {role === 'user' && !isDashboardArea && (
                      <div className="mt-4 px-5">
                        <DoctorRegistrationButton isLoggedIn={!!user} userRole={role} />
                      </div>
                    )}

                    {!user && !isDashboardArea && (
                      <div className="mt-6 px-5">
                        <Link href="/login" className="w-full">
                          <Button
                            className="w-full font-semibold rounded-lg h-10"
                            style={{ background: 'var(--primary-700)', color: 'var(--white)' }}
                          >
                            Masuk
                          </Button>
                        </Link>
                      </div>
                    )}

                    {user && (
                      <div className="mt-auto p-5" style={{ borderTop: '1px solid var(--neutral-200)' }}>
                        <Link
                          href={role === 'doctor' ? '/doctor/profile' : '/profile'}
                          className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity"
                        >
                          <Avatar className="h-10 w-10" style={{ border: '2px solid var(--primary-100)' }}>
                            <AvatarImage src={user.user_metadata?.avatar_url} />
                            <AvatarFallback
                              style={{ background: 'var(--primary-100)', color: 'var(--primary-700)' }}
                            >
                              {user.email?.[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm truncate max-w-[150px]"
                              style={{ color: 'var(--neutral-900)' }}
                            >
                              {user.user_metadata?.full_name || 'User'}
                            </span>
                            <span className="text-xs truncate max-w-[150px]"
                              style={{ color: 'var(--neutral-500)' }}
                            >
                              {user.email}
                            </span>
                          </div>
                        </Link>

                        <Link
                          href="/riwayat-transaksi"
                          className="flex items-center gap-3 mb-4 px-1 transition-colors"
                          style={{ color: 'var(--neutral-700)' }}
                        >
                          <HistoryIcon className="w-4 h-4" style={{ color: 'var(--primary-500)' }} />
                          <span className="font-semibold text-sm">Riwayat Transaksi</span>
                        </Link>

                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="w-full font-semibold rounded-lg h-10 justify-start px-3"
                          style={{
                            borderColor: 'rgba(224,36,36,0.2)',
                            color: 'var(--danger)',
                          }}
                        >
                          <LogOut className="mr-2.5 h-4 w-4" />
                          Keluar Akun
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
