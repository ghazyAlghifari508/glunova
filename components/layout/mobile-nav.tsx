'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Route,
  Camera,
  Stethoscope,
  BookOpen
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Home', href: '/dashboard' },
  { icon: Route, label: 'Roadmap', href: '/roadmap' },
  { icon: Camera, label: 'Vision', href: '/vision', primary: true },
  { icon: BookOpen, label: 'Edukasi', href: '/education' },
  { icon: Stethoscope, label: 'Dokter', href: '/konsultasi-dokter' },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div
        className="max-w-md mx-auto h-[68px] backdrop-blur-xl rounded-2xl flex items-center justify-around px-2"
        style={{
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid var(--neutral-200)',
          boxShadow: '0 -4px 30px rgba(13,43,107,0.08)',
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href

          if (item.primary) {
            return (
              <Link key={item.href} href={item.href} className="relative -mt-8 group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-active:scale-95 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary-700), var(--primary-500))',
                    boxShadow: '0 8px 24px rgba(26,86,219,0.3)',
                  }}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200"
            >
              <item.icon
                className="w-5 h-5"
                style={{ color: isActive ? 'var(--primary-700)' : 'var(--neutral-500)' }}
              />
              <span
                className="text-[10px] font-semibold"
                style={{
                  color: isActive ? 'var(--primary-700)' : 'var(--neutral-500)',
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                {item.label}
              </span>
              {isActive && (
                <div
                  className="w-1 h-1 rounded-full mt-0.5"
                  style={{ background: 'var(--primary-700)' }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
