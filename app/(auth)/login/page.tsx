'use client'

import { AuthSlider } from '@/components/auth-slider'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'var(--neutral-50)' }}
    >
      {/* Background accents */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-[120px] animate-pulse"
          style={{ background: 'rgba(26,86,219,0.06)' }}
        />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-[120px] animate-pulse"
          style={{ background: 'rgba(63,131,248,0.05)' }}
        />
      </div>

      <AuthSlider initialMode="login" />
    </div>
  )
}
