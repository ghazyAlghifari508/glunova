'use client'

import React from 'react'
import { ShieldCheck, Brain, Lock, HeartPulse, Zap, Users, Clock, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

const trustItems = [
  { icon: Brain, text: 'AI-Powered Analysis' },
  { icon: ShieldCheck, text: 'Dokter Tersertifikasi' },
  { icon: Lock, text: 'Enkripsi End-to-End' },
  { icon: HeartPulse, text: 'Monitoring Real-Time' },
  { icon: Users, text: '10,000+ Pengguna Aktif' },
  { icon: Clock, text: 'Akses 24/7' },
  { icon: Activity, text: 'Akurasi 98%' },
  { icon: Zap, text: 'Respons Instan' },
]

export function TrustMarquee() {
  const renderRow = (direction: 'left' | 'right') => (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={cn(
          "flex gap-6 py-4 min-w-full shrink-0",
          direction === 'left' ? "animate-marquee flex-row" : "animate-marquee-reverse flex-row"
        )}
      >
        {/* Quadruple items for smoother transition on large screens */}
        {[...trustItems, ...trustItems, ...trustItems, ...trustItems].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-[color:var(--neutral-200)] bg-white whitespace-nowrap shadow-sm hover:shadow-md hover:border-[color:var(--primary-300)] transition-all duration-300 flex-shrink-0"
          >
            <item.icon className="w-5 h-5 text-[color:var(--primary-700)]" />
            <span className="text-sm font-semibold text-[color:var(--neutral-700)] font-body">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section className="py-10 bg-[color:var(--neutral-50)] border-y border-[color:var(--neutral-100)] overflow-hidden">
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee 35s linear infinite reverse;
        }
      `}</style>

      <div className="space-y-4">
        {renderRow('left')}
        {renderRow('right')}
      </div>
    </section>
  )
}
